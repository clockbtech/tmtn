
import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LoginButtonProps {
  textColor: string;
}

const LoginButton = ({ textColor }: LoginButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to="/auth"
        className="text-white bg-gradient-to-r from-tmtn-red to-red-600 hover:from-tmtn-red/90 hover:to-red-600/90 transition-all duration-300 px-4 py-2 rounded-full flex items-center space-x-2 font-medium text-sm shadow-lg hover:shadow-xl hover:scale-105 transform"
        aria-label="Login"
      >
        <User className="w-4 h-4" />
        <span>Login</span>
      </Link>
    </motion.div>
  );
};

export default LoginButton;
