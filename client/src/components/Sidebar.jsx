import { Plus, User } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export default function Sidebar({ onReset }) {
    return (
        <div className="w-80 glass-dark text-white flex flex-col border-r border-white/10 relative z-20">
            {/* Logo Section */}
            <div className="p-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {APP_NAME}
                    </h1>
                </div>
                <p className="text-sm text-white/60 ml-13">{APP_TAGLINE}</p>
            </div>

            {/* New Interview Button */}
            <div className="p-6">
                <button
                    onClick={onReset}
                    className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-semibold">New Interview</span>
                </button>
            </div>

            {/* Features List */}
            <div className="px-6 py-4 space-y-3 flex-1">
                <div className="glass rounded-xl p-4 border border-white/10">
                    <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">Features</h3>
                    <ul className="space-y-3 text-sm text-white/80">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Real-time AI responses</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>Indian context cases</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span>Data-driven feedback</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            <span>Interview simulation</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-6 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-white/20">
                        <User size={22} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Interview Mode</p>
                        <p className="text-xs text-white/60">Active Session</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
