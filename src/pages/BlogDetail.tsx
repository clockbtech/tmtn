
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
  heroImage: "https://images.prismic.io/elite-exped/YjdiMGZhZTgtN2IxMS00ZDQ1LTg0YmQtN2ViMzBlZWEyYmIz_314b898d-286a-4ec9-b4d4-96474f771ab9_everest-ridge.jpg?auto=compress,format&rect=0,0,4890,3260&w=2400&h=1600",
  author: "Sarah Chen",
  authorImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fEdpcmx8ZW58MHx8MHx8fDA%3D",
  authorBio: "Sarah is an experienced mountaineer and travel writer who has trekked through the Himalayas multiple times. She specializes in high-altitude adventures and sustainable tourism.",
  date: "2024-06-20",
  readTime: "8 min read",
  category: "Adventure",
  tags: ["Everest", "Trekking", "Nepal", "Adventure", "Himalayas"],
  content: `
    <p>Everest Base Camp Trek is one of the most iconic and popular treks in the world, drawing thousands of trekkers every year to the foothills of Mount Everest. This epic adventure takes you through Sherpa villages, Buddhist monasteries, lush valleys, and breathtaking mountain vistas, ultimately leading to Everest Base Camp itself while offering an incredible opportunity to witness the grandeur of the world’s highest peak, experience Sherpa culture, and explore the rugged Himalayan landscapes.
    This trek is suitable for trekkers with moderate to good fitness levels and is often undertaken by those seeking the ultimate trekking experience in Nepal. While the trek offers incredible natural beauty and the thrill of being at the foot of Everest, it also challenges trekkers with the altitude and long, strenuous days. The Everest Base Camp Trek takes you through the Sagarmatha National Park, a UNESCO World Heritage Site, and provides incredible views of Mount Everest, as well as surrounding peaks such as Lhotse, Makalu, and Cho Oyu. The trek starts in Lukla, following a well-trodden path through picturesque villages, green forests, and alpine meadows, all while being surrounded by snow-capped peaks.Along the way, trekkers will pass through famous Sherpa villages like Namche Bazaar, Tengboche, and Dingboche, all of which offer unique cultural experiences and panoramic views.</p>
    
    <blockquote>"The mountains are calling and I must go." - John Muir</blockquote>
    <br/>
    
    <img src="https://images.unsplash.com/photo-1597666864156-2e7ae49fca5a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mountain vista during trek" />
   <br/>
    <p>The Everest region is part of the Mahalangur mountain range in the central Himalayas and is often characterized by dramatic landscapes, including glaciers, alpine meadows, rocky ridges, and steep mountain valleys. Mount Everest is a tectonic collision of the Indian and Eurasian plates, which has given rise to the Himalayan mountain range. The trek takes trekkers through glaciers like the Khumbu Glacier, deep valleys, and rugged ridgelines. The geological history of the region is evidenced by the varied rock formations and rugged terrain that surround Everest and its neighboring peaks. The Everest Base Camp Trek passes through diverse ecosystems, each supporting different species of flora and fauna. The flora changes as you ascend through the different altitudes, with lower regions covered in lush forests of pine, rhododendron, and oak, while higher altitudes feature alpine meadows and sparse vegetation.</p>
    
    <blockquote>"It is not the mountain we conquer, but ourselves." - Sir Edmund Hillary</blockquote>
    
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
