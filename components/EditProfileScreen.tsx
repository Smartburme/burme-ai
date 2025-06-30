
import React, { useState } from 'react';
import { Screen } from '../App';
import { BackArrowIcon, UserIcon } from './icons';

interface EditProfileScreenProps {
    user: any;
    onNavigate: (screen: Screen) => void;
    onUpdateProfile: (newName: string) => Promise<void>;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onNavigate, onUpdateProfile }) => {
    const [displayName, setDisplayName] = useState(user.displayName || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Display name cannot be empty.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await onUpdateProfile(displayName.trim());
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-dark-bg text-light-text animate-fadeIn">
            <header className="flex items-center p-4 sticky top-0 z-10 border-b border-gray-700 bg-dark-bg">
                <button onClick={() => onNavigate('profile')} className="p-2 -ml-2 rounded-full hover:bg-gray-700/50">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <h2 className="font-semibold text-lg mx-auto">Edit Profile</h2>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-24 h-24 bg-card-bg rounded-full flex items-center justify-center mb-4 ring-2 ring-gray-600">
                            <UserIcon className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-sm text-muted-text">{user.email}</p>
                    </div>

                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your display name"
                            required
                            className="w-full bg-card-bg border-gray-600 border rounded-lg py-3 px-4 text-light-text placeholder-muted-text focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-md">{error}</p>}
                    
                    <button
                        type="submit"
                        disabled={loading || displayName === (user.displayName || '')}
                        className="w-full py-3 px-6 rounded-lg text-center font-semibold bg-light-bg text-dark-text hover:bg-white/90 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default EditProfileScreen;