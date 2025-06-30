import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
gsap.registerPlugin(ScrollTrigger);
const BlogPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    t
  } = useTranslation();
  const blogPosts = [{
    id: 1,
    title: 'Ultimate Guide to Trekking in Nepal',
    excerpt: 'Everything you need to know before embarking on your Himalayan adventure, from gear to permits.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Pemba Sherpa',
    date: '2024-06-15',
    category: 'Trekking',
    readTime: '8 min read'
  }, {
    id: 2,
    title: 'Exploring Ancient Temples of Kathmandu',
    excerpt: 'Discover the spiritual heart of Nepal through its magnificent temples and sacred sites.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Maya Tamang',
    date: '2024-06-12',
    category: 'Culture',
    readTime: '6 min read'
  }, {
    id: 3,
    title: 'Wildlife Photography in Chitwan',
    excerpt: 'Tips and tricks for capturing stunning wildlife photos in Nepal\'s premier national park.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Raj Thapa',
    date: '2024-06-10',
    category: 'Wildlife',
    readTime: '5 min read'
  }];
  useEffect(() => {
    const cards = gsap.utils.toArray('.blog-card');
    gsap.fromTo(cards, {
      opacity: 0,
      y: 60,
      rotationX: 15
    }, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <section ref={sectionRef} className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-4xl font-tm-sans uppercase font-extrabold text-nepal-primary mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => <motion.article key={post.id} className="blog-card group cursor-pointer" whileHover={{
          y: -10
        }} transition={{
          duration: 0.3
        }}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <span className="text-nepal-orange">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-normal text-nepal-primary mb-3 group-hover:text-nepal-orange transition-colors duration-200 text-xl font-semibold px-0">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <motion.div whileHover={{
                x: 5
              }} className="flex items-center text-nepal-orange hover:text-orange-600 font-semibold transition-colors duration-200">
                    <span>{t('blog.readMore')}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </div>
              </div>
            </motion.article>)}
        </div>

        {/* View All Button */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }} className="text-center mt-12">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="bg-nepal-primary hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-tm-sans font-semibold transition-all duration-300 shadow-lg">
            {t('blog.viewAll')}
          </motion.button>
        </motion.div>
      </div>
    </section>;
};
export default BlogPreview;