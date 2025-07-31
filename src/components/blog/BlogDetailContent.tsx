
import React from 'react';

interface BlogDetailContentProps {
  content: string;
}

const BlogDetailContent = ({ content }: BlogDetailContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div 
        className="prose prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
          prose-ul:text-gray-700 prose-ol:text-gray-700
          prose-li:mb-1
          prose-blockquote:border-l-4 prose-blockquote:border-tmtn-blue 
          prose-blockquote:bg-gray-50 prose-blockquote:p-4 
          prose-blockquote:italic prose-blockquote:text-gray-800
          prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
          prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogDetailContent;

