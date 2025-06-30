
import React from 'react';
import { Screen } from '../App';
import { BackArrowIcon, BurmeAiIcon } from './icons';

interface AboutScreenProps {
    onNavigate: (screen: Screen) => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col h-full bg-dark-bg text-light-text animate-fadeIn">
            <header className="flex items-center p-4 sticky top-0 z-10 bg-dark-bg border-b border-gray-700">
                <button onClick={() => onNavigate('profile')} className="p-2 -ml-2 rounded-full hover:bg-gray-700/50">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <h2 className="font-semibold text-lg mx-auto">About Burme AI</h2>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
                <BurmeAiIcon className="w-24 h-24 rounded-full shadow-lg" />
                <div>
                    <h3 className="text-2xl font-bold text-white">Burme Ai - Chat Bot</h3>
                    <p className="text-muted-text mt-1">Version 1.0.0</p>
                </div>
                <p className="text-light-text max-w-md">
                    Burme AI is a powerful assistant designed to help you with writing, planning, learning, and creative tasks. Powered by Google's Gemini models, it brings state-of-the-art AI to your fingertips.
                </p>
                <div className="text-sm text-gray-400 space-y-2">
                    <p>Admin: Aung Myo Kyaw</p>
                    <p>
                        Contact: <a href="mailto:aung.thuyrain.at449@gmail.com" className="text-accent hover:underline">aung.thuyrain.at449@gmail.com</a>
                    </p>
                    <p className='pt-4 text-gray-500'>Made with ❤️ and React.</p>
                </div>
            </main>
        </div>
    );
};

export default AboutScreen;