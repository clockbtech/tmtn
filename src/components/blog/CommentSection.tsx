import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  replies?: Comment[];
}
const mockComments: Comment[] = [{
  id: 1,
  author: "Mike Anderson",
  date: "2024-06-21",
  content: "Great article! I'm planning my EBC trek for next year and this guide is incredibly helpful. Do you have any recommendations for training routines?",
  replies: [{
    id: 2,
    author: "Sarah Chen",
    date: "2024-06-21",
    content: "Thanks Mike! I recommend starting with regular hiking and gradually increasing distance. Focus on cardio and leg strength. I'll write a detailed training article soon!"
  }]
}, {
  id: 3,
  author: "Emma Thompson",
  date: "2024-06-20",
  content: "The photos are stunning! How did you manage the altitude sickness? Any specific tips for first-time high-altitude trekkers?"
}, {
  id: 4,
  author: "David Kumar",
  date: "2024-06-20",
  content: "I did this trek last year and can confirm everything Sarah mentioned. The experience was life-changing. Make sure to book your flights early as Lukla airport can be unpredictable!"
}];
const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to post a comment.');
      return;
    }
    const comment: Comment = {
      id: Date.now(),
      author: newComment.name,
      date: new Date().toISOString().split('T')[0],
      content: newComment.content
    };
    setComments([comment, ...comments]);
    setNewComment({
      name: '',
      email: '',
      content: ''
    });
  };
  const CommentItem = ({
    comment,
    isReply = false
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''} mb-6`}>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-tmtn-blue rounded-full flex items-center justify-center text-white font-semibold">
          {comment.author.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900">{comment.author}</h4>
            <span className="text-sm text-gray-500">
              {new Date(comment.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          {!isReply && <Button variant="ghost" size="sm" className="text-tmtn-blue hover:text-tmtn-blue/80">
              Reply
            </Button>}
        </div>
      </div>
      
      {comment.replies && comment.replies.map(reply => <div key={reply.id} className="mt-4">
          <CommentItem comment={reply} isReply={true} />
        </div>)}
    </div>;
  return <div className="bg-white rounded-lg shadow-sm p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h4>
        
        {!isLoggedIn ? <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Please log in to post a comment.</p>
            <Button onClick={() => setIsLoggedIn(true)} className="bg-tmtn-blue hover:bg-tmtn-blue/90 rounded-full">
              Log In
            </Button>
          </div> : <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" type="text" required value={newComment.name} onChange={e => setNewComment({
              ...newComment,
              name: e.target.value
            })} />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required value={newComment.email} onChange={e => setNewComment({
              ...newComment,
              email: e.target.value
            })} />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Comment *</Label>
              <textarea id="content" required rows={4} className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tmtn-blue focus:border-transparent" value={newComment.content} onChange={e => setNewComment({
            ...newComment,
            content: e.target.value
          })} placeholder="Share your thoughts..." />
            </div>
            <Button type="submit" className="bg-tmtn-blue hover:bg-tmtn-blue/90">
              Post Comment
            </Button>
          </form>}
      </div>

      {/* Comments List */}
      <div>
        {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
        
        {comments.length === 0 && <div className="text-center py-8 text-gray-500">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>}
      </div>
    </div>;
};
export default CommentSection;
