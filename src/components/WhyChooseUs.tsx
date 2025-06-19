
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Users, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: MapPin,
      title: 'Localized Experiences',
      description: 'Authentic adventures curated by local experts who know Nepal\'s hidden gems and cultural nuances.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our priority with experienced guides, proper equipment, and comprehensive insurance coverage.'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Professional, certified guides with deep knowledge of Nepal\'s mountains, culture, and wildlife.'
    },
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'Recognized excellence in customer service and sustainable tourism practices in Nepal.'
    }
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray('.feature-card');
    
    gsap.fromTo(cards, 
      {
        opacity: 0,
        y: 80,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-nepal-primary text-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bebas uppercase font-bold mb-4">
            Why Choose Take Me To Nepal?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're not just a travel company – we're your gateway to authentic Nepalese experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="feature-card text-center group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full hover:bg-white/20 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-nepal-orange rounded-full mb-6"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bebas uppercase font-semibold mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-blue-100 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '10,000+', label: 'Happy Travelers' },
            { number: '500+', label: 'Tours Completed' },
            { number: '15+', label: 'Years Experience' },
            { number: '98%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl lg:text-4xl font-bebas uppercase font-bold text-nepal-orange mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
