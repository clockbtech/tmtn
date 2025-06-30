import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };
  return <section className="py-20 bg-gradient-to-r from-nepal-primary to-blue-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-nepal-orange rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl lg:text-4xl font-tm-sans uppercase font-extrabold text-white mb-4">
              Stay Connected with Nepal
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest travel tips, exclusive deals, and inspiring stories from Nepal delivered to your inbox
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? <motion.form key="form" initial={{
              opacity: 1
            }} exit={{
              opacity: 0,
              scale: 0.8
            }} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-nepal-orange/30 transition-all duration-200" required />
                  </div>
                  
                  <motion.button type="submit" disabled={isLoading} whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} className="bg-nepal-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
                    {isLoading ? <motion.div animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : 'Subscribe'}
                  </motion.button>
                </motion.form> : <motion.div key="success" initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="bg-green-500 text-white px-8 py-4 rounded-full flex items-center justify-center space-x-2">
                  <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                delay: 0.2
              }}>
                    <Check className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold">Successfully subscribed!</span>
                </motion.div>}
            </AnimatePresence>

            <p className="text-blue-200 text-sm mt-4">
              Join 10,000+ travelers. Unsubscribe anytime.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[{
            label: 'Weekly Updates',
            value: '1x'
          }, {
            label: 'Exclusive Deals',
            value: '20%'
          }, {
            label: 'Happy Subscribers',
            value: '10K+'
          }].map((item, index) => <div key={index} className="text-center">
                <div className="text-2xl font-bold text-nepal-orange mb-1">
                  {item.value}
                </div>
                <div className="text-blue-200 text-sm">
                  {item.label}
                </div>
              </div>)}
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Newsletter;