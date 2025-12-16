# CasePilot AI - Indian Business Case Interview Simulator

An AI-powered interview simulator featuring **"Vikram"** - a strict, metric-obsessed Senior PM from an Indian unicorn (Swiggy, Zepto, Paytm).

## 🎯 Product Vision

Unlike generic AI assistants, CasePilot AI simulates **real Indian PM interviews** with:
- **Indian Market Context**: Tier-2/3 cities, UPI failures, monsoon logistics, kirana stores
- **Strict Interviewer Persona**: Impatient with fluff, demands specific metrics (CAC, LTV, AOV)
- **Socratic Method**: Guides through questions, never gives direct answers
- **Stage-Based Flow**: Problem Statement → Clarification → Root Cause Analysis → Synthesis

## 🚀 Tech Stack

**Backend:** Node.js + Express + Groq SDK (Llama 3.3-70b-versatile)  
**Frontend:** React + Vite + Tailwind CSS + Framer Motion  
**AI Features:** Context-aware conversations, interruption logic, markdown support

## ✨ Current Features (Phase 1)

### 🧠 Intelligent Chat
- ✅ **Context Awareness**: AI remembers case state, doesn't loop or contradict
- ✅ **Interruption Logic**: Detects vague answers ("I'll improve marketing") and interrupts with metric demands
- ✅ **Markdown Support**: Tables, bold text, bullet points via react-markdown
- ✅ **Stage Tracking**: Visual progress through interview stages
- ✅ **Graceful Fallbacks**: Maintains immersion even when API fails

### 🎨 UI Components
- Dark theme with glassmorphism effects
- Real-time stage tracker with progress indicators
- Animated chat bubbles with markdown rendering
- Voice-ready architecture (Phase 2 prep)

## 📁 Project Structure

```
CasePilot AI/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.jsx          # With react-markdown support
│   │   │   ├── InterviewStageTracker.jsx  # Visual progress tracker
│   │   │   ├── ChatInput.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── WelcomeScreen.jsx
│   │   │   └── LoadingIndicator.jsx
│   │   ├── hooks/
│   │   │   ├── useChat.js               # Enhanced with session tracking
│   │   │   └── useAutoScroll.js
│   │   └── utils/
│   │       ├── api.js
│   │       └── constants.js
│   └── package.json
│
└── server/                 # Express Backend
    ├── utils/
    │   └── systemPrompts.js             # Modular Vikram personas
    ├── server.js                        # Enhanced with interruption logic
    └── package.json
```

## 🎭 The "Vikram" Persona

**Identity:** Senior PM at Indian Unicorn  
**Traits:**
- Strict & impatient with vague answers
- Demands specific metrics (CAC, LTV, conversion rates)
- Uses Indian context exclusively
- Socratic teaching method

**Interruption Triggers:**
- Vague words: "improve", "optimize", "maybe", "probably"
- Long messages without data
- Generic strategies without ROI calculations

## 📊 Interview Stages

1. **Problem Statement**: AI presents the business problem
2. **Clarification**: Candidate asks questions, AI provides data only if asked
3. **Root Cause Analysis**: Deep dive into metrics and segmentation
4. **Synthesis**: Final recommendation with impact estimates

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 14+
- Groq API Key ([get one here](https://console.groq.com))

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file:
```
GROQ_API_KEY=your_api_key_here
PORT=5000
```

Start server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🎯 Usage

1. **Start Interview**: Open http://localhost:5174 (or 5173)
2. **Receive Problem**: Vikram presents a case (e.g., Zepto retention drop)
3. **Ask Questions**: Clarify assumptions, request data
4. **Analyze**: Break down the problem using frameworks
5. **Synthesize**: Provide recommendations with metrics

## 🔮 Roadmap

### Phase 2: Voice Interaction (Next)
- [ ] Voice-to-voice (< 2s latency)
- [ ] Deepgram/Whisper (STT) integration
- [ ] ElevenLabs/Azure (TTS) integration
- [ ] Dynamic audio waveform visualizer
- [ ] Push-to-talk / VAD controls

### Phase 3: Scorecard
- [ ] Post-interview grading system
- [ ] Radar chart visualization
- [ ] Scoring: Structure, Data Orientation, Communication
- [ ] Downloadable feedback PDF

## 🧪 Testing the Interruption Logic

Try these inputs to trigger Vikram's impatience:

**Vague Answer:**
> "I think we should improve the marketing strategy to increase user engagement and optimize the conversion funnel"

**Expected Response:**
> ⚠️ **[INTERRUPTED]** Stop. HOW will you improve it? Give me the specific metric you'll move and by how much.

## 🔧 API Endpoints

### POST `/api/chat`
**Request:**
```json
{
  "message": "What's the current retention rate?",
  "history": [...],
  "sessionId": "session_123"
}
```

**Response:**
```json
{
  "response": "Jaipur retention: 45% after order 3. Competitors at 60%.",
  "stage": "clarification",
  "messageCount": 5,
  "interrupted": false
}
```

## 🎨 Design Philosophy

- **Dark Theme**: Reduces eye strain during long practice sessions
- **Glassmorphism**: Modern, professional aesthetic
- **Markdown Support**: Clean data presentation (tables, lists)
- **Minimal Distractions**: Focus on content, not chrome

## 🤝 Contributing

This is a focused product with a specific vision. When contributing:
1. Maintain "Vikram" persona consistency
2. Use Indian market context exclusively
3. Follow modular architecture (separate prompts, small components)
4. Ensure < 2s response times

## 📄 License

ISC

## 🙏 Acknowledgments

- Groq for lightning-fast LLM inference
- Indian PM community for interview insights
- Open source libraries: React, Tailwind, Framer Motion

---

**Built for aspiring PMs who want to crack Indian unicorn interviews. No fluff. Just metrics.** 🎯
