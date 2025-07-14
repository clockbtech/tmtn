
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Form submitted:', formData);
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="w-full bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/lovable-uploads/56628e38-93c6-4daf-bc37-68b2e759d39e.png')"
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create An Account To Get Started'}
            </h2>
            {!isLogin && (
              <div className="inline-flex items-center bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="mr-1">20% off</span>
                <span className="text-orange-100">get 20% off for web signup</span>
              </div>
            )}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6">
              {!isLogin && (
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name*"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 bg-white border-gray-300"
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 bg-white border-gray-300 pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Your password
                  </Label>
                  {isLogin && (
                    <Link to="#" className="text-sm text-nepal-primary hover:underline">
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password*"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 bg-white border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="text-center text-gray-500">or</div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center space-x-2 border-gray-300 bg-white hover:bg-gray-50"
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
                onClick={() => handleSocialLogin('facebook')}
                className="w-full flex items-center justify-center space-x-2 border-gray-300 bg-white hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Sign in with Facebook</span>
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              {isLogin ? 'SIGN IN' : 'SIGN UP'}
            </Button>

            {!isLogin && (
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-0.5" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  By signing up, you agree to{' '}
                  <Link to="#" className="text-nepal-primary hover:underline">
                    Customer.ai's Terms Of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-nepal-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}

            <div className="text-center">
              <span className="text-gray-600">
                {isLogin ? "Don't you have an account?" : "Already have an account?"}
              </span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-green-600 hover:text-green-700 font-semibold p-0 h-auto"
              >
                {isLogin ? 'Register' : 'Sign In'}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
