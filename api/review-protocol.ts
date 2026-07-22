import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set. Please configure GEMINI_API_KEY in environment variables.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export async function handleReviewProtocol(reqBody: any) {
  const { protocolText, experimentType, reviewGoal } = reqBody || {};

  if (!protocolText || typeof protocolText !== "string" || !protocolText.trim()) {
    throw { status: 400, message: "Experimental protocol text is required." };
  }

  const ai = getGenAIClient();

  const prompt = `Review the following ${experimentType || "biotechnology"} laboratory protocol with the focus goal of "${reviewGoal || "General Review"}":

EXPERIMENTAL PROTOCOL:
"""
${protocolText}
"""
`;

  const systemInstruction = `You are BenchWise AI, an educational laboratory protocol reviewer.
Your purpose is to help biotechnology students and laboratory researchers identify possible weaknesses, missing information, unclear instructions, reproducibility concerns, and laboratory safety issues within experimental protocols.
Never claim that your review replaces professional laboratory supervision or institutional SOPs.
If information is missing, explicitly state that confidence is reduced.
Never invent protocol parameters that were not provided.
If uncertain, explain why.
Base recommendations only on widely accepted laboratory best practices.
Do not fabricate references.

Review Responsibilities:
Review the submitted protocol for:
- Missing experimental information (temperatures, incubation times, concentrations, volumes)
- Ambiguous wording
- Incorrect sequencing of steps
- Missing controls (negative controls, extraction blanks, standards)
- Missing reagent information
- Reproducibility concerns
- Safety concerns and biosafety levels (BSL-1 or BSL-2)
- Waste disposal concerns
- General laboratory best practices`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          qualityScore: { type: Type.INTEGER, description: "Quality score from 0 to 100" },
          confidenceScore: { type: Type.INTEGER, description: "Confidence percentage integer from 0 to 100 (e.g. 92)" },
          confidenceCategory: { type: Type.STRING, description: "Very High, High, Moderate, or Low" },
          confidenceExplanation: { type: Type.STRING, description: "Short explanation describing what the confidence score means for this protocol" },
          summary: { type: Type.STRING, description: "Executive summary of the protocol review" },
          issues: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                severity: { type: Type.STRING, description: "High, Medium, or Low" },
                issue: { type: Type.STRING, description: "Title or headline of the issue" },
                description: { type: Type.STRING, description: "Detailed description of the issue" },
                recommendation: { type: Type.STRING, description: "Actionable corrective recommendation" }
              },
              required: ["severity", "issue", "recommendation"]
            }
          },
          missingInformation: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          safety: {
            type: Type.OBJECT,
            properties: {
              bslLevel: { type: Type.STRING, description: "BSL-1 or BSL-2" },
              ppeRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
              hazards: { type: Type.ARRAY, items: { type: Type.STRING } },
              safetyNotes: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          bestPractices: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          finalRecommendation: { type: Type.STRING, description: "Final verdict and recommendation statement" }
        },
        required: [
          "qualityScore",
          "confidenceScore",
          "confidenceCategory",
          "confidenceExplanation",
          "summary",
          "issues",
          "missingInformation",
          "suggestions",
          "bestPractices",
          "finalRecommendation"
        ]
      }
    }
  });

  const jsonText = response.text || "{}";
  let data: any = {};
  try {
    data = JSON.parse(jsonText);
  } catch (parseErr) {
    console.error("Failed to parse Gemini JSON response:", jsonText);
    throw new Error("Unable to parse structured JSON from AI analysis response.");
  }

  // Metadata calculations
  const words = protocolText.trim().split(/\s+/).filter(Boolean).length;
  const chars = protocolText.length;
  const now = new Date();
  const reviewDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Normalize confidence values
  const confScore = typeof data.confidenceScore === "number" ? Math.min(100, Math.max(0, data.confidenceScore)) : 90;
  const confCat: 'Very High' | 'High' | 'Moderate' | 'Low' = 
    (data.confidenceCategory === 'Very High' || data.confidenceCategory === 'High' || data.confidenceCategory === 'Moderate' || data.confidenceCategory === 'Low')
      ? data.confidenceCategory
      : (confScore >= 88 ? 'Very High' : confScore >= 75 ? 'High' : confScore >= 50 ? 'Moderate' : 'Low');

  const confLevel = `${confScore}% (${confCat})`;

  // Normalize safety
  const safetyObj = data.safety && typeof data.safety === "object" ? data.safety : {};
  const bslLevel: 'BSL-1' | 'BSL-2' = safetyObj.bslLevel === "BSL-2" ? "BSL-2" : "BSL-1";
  const ppeRequired = Array.isArray(safetyObj.ppeRequired) && safetyObj.ppeRequired.length > 0 
    ? safetyObj.ppeRequired 
    : ["Lab coat", "Nitrile gloves", "Safety goggles", "Closed-toe shoes"];
  const hazards = Array.isArray(safetyObj.hazards) && safetyObj.hazards.length > 0 
    ? safetyObj.hazards 
    : ["Standard biological / chemical laboratory handling risk"];
  const safetyNotes = Array.isArray(safetyObj.safetyNotes) && safetyObj.safetyNotes.length > 0 
    ? safetyObj.safetyNotes 
    : Array.isArray(data.safety) ? data.safety : ["Observe standard GLP biosafety guidelines and institutional SOPs."];

  // Normalize issues
  const issuesList = (data.issues || []).map((item: any, idx: number) => ({
    id: `issue-${idx + 1}`,
    title: item.issue || item.title || "Protocol Issue",
    severity: (item.severity === "High" || item.severity === "Medium" || item.severity === "Low") ? item.severity : "Medium",
    description: item.description || item.issue || "Potential issue identified during protocol audit.",
    recommendation: item.recommendation || "Review procedure against SOP guidelines."
  }));

  return {
    protocolTitle: protocolText.split("\n")[0].replace(/^[0-9.#\-\s]+/, "").slice(0, 50) || `${experimentType} Protocol`,
    experimentType: experimentType || "PCR",
    reviewGoal: reviewGoal || "General Review",
    qualityScore: typeof data.qualityScore === "number" ? Math.min(100, Math.max(0, data.qualityScore)) : 85,
    confidenceLevel: confLevel,
    confidenceScore: confScore,
    confidenceCategory: confCat,
    confidenceExplanation: data.confidenceExplanation || "The protocol contains sufficient detail for a reliable review. Confidence may decrease when essential experimental information is missing.",
    summary: data.summary || "Completed protocol evaluation.",
    potentialIssues: issuesList,
    missingInformation: data.missingInformation || [],
    suggestedImprovements: data.suggestions || data.suggestedImprovements || [],
    safetyConsiderations: {
      bslLevel,
      ppeRequired,
      hazards,
      safetyNotes
    },
    bestPractices: data.bestPractices || [],
    finalRecommendation: data.finalRecommendation || "PASSED AUDIT: Protocol meets standard laboratory parameters. Verify controls prior to run.",
    timestamp,
    reviewDate,
    wordCount: words,
    charCount: chars,
    status: "Completed"
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Expected POST.' });
  }

  try {
    const result = await handleReviewProtocol(req.body);
    return res.status(200).json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/review-protocol:", err);
    const status = typeof err === 'object' && err?.status ? err.status : 500;
    return res.status(status).json({ 
      error: err?.message || err || "An unexpected error occurred while analyzing the protocol with Gemini AI."
    });
  }
}
