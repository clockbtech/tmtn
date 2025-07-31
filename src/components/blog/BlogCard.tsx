
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    slug: string;
  };
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-tmtn-blue text-white px-3 py-1 rounded-full text-sm font-medium">
            {blog.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-tmtn-blue transition-colors">
          <Link to={`/blog/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>By {blog.author}</span>
          <span>{blog.date} • {blog.readTime}</span>
        </div>
        
        <Link to={`/blog/${blog.slug}`}>
          <Button 
            variant="gradient"
            className="w-full py-3 rounded-lg font-semibold"
          >
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
