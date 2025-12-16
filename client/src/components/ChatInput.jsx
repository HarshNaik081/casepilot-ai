import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSubmit, disabled }) {
    return (
        <div className="glass-dark border-t border-white/10 shadow-2xl relative z-20">
            <div className="max-w-5xl mx-auto p-6">
                <form onSubmit={onSubmit} className="flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Type your response..."
                            className="w-full px-6 py-4 glass text-white placeholder:text-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all shadow-lg"
                            disabled={disabled}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                            Press Enter ↵
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={disabled || !value.trim()}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-3 group"
                    >
                        <span>Send</span>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-white/50">
                        💡 Tip: Be specific with numbers and metrics for better feedback
                    </p>
                    <p className="text-xs text-white/40">
                        Powered by Groq AI
                    </p>
                </div>
            </div>
        </div>
    );
}
