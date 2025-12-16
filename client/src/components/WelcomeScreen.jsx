import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { WELCOME_MESSAGE, EXAMPLE_PROMPTS } from '../utils/constants';

export default function WelcomeScreen() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full flex items-center justify-center py-12"
        >
            <div className="text-center max-w-3xl">
                {/* Animated Avatar */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative w-28 h-28 mx-auto mb-8"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow"></div>
                    <div className="absolute inset-1 rounded-full glass flex items-center justify-center">
                        <Bot size={48} className="text-purple-600" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                >
                    {WELCOME_MESSAGE.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {WELCOME_MESSAGE.subtitle}
                </motion.p>

                {/* Example Prompts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-2xl p-8 text-left inline-block shadow-2xl border border-white/20"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm">💡</span>
                        </div>
                        <p className="text-sm font-bold text-white uppercase tracking-wider">Try asking:</p>
                    </div>
                    <ul className="space-y-4">
                        {EXAMPLE_PROMPTS.map((prompt, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="flex items-start gap-3 group cursor-pointer hover:translate-x-2 transition-transform duration-200"
                            >
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                                    <span className="text-purple-400 group-hover:text-white text-sm">→</span>
                                </div>
                                <span className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors">{prompt}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-8 mt-10"
                >
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">AI-Powered</div>
                        <div className="text-xs text-white/60">Smart Responses</div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Real-time</div>
                        <div className="text-xs text-white/60">Instant Feedback</div>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Indian Context</div>
                        <div className="text-xs text-white/60">Localized Cases</div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
