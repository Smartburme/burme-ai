import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Sidebar({ setScreen }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="flex flex-col justify-between bg-[#1e293b] rounded-md w-full h-screen md:w-[280px] md:h-[520px] p-4 text-xs">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-white leading-tight">Good morning,</p>
            <p className="font-semibold text-white leading-tight">
              {auth.currentUser?.displayName || 'User'}
            </p>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
        
        <input 
          className="w-full bg-[#334155] rounded-md px-3 py-1 mb-4 text-gray-300 placeholder-gray-400 focus:outline-none" 
          placeholder="Search" 
          type="search"
        />
        
        <div className="mb-4">
          <p className="font-semibold text-gray-400 mb-2">Automation</p>
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setScreen('text')}
              className="flex items-center gap-2 bg-[#334155] rounded-md px-3 py-2 hover:bg-[#475569]"
            >
              <i className="fas fa-pen-nib text-gray-400"></i>
              <div className="flex-1 text-left">
                <p className="text-white text-[11px] font-semibold leading-tight">Generate Text Content</p>
                <p className="text-gray-400 text-[9px] leading-tight">Write a blog post, email, or story</p>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>
            
            {/* Other navigation buttons for code and image generation */}
          </nav>
        </div>
        
        <div>
          <p className="font-semibold text-gray-400 mb-2">Trending prompt</p>
          <div className="flex flex-wrap gap-2">
            {['Graphic design', 'UX research', 'Math solver', 'Productivity'].map((tag, i) => (
              <span key={i} className="bg-[#334155] rounded-md px-2 py-1 text-[9px] text-gray-400">
                #{i+1} {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setScreen('text')}
        className="w-full bg-[#334155] rounded-md py-2 text-gray-400 text-xs flex items-center justify-center gap-2 hover:bg-[#475569]"
      >
        <i className="fas fa-plus"></i>
        New chat
      </button>
    </aside>
  );
}
