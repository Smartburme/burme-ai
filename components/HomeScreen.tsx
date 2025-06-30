import React from 'react';
import { UserIcon, SearchIcon, PlusIcon, CorrectionsIcon, PhotoIcon, CodeBracketIcon } from './icons';
import { Screen } from '../App';

interface HomeScreenProps {
  user: any; // User object from Firebase
  onStartChat: (topic: string, initialPrompt: string) => void;
  onNewChat: () => void;
  onNavigate: (screen: Screen) => void;
}

const automationTasks = [
    { 
        id: 'text',
        icon: CorrectionsIcon,
        title: "Generate Text Content",
        description: "Write a blog post, email, or story",
        topic: "Text Generation",
        prompt: "Write a short blog post about the benefits of learning a new skill."
    },
    { 
        id: 'photo',
        icon: PhotoIcon,
        title: "Generate an Image",
        description: "Create an image from a text prompt",
        topic: "Image Generation",
        prompt: "Create a photorealistic image of a futuristic city at sunset, with flying cars."
    },
    {
        id: 'code',
        icon: CodeBracketIcon,
        title: "Generate Code Snippet",
        description: "Write a function or component",
        topic: "Code Generation",
        prompt: "Write a simple React functional component for a button with a click handler."
    }
]

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onStartChat, onNewChat, onNavigate }) => {
  return (
    <div className="flex flex-col h-full p-6 bg-dark-bg text-light-text">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Good morning,</h1>
          <h1 className="text-3xl font-bold truncate" title={user.email}>{user.displayName || user.email}</h1>
        </div>
        <button 
          onClick={() => onNavigate('profile')} 
          title="Go to Profile" 
          className="w-12 h-12 bg-card-bg rounded-full flex items-center justify-center hover:bg-gray-600/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-accent"
        >
          <UserIcon className="w-7 h-7" />
        </button>
      </header>

      <div className="relative mb-8">
        <input 
          type="text"
          placeholder="Search"
          className="w-full bg-card-bg border-none rounded-xl py-3 pl-10 pr-4 text-light-text placeholder-muted-text focus:ring-2 focus:ring-accent"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-text" />
      </div>

      <main className="flex-1 space-y-6 overflow-y-auto pb-4">
        <section>
          <h2 className="text-lg font-semibold mb-3">Automation</h2>
          <div className="flex flex-col space-y-3">
            {automationTasks.map(task => (
                <button 
                    key={task.id} 
                    onClick={() => onStartChat(task.topic, task.prompt)}
                    className="bg-card-bg p-4 rounded-xl flex items-center text-left w-full hover:bg-gray-600/80 transition-colors"
                >
                    <div className="p-2 bg-gray-800 rounded-lg mr-4">
                        <task.icon className="w-6 h-6 text-gray-300" />
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-base">{task.title}</p>
                        <p className="text-sm text-muted-text">{task.description}</p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-2" />
                </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Trending prompt</h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-card-bg px-4 py-1.5 rounded-lg text-sm text-muted-text hover:bg-opacity-80">#1 Graphic design</button>
            <button className="bg-card-bg px-4 py-1.5 rounded-lg text-sm text-muted-text hover:bg-opacity-80">#2 UX research</button>
            <button className="bg-card-bg px-4 py-1.5 rounded-lg text-sm text-muted-text hover:bg-opacity-80">#3 Math solver</button>
            <button className="bg-card-bg px-4 py-1.5 rounded-lg text-sm text-muted-text hover:bg-opacity-80">#4 Productivity</button>
          </div>
        </section>
      </main>

      <footer className="mt-auto pt-4 border-t border-t-card-bg">
        <button onClick={onNewChat} className="w-full flex items-center justify-center bg-card-bg text-light-text font-semibold py-4 rounded-xl hover:bg-opacity-80 transition-colors">
          <PlusIcon className="w-6 h-6 mr-2" />
          New chat
        </button>
      </footer>
    </div>
  );
};

// Add ChevronRightIcon to HomeScreen scope
const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );

export default HomeScreen;