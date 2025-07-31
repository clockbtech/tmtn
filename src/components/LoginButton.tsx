
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
        className={`${textColor} hover:text-white bg-tmtn-red hover:bg-tmtn-red/80 transition-all duration-200 px-4 py-2 rounded-full flex items-center space-x-2 font-medium text-sm`}
        aria-label="Login"
      >
        <User className="w-4 h-4" />
        <span>Login</span>
      </Link>
    </motion.div>
  );
};

export default LoginButton;

