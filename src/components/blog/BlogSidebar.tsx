
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search } from 'lucide-react';

interface BlogSidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  blogs: any[];
}

const categories = [
  { name: 'Adventure', count: 12 },
  { name: 'Culture', count: 8 },
  { name: 'Travel Tips', count: 15 },
  { name: 'Food & Culture', count: 6 },
  { name: 'Wildlife', count: 4 },
  { name: 'Spirituality', count: 7 },
];

const recentPosts = [
  {
    title: "Ultimate Guide to Everest Base Camp Trek",
    slug: "everest-base-camp-guide",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop"
  },
  {
    title: "Hidden Gems of Kathmandu Valley",
    slug: "kathmandu-hidden-gems",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=100&fit=crop"
  },
  {
    title: "Best Time to Visit Nepal",
    slug: "best-time-visit-nepal",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=100&h=100&fit=crop"
  },
  {
    title: "Traditional Nepalese Cuisine",
    slug: "traditional-nepalese-cuisine",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=100&h=100&fit=crop"
  }
];

const popularTags = [
  'Everest', 'Trekking', 'Kathmandu', 'Culture', 'Adventure', 'Wildlife', 
  'Spirituality', 'Food', 'Temples', 'Himalayas', 'Nepal', 'Travel'
];

const BlogSidebar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange 
}: BlogSidebarProps) => {
  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onCategoryChange('')}
              className={`text-left w-full hover:text-nepal-primary transition-colors ${
                selectedCategory === '' ? 'text-nepal-primary font-medium' : 'text-gray-600'
              }`}
            >
              All Posts
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => onCategoryChange(category.name)}
                className={`text-left w-full flex justify-between hover:text-nepal-primary transition-colors ${
                  selectedCategory === category.name ? 'text-nepal-primary font-medium' : 'text-gray-600'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-sm">({category.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex items-center space-x-3 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-nepal-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <Badge
              key={tag}
              variant="outline"
              className={`cursor-pointer hover:bg-nepal-primary hover:text-white transition-colors ${
                index % 3 === 0 ? 'text-base' : index % 2 === 0 ? 'text-sm' : 'text-xs'
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
