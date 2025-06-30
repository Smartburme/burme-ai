
import React, { useState, useEffect, useCallback } from 'react';
import { Message, ChatSession } from './types';
import { createChat } from './services/geminiService';
import type { Chat, Part } from '@google/genai';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import ProfileScreen from './components/ProfileScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import PolicyScreen from './components/PolicyScreen';
import AboutScreen from './components/AboutScreen';
import EditProfileScreen from './components/EditProfileScreen';
import { BurmeAiIcon } from './components/icons';

// Firebase is initialized in index.html and attached to the window
declare const firebase: any;

export type Screen = 'login' | 'home' | 'chat' | 'profile' | 'history' | 'settings' | 'policy' | 'about' | 'edit-profile';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('login');
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatTopic, setChatTopic] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
        setUser(user);
        setScreen(user ? 'home' : 'login');
        if (user) {
          const storedHistory = localStorage.getItem(`burme-ai-chat-history-${user.uid}`);
          if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
          }
        } else {
          setChatHistory([]); // Clear history on logout
        }
        setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveChatToHistory = useCallback(() => {
    if (!user || messages.length < 2) return;

    const hasModelResponse = messages.some(m => m.role === 'model' && m.text.trim() !== '');
    if (!hasModelResponse) return;

    const newSession: ChatSession = {
        id: Date.now().toString(),
        topic: chatTopic,
        messages: messages,
        timestamp: Date.now(),
    };

    setChatHistory(prev => {
        const updatedHistory = [newSession, ...prev];
        if (user) {
            localStorage.setItem(`burme-ai-chat-history-${user.uid}`, JSON.stringify(updatedHistory));
        }
        return updatedHistory;
    });
  }, [user, messages, chatTopic]);

  const handleNavigate = (newScreen: Screen) => {
    setScreen(newScreen);
  }

  const handleGoBackToHome = () => {
      saveChatToHistory();
      setScreen('home');
      setChat(null);
      setMessages([]);
      setChatTopic('');
      setError(null);
  }

  const handleLogout = () => {
    saveChatToHistory();
    firebase.auth().signOut().then(() => {
      // The onAuthStateChanged listener will handle screen changes and state clearing
    });
  };
  
  const handleUpdateProfile = async (newName: string) => {
    if (!user) return;
    try {
        await user.updateProfile({ displayName: newName });
        setUser({ ...user, displayName: newName }); // Force state update
        handleNavigate('profile');
    } catch (err: any) {
        console.error("Profile update error:", err);
        throw err; // Re-throw to be caught in the component
    }
  };

  const handleSendMessage = useCallback(async (message: string, image: {data: string, mimeType: string} | null, currentChat: Chat) => {
    if (!currentChat) {
      setError("Chat is not initialized.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const userMessage: Message = { role: 'user', text: message, image: image?.data };
    setMessages(prev => [...prev, userMessage]);
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
        const promptParts: Part[] = [];
        if (image) {
            promptParts.push({
               inlineData: {
                   mimeType: image.mimeType,
                   data: image.data.split(',')[1], // remove the data:mime/type;base64, part
               }
           });
        }
        promptParts.push({ text: message });

      const stream = await currentChat.sendMessageStream({ message: promptParts });
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
          }
          return newMessages;
        });
      }
    } catch (err: any) {
        console.error("Gemini API Error:", err);
        const errorMessage = "Sorry, something went wrong. Please try again.";
        setError(errorMessage);
        setMessages(prev => prev.slice(0, -1));
    } finally {
        setIsLoading(false);
    }
  }, []);

  const handleStartChat = useCallback(async (topic: string, initialPrompt: string) => {
    const newChat = createChat();
    setChat(newChat);
    setChatTopic(topic);
    // Don't set messages here, let ChatScreen do it before sending
    handleNavigate('chat');
    
    setTimeout(() => {
      setMessages([{ role: 'user', text: initialPrompt }]);
      handleSendMessage(initialPrompt, null, newChat)
    }, 100);

  }, [handleSendMessage]);
  
  const handleNewChat = useCallback(() => {
    const newChat = createChat();
    setChat(newChat);
    setChatTopic("New Chat");
    setMessages([]);
    setError(null);
    handleNavigate('chat');
  }, []);
  
  const handleLoadChat = useCallback((sessionId: string) => {
    const session = chatHistory.find(s => s.id === sessionId);
    if (session) {
        // Remove the loaded chat from history to prevent duplicates when it's saved again
        const updatedHistory = chatHistory.filter(s => s.id !== sessionId);
        if (user) {
            localStorage.setItem(`burme-ai-chat-history-${user.uid}`, JSON.stringify(updatedHistory));
        }
        setChatHistory(updatedHistory);
        
        const newChat = createChat();
        setChat(newChat);
        setMessages(session.messages);
        setChatTopic(session.topic);
        setError(null);
        handleNavigate('chat');
    }
  }, [chatHistory, user]);

  const handleClearHistory = useCallback(() => {
    if (user) {
        localStorage.removeItem(`burme-ai-chat-history-${user.uid}`);
        setChatHistory([]);
    }
  }, [user]);

  let content;
  if (authLoading) {
    content = (
      <div className="flex items-center justify-center h-full">
        <BurmeAiIcon className="w-16 h-16 animate-pulse rounded-full" />
      </div>
    );
  } else if (!user) {
    content = <LoginScreen />;
  } else {
    switch (screen) {
      case 'home':
        content = <HomeScreen user={user} onStartChat={handleStartChat} onNewChat={handleNewChat} onNavigate={handleNavigate} />;
        break;
      case 'chat':
        content = (
          <ChatScreen
            topic={chatTopic}
            messages={messages}
            isLoading={isLoading}
            onSendMessage={(msg, img) => chat && handleSendMessage(msg, img, chat)}
            onGoBack={handleGoBackToHome}
            error={error}
          />
        );
        break;
      case 'profile':
        content = <ProfileScreen user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
        break;
      case 'history':
        content = <HistoryScreen onNavigate={handleNavigate} history={chatHistory} onLoadChat={handleLoadChat} />;
        break;
      case 'settings':
        content = <SettingsScreen onNavigate={handleNavigate} onClearHistory={handleClearHistory} />;
        break;
      case 'policy':
        content = <PolicyScreen onNavigate={handleNavigate} />;
        break;
      case 'about':
        content = <AboutScreen onNavigate={handleNavigate} />;
        break;
      case 'edit-profile':
        content = <EditProfileScreen user={user} onNavigate={handleNavigate} onUpdateProfile={handleUpdateProfile} />;
        break;
      default:
        content = <HomeScreen user={user} onStartChat={handleStartChat} onNewChat={handleNewChat} onNavigate={handleNavigate} />;
    }
  }

  return (
    <div className="h-screen w-screen bg-black/50 flex items-center justify-center">
        <div className="h-full w-full max-w-md mx-auto relative bg-dark-bg shadow-2xl overflow-hidden md:rounded-3xl md:h-[95vh] md:max-h-[800px] md:border-2 md:border-gray-700">
            {content}
        </div>
    </div>
  );
};

export default App;
