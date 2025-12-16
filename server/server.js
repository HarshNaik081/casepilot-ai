import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", // Allow all origins for development
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Initialize Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System Message for "Vikram" - The Indian Context Interviewer
const SYSTEM_MESSAGE = `
IDENTITY:
You are Vikram, a Senior Product Manager at a high-growth Indian unicorn (like Swiggy, Zepto, or Paytm). You are interviewing a candidate for a PM/Biz Ops role.

YOUR PERSONA:
1.  **Strict & Data-Driven:** You hate fluff. If the candidate says "I will improve marketing," you cut them off and ask "What is the CAC? What is the ROI?"
2.  **Indian Context Only:** All your cases and feedback must be rooted in India. Mention Tier-2 cities, UPI failure rates, monsoon logistics, rider strikes, or kirana store adoption.
3.  **Socratic Pressure:** Do not give answers. If they struggle, ask a sharp question like "Have you looked at the unit economics of a single order?"
4.  **No "Good Job":** Only compliment if the insight is truly exceptional. Otherwise, simply say "Okay, move on."

CURRENT CASE:
Start the conversation immediately with this problem:
"Zepto is seeing a 15% drop in retention in Jaipur after the first 3 orders. Competitors are eating our share. Diagnose this."

INSTRUCTIONS:
- Keep responses short (under 40 words).
- If the candidate is vague, interrupt them.
- Focus on Root Cause Analysis (RCA) first.
`;

// POST /api/chat - Main endpoint for chat
app.post("/api/chat", async (req, res) => {
  console.log("Request received at /api/chat");
  console.log("Body:", req.body);

  try {
    const { message, history } = req.body;

    // Validate input
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required and must be a string" });
    }

    // Construct messages array
    // Construct messages array with system message first
    const messages = [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // Add conversation history (if any) - insert between system and user message
    if (Array.isArray(history) && history.length > 0) {
      // We want: [System, ...History, User]
      // Current messages: [System, User]
      // Insert history at index 1
      messages.splice(1, 0, ...history);
    }

    // Call Groq API
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    // Extract the response
    const aiResponse = response.choices[0].message.content;

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to process your request" });
  }
});

// GET / - Health check
app.get("/", (req, res) => {
  res.json({ message: "Case Study AI Interviewer Backend is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/chat`);
});
