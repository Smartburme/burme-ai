
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { BackArrowIcon, MoreHorizontalIcon, SendIcon, BurmeAiIcon, UserIcon, ClipboardCopyIcon, PaperclipIcon, XMarkIcon } from './icons';

interface ChatScreenProps {
  topic: string;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string, image: {data: string, mimeType: string} | null) => void;
  onGoBack: () => void;
  error: string | null;
}

const fileToBase64 = (file: File): Promise<string> => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });


const ChatScreen: React.FC<ChatScreenProps> = ({ topic, messages, isLoading, onSendMessage, onGoBack, error }) => {
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  }

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !imageFile) || isLoading) return;

    let imagePayload: {data: string, mimeType: string} | null = null;
    if (imageFile) {
        try {
            const base64 = await fileToBase64(imageFile);
            imagePayload = { data: base64, mimeType: imageFile.type };
        } catch (err) {
            console.error("Error converting file to base64:", err);
            // Optionally set an error state to show in the UI
            return;
        }
    }
    
    onSendMessage(input.trim(), imagePayload);
    setInput('');
    removeImage();
  };

  return (
    <div className="flex flex-col h-full bg-light-bg text-dark-text">
      <header className="flex items-center justify-between p-4 bg-light-bg sticky top-0 z-10 border-b border-gray-200">
        <button onClick={onGoBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><BackArrowIcon className="w-6 h-6" /></button>
        <h2 className="font-semibold text-lg">{topic}</h2>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-100"><MoreHorizontalIcon className="w-6 h-6" /></button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.text === '' && <LoadingBubble />}
        {error && <p className="text-red-600 text-center text-sm">{error}</p>}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-light-bg border-t border-gray-200">
        {imagePreview && (
            <div className="relative w-24 h-24 mb-2 p-1 border rounded-lg bg-gray-100">
                <img src={imagePreview} alt="Image preview" className="w-full h-full object-cover rounded"/>
                <button onClick={removeImage} className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-0.5">
                    <XMarkIcon className="w-4 h-4"/>
                </button>
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-300">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-dark-text" disabled={isLoading}>
            <PaperclipIcon className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 bg-transparent px-3 py-2 border-none focus:ring-0 text-dark-text placeholder-gray-500"
            disabled={isLoading}
          />
          <button type="submit" className="bg-dark-text text-white rounded-lg p-2.5 disabled:bg-gray-400 transition-colors" disabled={isLoading || (!input.trim() && !imageFile)}>
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!message.text) return;
        navigator.clipboard.writeText(message.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  
  if (message.role === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-dark-bg text-light-text rounded-2xl rounded-br-lg p-3 max-w-xs sm:max-w-sm md:max-w-md shadow">
          {message.image && <img src={message.image} alt="User upload" className="rounded-lg mb-2 max-h-48"/>}
          {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
        </div>
        <div className="w-10 h-10 bg-card-bg rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-6 h-6 text-light-text" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200 shadow">
        <BurmeAiIcon className="w-7 h-7 rounded-full" />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-lg p-3 max-w-xs sm:max-w-sm md:max-w-md relative group shadow">
        <p className="whitespace-pre-wrap text-dark-text">{message.text}</p>
        {message.text && (
            <button onClick={handleCopy} className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ClipboardCopyIcon className="w-4 h-4 text-gray-600"/>
            </button>
        )}
        {copied && <span className="absolute -top-7 right-0 text-xs bg-dark-text text-white px-2 py-0.5 rounded-md">Copied!</span>}
      </div>
    </div>
  );
};

const LoadingBubble: React.FC = () => (
    <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200 shadow">
             <BurmeAiIcon className="w-7 h-7 rounded-full" />
        </div>
        <div className="bg-white rounded-2xl rounded-bl-lg p-4 max-w-xs shadow">
            <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);

export default ChatScreen;