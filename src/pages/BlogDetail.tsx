
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogDetailHero from '../components/blog/BlogDetailHero';
import BlogDetailContent from '../components/blog/BlogDetailContent';
import BlogDetailSidebar from '../components/blog/BlogDetailSidebar';
import AuthorBio from '../components/blog/AuthorBio';
import CommentSection from '../components/blog/CommentSection';
import SocialShareBar from '../components/blog/SocialShareBar';

// Mock blog detail data
const mockBlogDetail = {
  id: 1,
  title: "Ultimate Guide to Everest Base Camp Trek",
  heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop",
  author: "Sarah Chen",
  authorImage: "https://images.unsplash.com/photo-1494790108755-2616c28ca1bd?w=100&h=100&fit=crop&crop=face",
  authorBio: "Sarah is an experienced mountaineer and travel writer who has trekked through the Himalayas multiple times. She specializes in high-altitude adventures and sustainable tourism.",
  date: "2024-06-20",
  readTime: "8 min read",
  category: "Adventure",
  tags: ["Everest", "Trekking", "Nepal", "Adventure", "Himalayas"],
  content: `
    <p>The Everest Base Camp trek is one of the most iconic adventure experiences in the world. Standing at the foot of the world's tallest mountain, you'll witness breathtaking views and experience the unique culture of the Sherpa people.</p>
    
    <h2>Planning Your Trek</h2>
    <p>Proper planning is essential for a successful Everest Base Camp trek. The journey typically takes 12-14 days and requires good physical fitness and mental preparation.</p>
    
    <blockquote>"The mountains are calling and I must go." - John Muir</blockquote>
    
    <h3>Best Time to Trek</h3>
    <ul>
      <li>Pre-monsoon: March to May</li>
      <li>Post-monsoon: September to November</li>
      <li>Clear mountain views and stable weather</li>
    </ul>
    
    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop" alt="Mountain vista during trek" />
    
    <h3>Essential Gear</h3>
    <p>Having the right gear can make or break your trek. Here's what you'll need:</p>
    
    <ol>
      <li>High-quality trekking boots</li>
      <li>Layered clothing system</li>
      <li>Sleeping bag rated for -15°C</li>
      <li>Trekking poles</li>
      <li>Headlamp and extra batteries</li>
    </ol>
    
    <h2>The Trek Experience</h2>
    <p>The journey to Everest Base Camp is as rewarding as the destination itself. You'll pass through traditional Sherpa villages, ancient monasteries, and stunning landscapes that change dramatically with altitude.</p>
    
    <blockquote>"It is not the mountain we conquer, but ourselves." - Sir Edmund Hillary</blockquote>
    
    <p>Each day brings new challenges and rewards. From the bustling markets of Namche Bazaar to the serene beauty of the Khumbu Valley, every step tells a story of human determination and natural wonder.</p>
  `,
  socialLinks: {
    facebook: "https://facebook.com/takemetonepal",
    instagram: "https://instagram.com/takemetonepal",
    twitter: "https://twitter.com/takemetonepal"
  }
};

const BlogDetail = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BlogDetailHero blog={mockBlogDetail} />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <BlogDetailContent content={mockBlogDetail.content} />
              <AuthorBio author={mockBlogDetail} />
              <CommentSection />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogDetailSidebar currentBlog={mockBlogDetail} />
            </div>
          </div>
        </div>
        
        <SocialShareBar blog={mockBlogDetail} />
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
