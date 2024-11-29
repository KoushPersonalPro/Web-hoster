import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login with Google.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-between py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 h-full w-full" />
      </motion.div>

      {/* 3D Rotating Globe Animation */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <Globe className="h-40 w-40 text-white opacity-20" />
        </motion.div>
      </div>

      {/* Informational Content */}
      <div className="flex-grow flex flex-col justify-center text-center z-10 px-4 lg:px-0">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white"
        >
          Welcome to Acez
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto"
        >
          Acez is your go-to platform for hosting simple yet powerful websites. Deploy HTML, CSS, and JavaScript projects effortlessly. Enjoy customizable options, public links, and a seamless hosting experience tailored for developers and creators like you.
        </motion.p>
      </div>

      {/* Login Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mb-12">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white py-10 px-6 shadow-lg rounded-lg sm:px-10"
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to Acez
          </h2>

          <form onSubmit={handleEmailLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in with Google
              </button>

              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create new account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
