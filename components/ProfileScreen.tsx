
import React from 'react';
import { Screen } from '../App';
import { BackArrowIcon, ChevronRightIcon, EditIcon, HistoryIcon, InfoIcon, LogoutIcon, PolicyIcon, SettingsIcon, UserIcon } from './icons';

interface ProfileScreenProps {
    user: any;
    onLogout: () => void;
    onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onNavigate }) => {
    
    const menuItems = [
        {
            icon: HistoryIcon,
            label: "Chat History",
            screen: 'history' as Screen,
        },
        {
            icon: SettingsIcon,
            label: "Settings",
            screen: 'settings' as Screen,
        },
        {
            icon: PolicyIcon,
            label: "Privacy & Terms",
            screen: 'policy' as Screen,
        },
        {
            icon: InfoIcon,
            label: "About",
            screen: 'about' as Screen,
        },
    ]
    
    return (
        <div className="flex flex-col h-full bg-dark-bg text-light-text animate-fadeIn">
            <header className="flex items-center p-4 sticky top-0 z-10">
                <button onClick={() => onNavigate('home')} className="p-2 -ml-2 rounded-full hover:bg-gray-700/50">
                    <BackArrowIcon className="w-6 h-6" />
                </button>
                <h2 className="font-semibold text-lg mx-auto">Profile</h2>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col p-6">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-24 h-24 bg-card-bg rounded-full flex items-center justify-center mb-4 ring-2 ring-gray-600">
                        <UserIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-white truncate max-w-full px-4">{user.displayName || user.email}</h1>
                        <button onClick={() => onNavigate('edit-profile')} className="p-1 rounded-full hover:bg-gray-600/80">
                            <EditIcon className="w-5 h-5 text-gray-400"/>
                        </button>
                    </div>
                    <p className="text-sm text-muted-text">Welcome to your profile</p>
                </div>
                
                <div className="space-y-3">
                    {menuItems.map((item) => (
                         <button 
                            key={item.label}
                            onClick={() => onNavigate(item.screen)}
                            className="w-full flex items-center bg-card-bg p-4 rounded-lg text-left hover:bg-gray-600/80 transition-colors"
                        >
                            <item.icon className="w-6 h-6 text-gray-400 mr-4" />
                            <span className="flex-1 font-medium">{item.label}</span>
                            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                        </button>
                    ))}
                </div>

                <div className="mt-auto pt-6">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center bg-card-bg p-4 rounded-lg text-left hover:bg-red-900/40 text-red-400 transition-colors"
                    >
                        <LogoutIcon className="w-6 h-6 mr-3"/>
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProfileScreen;