import { useState } from 'react';
import { generateText } from '../../gemini';

export default function TextChat({ setScreen }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    setMessages(prev => [...prev, { text: message, user: true }]);
    
    try {
      const response = await generateText(message);
      setMessages(prev => [...prev, { text: response, user: false }]);
    } catch (error) {
      console.error("Error generating text:", error);
    }
    
    setMessage('');
    setLoading(false);
  };

  return (
    <div className="flex flex-col bg-white rounded-md w-full h-screen md:h-[520px] text-black">
      {/* Header and message rendering */}
      {/* ... (use the HTML structure from your original code) */}
    </div>
  );
}
