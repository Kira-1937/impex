import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Globe, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (user) return <Navigate to="/role-selection" />;

  const handleSignIn = async () => {
    try {
      await signIn();
      navigate('/role-selection');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-10 text-center border border-gray-100"
      >
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-indigo-200">
          <Globe className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Welcome to Impex</h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Join the global marketplace that simplifies cross-border trade between India and the world.
        </p>

        <button
          onClick={handleSignIn}
          className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-indigo-100 transition-all group"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6"
          />
          <span>Continue with Google</span>
        </button>

        <p className="mt-8 text-sm text-gray-400">
          By continuing, you agree to Impex's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
