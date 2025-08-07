import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Calendar, MapPin, Star, Trophy } from 'lucide-react';
const AccountHero = () => {
  return <section className="relative bg-gradient-to-r from-tmtn-blue to-nepal-secondary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/a26300b1-f01d-4f86-880d-99c4fc88d181.png')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-[130px]">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column - User Profile */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} className="lg:col-span-2">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="text-2xl bg-tmtn-red text-white">JS</AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-4xl font-bold font-bebas mb-2">
                  Welcome back, Jayvion!
                </h1>
                <p className="text-xl text-white/80 mb-3">
                  Your next adventure awaits
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since 2022</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Trophy className="w-3 h-3 mr-1" />
                Explorer Level
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="w-3 h-3 mr-1" />
                5.0 Rating
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                3 Completed Trips
              </Badge>
            </div>
          </motion.div>
          
          {/* Right Column - Quick Stats */}
          
        </div>
      </div>
    </section>;
};
export { AccountHero };