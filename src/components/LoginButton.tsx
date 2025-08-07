
import React from 'react';
import { User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LoginButtonProps {
  textColor: string;
}

const LoginButton = ({ textColor }: LoginButtonProps) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleAdminLogin = () => {
    // Simple admin login simulation
    localStorage.setItem('isAdmin', 'true');
    window.location.href = '/super-admin';
  };

  if (isAdmin) {
    return (
      <div className="flex gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/super-admin"
            className={`${textColor} hover:text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-4 py-2 rounded-full flex items-center space-x-2 font-medium text-sm`}
            aria-label="Admin Panel"
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </Link>
        </motion.div>
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
            <span>Account</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleAdminLogin}
          className={`${textColor} hover:text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 px-4 py-2 rounded-full flex items-center space-x-2 font-medium text-sm`}
          aria-label="Admin Access"
        >
          <Shield className="w-4 h-4" />
          <span>Admin</span>
        </Button>
      </motion.div>
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
    </div>
  );
};

export default LoginButton;
