import React from 'react';
import { Screen } from '../App';
import { BackArrowIcon, ChevronRightIcon, HistoryIcon } from './icons';
import { ChatSession } from '../types';

interface HistoryScreenProps {
    onNavigate: (screen: Screen) => void;
    history: ChatSession[];
    onLoadChat: (sessionId: string) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onNavigate, history, onLoadChat }) => {
    
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    }

    return (
        <div className="flex flex-col h-full bg-dark-bg text-light-text animate-fadeIn">
            <header className="flex items-center p-4 sticky top-0 z-10 border-b border-gray-700 bg-dark-bg">
                <button onClick={() => onNavigate('profile')} className="p-2 -ml-2 rounded-full hover:bg-gray-700/50">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <h2 className="font-semibold text-lg mx-auto">Chat History</h2>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                {history.length > 0 ? (
                    <div className="space-y-3">
                        {history.sort((a,b) => b.timestamp - a.timestamp).map(session => (
                            <button 
                                key={session.id} 
                                onClick={() => onLoadChat(session.id)}
                                className="w-full bg-card-bg p-4 rounded-xl text-left hover:bg-gray-600/80 transition-colors flex items-center justify-between"
                            >
                                <div className='truncate pr-4'>
                                    <p className="font-semibold text-base truncate">{session.topic}</p>
                                    <p className="text-sm text-muted-text">{formatDate(session.timestamp)}</p>
                                </div>
                                <ChevronRightIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full text-muted-text">
                        <HistoryIcon className="w-16 h-16 text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold text-white">No Chat History</h3>
                        <p className="text-muted-text mt-2 max-w-xs">
                            Your saved chat sessions will appear here. Start a new chat to get started!
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HistoryScreen;