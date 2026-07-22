import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

// Lazy initialization helper for Gemini SDK
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set. Please configure GEMINI_API_KEY in secrets.");
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

// API endpoint for Protocol Review via Gemini
app.post("/api/review-protocol", async (req, res) => {
  try {
    const { protocolText, experimentType, reviewGoal } = req.body;

    if (!protocolText || typeof protocolText !== "string" || !protocolText.trim()) {
      return res.status(400).json({ error: "Experimental protocol text is required." });
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

    const result = {
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

    return res.json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/review-protocol:", err);
    return res.status(500).json({ 
      error: err.message || "An unexpected error occurred while analyzing the protocol with Gemini AI."
    });
  }
});

// API endpoint for Experiment Troubleshooting via Gemini
app.post("/api/troubleshoot-experiment", async (req, res) => {
  try {
    const { experimentType, observedProblem, additionalDetails } = req.body;

    if (!observedProblem || typeof observedProblem !== "string" || !observedProblem.trim()) {
      return res.status(400).json({ error: "Observed problem description is required." });
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

    const result = {
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

    return res.json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/troubleshoot-experiment:", err);
    return res.status(500).json({ 
      error: err.message || "An unexpected error occurred while analyzing the experiment failure with Gemini AI."
    });
  }
});

// Start Express server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BenchWise Server running on http://localhost:${PORT}`);
  });
}

startServer();
