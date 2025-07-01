import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

export default function Login({ setScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center bg-[#1e293b] rounded-md w-full h-screen md:w-[280px] md:h-[520px] text-center">
      <div className="mb-6">
        <img alt="Logo" className="mx-auto mb-4" height="40" src="/assets/logo-dark.png" width="40"/>
        <h2 className="font-semibold text-white text-lg mb-1">Welcome Back</h2>
        <p className="text-xs text-gray-400">Sign in to continue to Burma AI</p>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
      <form onSubmit={handleSubmit} className="w-64 flex flex-col gap-3">
        <input 
          className="bg-[#334155] rounded-md text-xs text-gray-300 placeholder-gray-400 px-3 py-2 focus:outline-none" 
          placeholder="Email Address" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          className="bg-[#334155] rounded-md text-xs text-gray-300 placeholder-gray-400 px-3 py-2 focus:outline-none" 
          placeholder="Password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-white text-[#1e293b] font-semibold text-xs rounded-md py-2 mt-1" type="submit">
          Sign In
        </button>
      </form>
      <div className="mt-4 text-[10px] text-gray-400">
        No account?{' '}
        <button className="text-pink-600 font-semibold" onClick={() => setScreen('signup')}>
          Sign up
        </button>
        <span> | </span>
        <button className="text-pink-600 font-semibold" onClick={() => setScreen('reset')}>
          Forgot password?
        </button>
      </div>
    </section>
  );
}
