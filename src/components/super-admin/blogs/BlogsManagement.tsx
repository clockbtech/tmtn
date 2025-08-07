
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  FileText,
  TrendingUp,
  MessageSquare,
  Heart,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const blogs = [
  {
    id: 'BLG001',
    title: 'Top 10 Hidden Gems in Paris You Must Visit',
    slug: 'hidden-gems-paris',
    excerpt: 'Discover the secret spots that even locals don\'t know about...',
    content: 'Full blog content here...',
    author: 'Sarah Wilson',
    status: 'published',
    category: 'Travel Tips',
    tags: ['Paris', 'Hidden Gems', 'Travel Guide'],
    publishDate: '2024-01-15',
    lastModified: '2024-01-16',
    views: 1250,
    likes: 89,
    comments: 23,
    featured: true,
    image: '/api/placeholder/300/200',
  },
  {
    id: 'BLG002',
    title: 'Ultimate Guide to Bali Beach Hopping',
    slug: 'bali-beach-hopping-guide',
    excerpt: 'From pristine white sands to dramatic cliffs...',
    content: 'Full blog content here...',
    author: 'Mike Chen',
    status: 'published',
    category: 'Destinations',
    tags: ['Bali', 'Beaches', 'Indonesia'],
    publishDate: '2024-01-12',
    lastModified: '2024-01-13',
    views: 890,
    likes: 67,
    comments: 15,
    featured: false,
    image: '/api/placeholder/300/200',
  },
  {
    id: 'BLG003',
    title: 'Mountain Adventure Photography Tips',
    slug: 'mountain-photography-tips',
    excerpt: 'Capture breathtaking mountain landscapes with these pro tips...',
    content: 'Full blog content here...',
    author: 'Alex Turner',
    status: 'draft',
    category: 'Photography',
    tags: ['Photography', 'Mountains', 'Tips'],
    publishDate: null,
    lastModified: '2024-01-18',
    views: 0,
    likes: 0,
    comments: 0,
    featured: false,
    image: '/api/placeholder/300/200',
  },
];

const categories = ['All', 'Travel Tips', 'Destinations', 'Photography', 'Culture', 'Food'];

export const BlogsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || blog.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: 'default' as const, color: 'text-green-600' },
      draft: { variant: 'secondary' as const, color: 'text-yellow-600' },
      archived: { variant: 'outline' as const, color: 'text-gray-600' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <Badge variant={config.variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const BlogDetail = ({ blog }: { blog: any }) => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-32 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{blog.excerpt}</p>
          <div className="flex gap-2 mt-2">
            {getStatusBadge(blog.status)}
            {blog.featured && <Badge variant="outline">Featured</Badge>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Blog Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">ID:</span> {blog.id}</p>
            <p><span className="font-medium">Slug:</span> {blog.slug}</p>
            <p><span className="font-medium">Author:</span> {blog.author}</p>
            <p><span className="font-medium">Category:</span> {blog.category}</p>
            <p><span className="font-medium">Publish Date:</span> {blog.publishDate || 'Not published'}</p>
            <p><span className="font-medium">Last Modified:</span> {blog.lastModified}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Engagement Stats</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Views:</span> {blog.views.toLocaleString()}</p>
            <p><span className="font-medium">Likes:</span> {blog.likes}</p>
            <p><span className="font-medium">Comments:</span> {blog.comments}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Tags</h4>
        <div className="flex gap-1 flex-wrap">
          {blog.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button size="sm">Edit Blog</Button>
        <Button variant="outline" size="sm">Preview</Button>
        {blog.status === 'draft' && (
          <Button variant="outline" size="sm">Publish</Button>
        )}
        <Button variant="outline" size="sm">View Analytics</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">Create and manage blog posts and articles</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+23% engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,847</div>
            <p className="text-xs text-muted-foreground">+15% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Tag className="h-4 w-4 mr-2" />
              Manage Tags
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts ({filteredBlogs.length})</CardTitle>
          <CardDescription>
            Manage your blog posts and articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-12 h-8 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{blog.title}</div>
                        <div className="text-sm text-muted-foreground">{blog.excerpt.slice(0, 50)}...</div>
                        {blog.featured && <Badge variant="outline" className="mt-1 text-xs">Featured</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {blog.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{blog.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(blog.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {blog.publishDate || 'Not published'}
                    </div>
                  </TableCell>
                  <TableCell>{blog.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{blog.likes} likes</div>
                      <div className="text-muted-foreground">{blog.comments} comments</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>Blog Details - {blog.title}</DialogTitle>
                            <DialogDescription>
                              Complete blog post information and statistics
                            </DialogDescription>
                          </DialogHeader>
                          <BlogDetail blog={blog} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
