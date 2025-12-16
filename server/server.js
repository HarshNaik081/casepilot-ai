import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { 
  RCA_CASE_PROMPT, 
  INTERRUPTION_TRIGGERS, 
  IMMERSION_FALLBACKS,
  CASE_STAGE 
} from "./utils/systemPrompts.js";

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

// Interview State Tracker (In-memory for MVP, can be moved to DB later)
const interviewSessions = new Map();

// Helper: Check if user message triggers interruption
function shouldInterrupt(message) {
  for (const trigger of INTERRUPTION_TRIGGERS) {
    if (trigger.pattern.test(message)) {
      return trigger.response;
    }
  }
  return null;
}

// Helper: Get random fallback message
function getRandomFallback() {
  return IMMERSION_FALLBACKS[Math.floor(Math.random() * IMMERSION_FALLBACKS.length)];
}

// POST /api/chat - Main endpoint for chat
app.post("/api/chat", async (req, res) => {
  console.log("Request received at /api/chat");
  console.log("Body:", req.body);

  try {
    const { message, history, sessionId = 'default' } = req.body;

    // Validate input
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required and must be a string" });
    }

    // Check for interruption triggers (Vikram's impatience)
    const interruptionResponse = shouldInterrupt(message);
    if (interruptionResponse && message.length > 50) {
      // Only interrupt if message is long AND vague
      return res.json({ 
        response: interruptionResponse,
        interrupted: true 
      });
    }

    // Initialize session if doesn't exist
    if (!interviewSessions.has(sessionId)) {
      interviewSessions.set(sessionId, {
        stage: CASE_STAGE.PROBLEM_STATEMENT,
        caseType: 'RCA',
        startTime: Date.now(),
        messageCount: 0
      });
    }

    const session = interviewSessions.get(sessionId);
    session.messageCount++;

    // Construct messages array with system message first
    const messages = [
      {
        role: "system",
        content: RCA_CASE_PROMPT, // Using modular prompt
      }
    ];

    // Add conversation history (if any)
    if (Array.isArray(history) && history.length > 0) {
      messages.push(...history);
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message,
    });

    // Call Groq API with retry logic
    let aiResponse;
    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      aiResponse = response.choices[0].message.content;
    } catch (groqError) {
      // Graceful fallback to maintain immersion
      console.error("Groq API Error:", groqError.message);
      aiResponse = getRandomFallback();
      
      // Return fallback with retry flag
      return res.json({ 
        response: aiResponse,
        shouldRetry: true 
      });
    }

    // Update session stage based on conversation progress
    if (session.messageCount > 5 && session.stage === CASE_STAGE.PROBLEM_STATEMENT) {
      session.stage = CASE_STAGE.CLARIFICATION;
    } else if (session.messageCount > 10 && session.stage === CASE_STAGE.CLARIFICATION) {
      session.stage = CASE_STAGE.ROOT_CAUSE_ANALYSIS;
    }

    res.json({ 
      response: aiResponse,
      stage: session.stage,
      messageCount: session.messageCount
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ 
      error: "Failed to process your request",
      fallback: getRandomFallback()
    });
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
