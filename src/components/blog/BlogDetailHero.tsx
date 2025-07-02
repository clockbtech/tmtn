import React from 'react';
import { Badge } from '../ui/badge';
interface BlogDetailHeroProps {
  blog: {
    title: string;
    heroImage: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
  };
}
const BlogDetailHero = ({
  blog
}: BlogDetailHeroProps) => {
  return <div className="relative h-96 md:h-[500px] overflow-hidden">
      <img src={blog.heroImage} alt={blog.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="container mx-auto">
          <Badge className="mb-4 bg-nepal-primary text-white">
            {blog.category}
          </Badge>
          
          <h1 className="text-3xl uppercase text-white mb-4 max-w-4xl md:text-4xl font-extrabold">
            {blog.title}
          </h1>
          
          <div className="flex items-center text-white/90 text-sm md:text-base">
            <span>By {blog.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>
    </div>;
};
export default BlogDetailHero;