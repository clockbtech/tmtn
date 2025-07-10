import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';

interface LoginButtonProps {
  textColor: string;
}

const LoginButton = ({ textColor }: LoginButtonProps) => {
  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log('Login clicked');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
      className={`${textColor} hover:text-white bg-nepal-orange hover:bg-nepal-orange/80 transition-all duration-200 px-4 py-2 rounded-full flex items-center space-x-2 font-medium text-sm`}
      aria-label="Login"
    >
      <User className="w-4 h-4" />
      <span>Login</span>
    </motion.button>
  );
};

export default LoginButton;