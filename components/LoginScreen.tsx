import React, { useState } from 'react';
import { BurmeAiIcon } from './icons';

// Using window.firebase because it's loaded from a script tag in index.html
declare const firebase: any;
const auth = firebase.auth();

const LoginScreen: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            if (mode === 'login') {
                await auth.signInWithEmailAndPassword(email, password);
            } else if (mode === 'register') {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                if (userCredential.user) {
                    await userCredential.user.updateProfile({
                        displayName: name
                    });
                }
            } else {
                await auth.sendPasswordResetEmail(email);
                setMessage('Check your email to reset your password.');
                setMode('login');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const getButtonText = () => {
        if (loading) return "Processing...";
        if (mode === 'login') return "Sign In";
        if (mode === 'register') return "Create Account";
        return "Send Reset Email";
    };

    const getTitle = () => {
        if (mode === 'login') return "Welcome Back";
        if (mode === 'register') return "Create an Account";
        return "Reset Password";
    }
    
    const getSubtitle = () => {
        if (mode === 'login') return "Sign in to continue to Burme AI";
        if (mode === 'register') return "Get started with your new AI assistant";
        return "We'll send a password reset link to your email";
    }

    return (
        <div className="flex flex-col h-full p-6 bg-dark-bg text-light-text justify-center animate-fadeIn">
            <div className="text-center mb-8">
                <BurmeAiIcon className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <h1 className="text-3xl font-bold text-white">{getTitle()}</h1>
                <p className="text-muted-text">{getSubtitle()}</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
                {mode === 'register' && (
                     <div>
                        <label htmlFor="name" className="sr-only">Display Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Display Name"
                            required
                            className="w-full bg-card-bg border-gray-600 border rounded-lg py-3 px-4 text-light-text placeholder-muted-text focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full bg-card-bg border-gray-600 border rounded-lg py-3 px-4 text-light-text placeholder-muted-text focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                </div>
                {mode !== 'forgot' && (
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full bg-card-bg border-gray-600 border rounded-lg py-3 px-4 text-light-text placeholder-muted-text focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                    </div>
                )}
                
                {error && <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-md">{error}</p>}
                {message && <p className="text-green-400 text-sm text-center bg-green-900/20 p-2 rounded-md">{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-lg text-center font-semibold bg-light-bg text-dark-text hover:bg-white/90 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {getButtonText()}
                </button>
            </form>
            <div className="text-center mt-6 text-sm">
                {mode === 'login' && (
                    <p className="text-muted-text">
                        No account?{' '}
                        <button onClick={() => { setMode('register'); setError(null); }} className="font-semibold text-accent hover:underline">
                            Sign up
                        </button>
                        <span className="mx-2 text-muted-text">|</span>
                        <button onClick={() => { setMode('forgot'); setError(null); }} className="font-semibold text-accent hover:underline">
                            Forgot password?
                        </button>
                    </p>
                )}
                {mode === 'register' && (
                    <p className="text-muted-text">
                        Already have an account?{' '}
                        <button onClick={() => { setMode('login'); setError(null); }} className="font-semibold text-accent hover:underline">
                            Sign in
                        </button>
                    </p>
                )}
                 {mode === 'forgot' && (
                    <p className="text-muted-text">
                        Remembered your password?{' '}
                        <button onClick={() => { setMode('login'); setError(null); }} className="font-semibold text-accent hover:underline">
                            Sign in
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default LoginScreen;
