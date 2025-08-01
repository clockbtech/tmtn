import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Pemba Sherpa',
    date: '2024-06-15',
    category: 'Trekking',
    readTime: '8 min read'
  }, {
    id: 2,
    title: 'Exploring Ancient Temples of Kathmandu',
    excerpt: 'Discover the spiritual heart of Nepal through its magnificent temples and sacred sites.',
    image: 'https://images.unsplash.com/photo-1665394183024-7a95b156d427?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Maya Tamang',
    date: '2024-06-12',
    category: 'Culture',
    readTime: '6 min read'
  }, {
    id: 3,
    title: 'Wildlife Photography in Chitwan',
    excerpt: 'Tips and tricks for capturing stunning wildlife photos in Nepal\'s premier national park.',
    image: 'https://images.unsplash.com/photo-1530998494235-c9a1f4a0d1a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          <h2 className="text-4xl lg:text-4xl font-tm-sans uppercase font-extrabold text-tmtn-blue mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => <Link to={`/blog/${post.id}`} key={post.id}><motion.article className="blog-card group cursor-pointer" whileHover={{
          y: -10
        }} transition={{
          duration: 0.3
        }}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-tmtn-red text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    <span className="text-tmtn-red">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-normal text-tmtn-blue mb-3 group-hover:text-tmtn-red transition-colors duration-200 text-xl font-semibold px-0">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <motion.div whileHover={{
                x: 5
              }} className="flex items-center text-tmtn-red hover:text-orange-600 font-semibold transition-colors duration-200">
                    <span>{t('blog.readMore')}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </div>
              </div>
            </motion.article></Link>)}
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
          <Link to="/blog">
            <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="btn-gradient text-white px-8 py-3 rounded-full text-lg font-tm-sans font-semibold">
              {t('blog.viewAll')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>;
};
export default BlogPreview;
