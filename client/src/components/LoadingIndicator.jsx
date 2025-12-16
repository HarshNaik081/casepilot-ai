import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function LoadingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-start"
        >
            <div className="flex gap-4 max-w-4xl">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                >
                    <Bot size={22} className="text-white" />
                </motion.div>
                <div className="glass text-white border border-white/20 rounded-2xl rounded-bl-md shadow-xl px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"
                            ></motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                                className="w-2.5 h-2.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                            ></motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                                className="w-2.5 h-2.5 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"
                            ></motion.div>
                        </div>
                        <span className="text-sm font-medium">Vikram is thinking...</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
