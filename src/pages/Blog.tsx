import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogHero from '../components/blog/BlogHero';
import BlogCard from '../components/blog/BlogCard';
import BlogSidebar from '../components/blog/BlogSidebar';
import BlogPagination from '../components/blog/BlogPagination';

// Mock blog data
const mockBlogs = [{
  id: 1,
  title: "Ultimate Guide to Everest Base Camp Trek",
  excerpt: "Discover everything you need to know about trekking to Everest Base Camp, from preparation tips to what to expect on this incredible journey through the Himalayas.",
  image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop",
  author: "Sarah Chen",
  date: "2024-06-20",
  readTime: "8 min read",
  category: "Adventure",
  slug: "everest-base-camp-guide"
}, {
  id: 2,
  title: "Hidden Gems of Kathmandu Valley",
  excerpt: "Explore the lesser-known temples, local markets, and cultural sites that make Kathmandu Valley a treasure trove of experiences beyond the main tourist attractions.",
  image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=450&fit=crop",
  author: "Rajesh Sharma",
  date: "2024-06-18",
  readTime: "6 min read",
  category: "Culture",
  slug: "kathmandu-hidden-gems"
}, {
  id: 3,
  title: "Best Time to Visit Nepal: A Seasonal Guide",
  excerpt: "Planning your Nepal adventure? Learn about the best seasons for trekking, festivals, and different activities throughout the year in this comprehensive guide.",
  image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=450&fit=crop",
  author: "Maya Gurung",
  date: "2024-06-15",
  readTime: "5 min read",
  category: "Travel Tips",
  slug: "best-time-visit-nepal"
}, {
  id: 4,
  title: "Traditional Nepalese Cuisine You Must Try",
  excerpt: "From dal bhat to momos, discover the rich flavors of Nepal's traditional cuisine and where to find the most authentic dishes during your visit.",
  image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=450&fit=crop",
  author: "Priya Thapa",
  date: "2024-06-12",
  readTime: "7 min read",
  category: "Food & Culture",
  slug: "traditional-nepalese-cuisine"
}, {
  id: 5,
  title: "Wildlife Safari in Chitwan National Park",
  excerpt: "Experience Nepal's incredible biodiversity with a wildlife safari in Chitwan National Park, home to rhinos, tigers, and over 500 bird species.",
  image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=450&fit=crop",
  author: "David Wilson",
  date: "2024-06-10",
  readTime: "6 min read",
  category: "Wildlife",
  slug: "chitwan-wildlife-safari"
}, {
  id: 6,
  title: "Spiritual Journey: Meditation Retreats in Nepal",
  excerpt: "Find inner peace in the birthplace of Buddha. Discover the best meditation retreats and spiritual experiences Nepal has to offer for seekers of all levels.",
  image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=450&fit=crop",
  author: "Lama Tenzin",
  date: "2024-06-08",
  readTime: "9 min read",
  category: "Spirituality",
  slug: "meditation-retreats-nepal"
}];
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const blogsPerPage = 6;
  const totalPages = Math.ceil(mockBlogs.length / blogsPerPage);

  // Filter blogs based on search and category
  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginate filtered blogs
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);
  return <div className="min-h-screen bg-white py-0">
      <Header />
      <main className="py-0">
        <BlogHero />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - 70% width on desktop */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
              </div>
              
              {filteredBlogs.length === 0 && <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
                </div>}
              
              {filteredBlogs.length > 0 && <BlogPagination currentPage={currentPage} totalPages={Math.ceil(filteredBlogs.length / blogsPerPage)} onPageChange={setCurrentPage} />}
            </div>
            
            {/* Sidebar - 30% width on desktop */}
            <div className="lg:col-span-1">
              <BlogSidebar searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} blogs={mockBlogs} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Blog;