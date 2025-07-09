import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';

interface LoginButtonProps {
  textColor: string;
}

const LoginButton = ({ textColor }: LoginButtonProps) => {
  const { t } = useTranslation();

  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log('Login clicked');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
      className={`${textColor} hover:text-nepal-orange transition-colors p-2 rounded-full hover:bg-white/10 flex items-center space-x-2`}
      aria-label="Login"
    >
      <User className="w-5 h-5" />
      <span className="text-sm font-medium hidden lg:inline">
        {t('auth.login') || 'Login'}
      </span>
    </motion.button>
  );
};

export default LoginButton;