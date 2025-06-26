
import React from 'react';
import { Button } from '../ui/button';

interface AuthorBioProps {
  author: {
    author: string;
    authorImage: string;
    authorBio: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
}

const AuthorBio = ({ author }: AuthorBioProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <img
          src={author.authorImage}
          alt={author.author}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">About {author.author}</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {author.authorBio}
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href={author.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Facebook
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href={author.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700"
              >
                Instagram
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href={author.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                Twitter
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
