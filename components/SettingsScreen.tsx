import React from 'react';
import { Screen } from '../App';
import { BackArrowIcon, TrashIcon } from './icons';

interface SettingsScreenProps {
    onNavigate: (screen: Screen) => void;
    onClearHistory: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate, onClearHistory }) => {
    
    const handleClear = () => {
        if (window.confirm("Are you sure you want to delete all chat history? This action cannot be undone.")) {
            onClearHistory();
            alert("Chat history has been cleared.");
        }
    }

    return (
        <div className="flex flex-col h-full bg-dark-bg text-light-text animate-fadeIn">
            <header className="flex items-center p-4 sticky top-0 z-10 border-b border-gray-700 bg-dark-bg">
                <button onClick={() => onNavigate('profile')} className="p-2 -ml-2 rounded-full hover:bg-gray-700/50">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <h2 className="font-semibold text-lg mx-auto">Settings</h2>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-6 space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-3 px-1">Data Management</h3>
                    <button 
                        onClick={handleClear}
                        className="w-full flex items-center bg-card-bg p-4 rounded-lg text-left text-red-400 hover:bg-red-900/40 transition-colors"
                    >
                        <TrashIcon className="w-6 h-6 mr-4 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="font-semibold">Clear Chat History</p>
                            <p className="text-sm text-gray-400">Permanently delete all saved chat sessions from this device.</p>
                        </div>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SettingsScreen;