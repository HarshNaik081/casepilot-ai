import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { ROLES } from '../utils/constants';

export default function ChatMessage({ message, index }) {
    const isUser = message.role === ROLES.USER;

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex gap-4 max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${isUser
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500'
                    }`}
                >
                    {isUser ? <User size={22} className="text-white" /> : <Bot size={22} className="text-white" />}
                </motion.div>

                {/* Message Bubble */}
                <div className={`px-6 py-4 rounded-2xl shadow-xl ${isUser
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'glass text-white border border-white/20 rounded-bl-md'
                    }`}>
                    {!isUser && (
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
                            <span className="text-xs font-semibold text-white/80">Vikram - Senior PM</span>
                        </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
            </div>
        </motion.div>
    );
}
