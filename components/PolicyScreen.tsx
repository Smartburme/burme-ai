import React from 'react';
import { Screen } from '../App';
import { BackArrowIcon } from './icons';

interface PolicyScreenProps {
    onNavigate: (screen: Screen) => void;
}

const PolicyScreen: React.FC<PolicyScreenProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col h-full bg-dark-bg text-light-text animate-fadeIn">
            <header className="flex items-center p-4 sticky top-0 z-10 bg-dark-bg border-b border-gray-700">
                <button onClick={() => onNavigate('profile')} className="p-2 -ml-2 rounded-full hover:bg-gray-700/50">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <h2 className="font-semibold text-lg mx-auto">Privacy & Terms</h2>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Privacy Policy</h3>
                    <div className="text-muted-text space-y-3 text-sm">
                        <p>This is a placeholder for your privacy policy. It's where you'll explain what information you collect from users, how you use it, and with whom you share it.</p>
                        <p>Key points to cover include: data collection (e.g., email, usage data), data usage (e.g., to improve the service), data sharing (e.g., with third-party services), and user rights (e.g., accessing or deleting their data).</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Terms of Service</h3>
                    <div className="text-muted-text space-y-3 text-sm">
                       <p>This is a placeholder for your terms of service. This agreement sets the rules for using your app. It should cover user responsibilities, acceptable use, intellectual property rights, and limitations of liability.</p>
                       <p>It's important to have clear terms to protect both you and your users.</p>
                       <p>Please replace this placeholder text with your actual legal documents.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PolicyScreen;
