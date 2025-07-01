import { useState } from 'react';
import { auth } from './firebase';
import Sidebar from './components/Sidebar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './components/Auth/ResetPassword';
import TextChat from './components/Chat/TextChat';
import CodeChat from './components/Chat/CodeChat';
import ImageChat from './components/Chat/ImageChat';
import About from './components/About';
import Privacy from './components/Privacy';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setCurrentScreen('sidebar');
    } else {
      setUser(null);
    }
  });

  const renderScreen = () => {
    switch(currentScreen) {
      case 'login': return <Login setScreen={setCurrentScreen} />;
      case 'signup': return <Signup setScreen={setCurrentScreen} />;
      case 'reset': return <ResetPassword setScreen={setCurrentScreen} />;
      case 'sidebar': return <Sidebar setScreen={setCurrentScreen} />;
      case 'text': return <TextChat setScreen={setCurrentScreen} />;
      case 'code': return <CodeChat setScreen={setCurrentScreen} />;
      case 'image': return <ImageChat setScreen={setCurrentScreen} />;
      case 'about': return <About setScreen={setCurrentScreen} />;
      case 'privacy': return <Privacy setScreen={setCurrentScreen} />;
      default: return <Login setScreen={setCurrentScreen} />;
    }
  };

  return (
    <div className="bg-[#1e293b] min-h-screen font-sans text-white">
      {renderScreen()}
    </div>
  );
}

export default App;
