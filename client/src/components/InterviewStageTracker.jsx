import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

const STAGES = [
    { id: 'problem_statement', label: 'Problem', icon: '🎯' },
    { id: 'clarification', label: 'Clarify', icon: '❓' },
    { id: 'root_cause_analysis', label: 'Analyze', icon: '🔍' },
    { id: 'synthesis', label: 'Synthesize', icon: '💡' },
];

export default function InterviewStageTracker({ currentStage, messageCount }) {
    const getCurrentStageIndex = () => {
        return STAGES.findIndex(s => s.id === currentStage);
    };

    const stageIndex = getCurrentStageIndex();

    return (
        <div className="glass-dark rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Interview Progress
                </h3>
                <span className="text-xs text-white/50">{messageCount} exchanges</span>
            </div>
            
            <div className="flex items-center gap-2">
                {STAGES.map((stage, index) => (
                    <div key={stage.id} className="flex items-center flex-1">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                index === stageIndex
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : index < stageIndex
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-white/5 text-white/40'
                            }`}
                        >
                            <span className="text-lg">{stage.icon}</span>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold">{stage.label}</span>
                            </div>
                            {index < stageIndex && (
                                <CheckCircle size={14} className="ml-auto" />
                            )}
                            {index === stageIndex && (
                                <Circle size={14} className="ml-auto animate-pulse" />
                            )}
                        </motion.div>
                        
                        {index < STAGES.length - 1 && (
                            <div className={`h-0.5 flex-1 mx-1 ${
                                index < stageIndex ? 'bg-green-400' : 'bg-white/10'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
