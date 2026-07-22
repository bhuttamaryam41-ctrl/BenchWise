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

export async function handleTroubleshootExperiment(reqBody: any) {
  const { experimentType, observedProblem, additionalDetails } = reqBody || {};

  if (!observedProblem || typeof observedProblem !== "string" || !observedProblem.trim()) {
    throw { status: 400, message: "Observed problem description is required." };
  }

  const ai = getGenAIClient();

  const prompt = `Troubleshoot the following biotechnology laboratory experiment failure:

EXPERIMENT TYPE: ${experimentType || "Biotechnology"}

OBSERVED PROBLEM:
"""
${observedProblem}
"""

ADDITIONAL DETAILS & PARAMETERS:
"""
${additionalDetails || "None provided."}
"""
`;

  const systemInstruction = `You are BenchWise AI, an educational laboratory troubleshooting assistant.
Your purpose is to help biotechnology students and laboratory researchers identify possible root causes of failed experiments and suggest logical, systematic next steps for investigation.

Key Responsibilities:
1. Identify multiple possible causes rather than assuming one answer (rank from most likely to least likely).
2. Explain clearly why each cause could produce the observed result.
3. Clearly indicate uncertainty in your confidence explanation and final recommendation.
4. Never fabricate experimental details that were not provided.
5. Never diagnose laboratory errors with absolute certainty.
6. Encourage systematic troubleshooting, positive/negative control checks, and Good Laboratory Practices (GLP).
7. Base recommendations on standard biotechnology laboratory practices.
8. Educate users without presenting uncertain scientific conclusions as absolute facts.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "Executive diagnostic summary of the failed experiment" },
          confidenceScore: { type: Type.INTEGER, description: "Confidence percentage integer from 0 to 100 based on detail provided" },
          confidenceCategory: { type: Type.STRING, description: "Very High, High, Moderate, or Low" },
          confidenceExplanation: { type: Type.STRING, description: "Explanation of why this confidence level was assigned and what details could improve accuracy" },
          mostLikelyCauses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                cause: { type: Type.STRING, description: "Headline of the cause" },
                likelihood: { type: Type.STRING, description: "High, Medium, or Low" },
                likelihoodPercentage: { type: Type.INTEGER, description: "Estimated percentage likelihood e.g. 80" },
                explanation: { type: Type.STRING, description: "Detailed scientific explanation of why this cause leads to the observed problem" }
              },
              required: ["cause", "likelihood", "explanation"]
            }
          },
          possibleSolutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stepNumber: { type: Type.INTEGER },
                title: { type: Type.STRING },
                actionableSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                targetCause: { type: Type.STRING }
              },
              required: ["stepNumber", "title", "actionableSteps"]
            }
          },
          parametersToVerify: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                parameterName: { type: Type.STRING, description: "e.g. Primer design, Annealing temperature, Reagent freshness, DNA quality, Pipetting accuracy, Equipment calibration, Contamination, Incubation time" },
                status: { type: Type.STRING, description: "Critical, Warning, or Optimal" },
                guideline: { type: Type.STRING, description: "Practical bench verification guideline" }
              },
              required: ["parameterName", "status", "guideline"]
            }
          },
          preventionTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          educationalNotes: {
            type: Type.ARRAY,
            items: { type: Type.STRING, description: "Beginner-friendly educational explanations of the underlying biochemistry / mechanics" }
          },
          finalRecommendation: { type: Type.STRING, description: "Summary of logical next troubleshooting steps without claiming absolute certainty" }
        },
        required: [
          "summary",
          "confidenceScore",
          "confidenceCategory",
          "confidenceExplanation",
          "mostLikelyCauses",
          "possibleSolutions",
          "parametersToVerify",
          "preventionTips",
          "educationalNotes",
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
    console.error("Failed to parse Gemini JSON response in troubleshooting:", jsonText);
    throw new Error("Unable to parse structured JSON from AI troubleshooting response.");
  }

  const now = new Date();
  const reviewDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Normalize confidence values
  const confScore = typeof data.confidenceScore === "number" ? Math.min(100, Math.max(0, data.confidenceScore)) : 85;
  const confCat: 'Very High' | 'High' | 'Moderate' | 'Low' = 
    (data.confidenceCategory === 'Very High' || data.confidenceCategory === 'High' || data.confidenceCategory === 'Moderate' || data.confidenceCategory === 'Low')
      ? data.confidenceCategory
      : (confScore >= 88 ? 'Very High' : confScore >= 75 ? 'High' : confScore >= 50 ? 'Moderate' : 'Low');

  // Normalize causes
  const mostLikelyCauses = (data.mostLikelyCauses || []).map((item: any, idx: number) => ({
    id: `cause-${idx + 1}`,
    rank: idx + 1,
    cause: item.cause || `Probable Cause #${idx + 1}`,
    likelihood: (item.likelihood === 'High' || item.likelihood === 'Medium' || item.likelihood === 'Low') ? item.likelihood : (idx === 0 ? 'High' : 'Medium'),
    likelihoodPercentage: typeof item.likelihoodPercentage === 'number' ? Math.min(100, Math.max(10, item.likelihoodPercentage)) : (90 - idx * 15),
    explanation: item.explanation || "This parameter discrepancy can disrupt experimental mechanics."
  }));

  // Normalize solutions
  const possibleSolutions = (data.possibleSolutions || []).map((sol: any, idx: number) => ({
    id: `sol-${idx + 1}`,
    stepNumber: typeof sol.stepNumber === "number" ? sol.stepNumber : idx + 1,
    title: sol.title || `Troubleshooting Action #${idx + 1}`,
    actionableSteps: Array.isArray(sol.actionableSteps) && sol.actionableSteps.length > 0 ? sol.actionableSteps : [sol.title || "Verify procedure against standard SOPs."],
    targetCause: sol.targetCause || undefined
  }));

  // Normalize parameters to verify
  const parametersToVerify = (data.parametersToVerify || []).map((param: any, idx: number) => ({
    id: `param-${idx + 1}`,
    parameterName: param.parameterName || "Protocol Variable",
    status: (param.status === 'Critical' || param.status === 'Warning' || param.status === 'Optimal') ? param.status : 'Warning',
    guideline: param.guideline || "Check reagent stocks and calibration standards prior to repeating."
  }));

  return {
    experimentType: experimentType || "Other",
    observedProblem,
    additionalDetails,
    summary: data.summary || "Diagnostic analysis completed for reported experiment failure.",
    confidenceScore: confScore,
    confidenceCategory: confCat,
    confidenceExplanation: data.confidenceExplanation || "Confidence rating is derived from details provided. Adding specific buffer pH, temperatures, and control run results increases diagnostic precision.",
    mostLikelyCauses,
    possibleSolutions,
    parametersToVerify,
    preventionTips: data.preventionTips || ["Always include positive and negative control reactions in every run."],
    educationalNotes: data.educationalNotes || ["Understanding the biochemical mechanism of action helps prevent recurring experimental failures."],
    finalRecommendation: data.finalRecommendation || "Systematically test the highest likelihood causes first by changing one variable at a time with clean, freshly prepared reagents.",
    timestamp,
    reviewDate,
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
    const result = await handleTroubleshootExperiment(req.body);
    return res.status(200).json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/troubleshoot-experiment:", err);
    const status = typeof err === 'object' && err?.status ? err.status : 500;
    return res.status(status).json({ 
      error: err?.message || err || "An unexpected error occurred while analyzing the experiment failure with Gemini AI."
    });
  }
}
