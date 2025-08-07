
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      navigate('/account');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    // Simulate Google sign in
    navigate('/account');
  };

  const handleFacebookSignIn = () => {
    // Simulate Facebook sign in
    navigate('/account');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Mountain background */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/3909d361-7017-4536-b256-c31d70c7e5b0.png)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black">tmtn.</h1>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {isSignUp ? 'Create An Account To Get Started' : 'Welcome Back'}
            </h2>
            {isSignUp && (
              <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-6">
                Get 20% off for web signup
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field for signup */}
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email*"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <Mail className="absolute right-3 top-3 h-5 w-5 text-green-500" />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Your password
                </Label>
                {!isSignUp && (
                  <button type="button" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password*"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="text-center text-gray-500 text-sm my-4">
              or
            </div>

            {/* Social login buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleFacebookSignIn}
                className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Sign in with Facebook</span>
              </Button>
            </div>

            {/* Terms and conditions for signup */}
            {isSignUp && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" required />
                <span>
                  By signing up, you agree to{' '}
                  <button type="button" className="text-blue-500 hover:underline">
                    Customer.ai's Terms Of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </button>
                </span>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>{isSignUp ? 'Signing up...' : 'Signing in...'}</span>
              ) : (
                <span>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</span>
              )}
            </Button>
          </form>

          {/* Toggle between login and signup */}
          <div className="text-center text-sm text-gray-600">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-green-600 hover:underline font-medium"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't you have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-green-600 hover:underline font-medium"
                >
                  Register
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
