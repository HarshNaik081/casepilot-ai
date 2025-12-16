import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';
import WelcomeScreen from './components/WelcomeScreen';
import InterviewStageTracker from './components/InterviewStageTracker';
import { useChat } from './hooks/useChat';
import { useAutoScroll } from './hooks/useAutoScroll';

export default function App() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleReset,
    interviewStage,
    messageCount,
  } = useChat();

  const scrollRef = useAutoScroll([messages]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <Sidebar onReset={handleReset} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="glass-dark border-b border-white/10">
          <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">AI Interview Active</span>
            </div>
            <div className="text-white/60 text-xs">Powered by Groq AI</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <WelcomeScreen />
            ) : (
              <>
                {/* Stage Tracker - Show after first message */}
                {messages.length > 0 && (
                  <InterviewStageTracker 
                    currentStage={interviewStage} 
                    messageCount={messageCount}
                  />
                )}
                
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} index={index} />
                  ))}
                </AnimatePresence>
              </>
            )}

            {/* Loading State */}
            {isLoading && <LoadingIndicator />}

            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
