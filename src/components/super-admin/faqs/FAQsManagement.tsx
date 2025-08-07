
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  DialogFooter,
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
  HelpCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Tag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const faqs = [
  {
    id: 'FAQ001',
    question: 'How do I cancel my booking?',
    answer: 'You can cancel your booking by logging into your account and visiting the "My Bookings" section. Cancellation policies vary depending on the experience and timing.',
    category: 'Bookings',
    order: 1,
    status: 'published',
    views: 1250,
    helpful: 89,
    notHelpful: 12,
    lastUpdated: '2024-01-15',
    tags: ['cancellation', 'booking', 'policy'],
  },
  {
    id: 'FAQ002',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for bookings.',
    category: 'Payments',
    order: 2,
    status: 'published',
    views: 980,
    helpful: 67,
    notHelpful: 8,
    lastUpdated: '2024-01-12',
    tags: ['payment', 'credit card', 'paypal'],
  },
  {
    id: 'FAQ003',
    question: 'Do I need travel insurance?',
    answer: 'While travel insurance is not mandatory, we highly recommend it to protect your investment and provide peace of mind during your travels.',
    category: 'Travel Tips',
    order: 3,
    status: 'published',
    views: 756,
    helpful: 45,
    notHelpful: 5,
    lastUpdated: '2024-01-10',
    tags: ['insurance', 'travel', 'safety'],
  },
  {
    id: 'FAQ004',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-3 months in advance for popular destinations, especially during peak seasons.',
    category: 'Bookings',
    order: 4,
    status: 'draft',
    views: 0,
    helpful: 0,
    notHelpful: 0,
    lastUpdated: '2024-01-18',
    tags: ['booking', 'advance', 'planning'],
  },
];

const categories = ['All', 'Bookings', 'Payments', 'Travel Tips', 'Safety', 'Destinations'];

export const FAQsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || faq.status === selectedStatus;
    
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

  const FAQForm = ({ faq, onClose }: { faq?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      question: faq?.question || '',
      answer: faq?.answer || '',
      category: faq?.category || '',
      tags: faq?.tags?.join(', ') || '',
      status: faq?.status || 'draft',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('FAQ form submitted:', formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            value={formData.question}
            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Enter the frequently asked question"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Answer</Label>
          <Textarea
            id="answer"
            value={formData.answer}
            onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
            placeholder="Enter the detailed answer"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="booking, payment, policy"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {faq ? 'Update FAQ' : 'Add FAQ'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  const FAQDetail = ({ faq }: { faq: any }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
        <p className="text-muted-foreground">{faq.answer}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">FAQ Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">ID:</span> {faq.id}</p>
            <p><span className="font-medium">Category:</span> {faq.category}</p>
            <p><span className="font-medium">Order:</span> {faq.order}</p>
            <p><span className="font-medium">Last Updated:</span> {faq.lastUpdated}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Engagement Stats</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Views:</span> {faq.views.toLocaleString()}</p>
            <p><span className="font-medium">Helpful:</span> {faq.helpful}</p>
            <p><span className="font-medium">Not Helpful:</span> {faq.notHelpful}</p>
            <p><span className="font-medium">Helpfulness:</span> {faq.helpful + faq.notHelpful > 0 ? Math.round((faq.helpful / (faq.helpful + faq.notHelpful)) * 100) : 0}%</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Tags</h4>
        <div className="flex gap-1 flex-wrap">
          {faq.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">FAQ Management</h2>
          <p className="text-muted-foreground">Manage frequently asked questions and help content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription>
                Create a new frequently asked question
              </DialogDescription>
            </DialogHeader>
            <FAQForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+4 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4K</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Helpfulness</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Active categories</p>
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
                placeholder="Search FAQs..."
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
              Manage Categories
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQs Table */}
      <Card>
        <CardHeader>
          <CardTitle>FAQs ({filteredFAQs.length})</CardTitle>
          <CardDescription>
            Manage frequently asked questions and help content
          </DialogDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Helpfulness</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFAQs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{faq.question}</div>
                      <div className="text-sm text-muted-foreground">
                        {faq.answer.slice(0, 80)}...
                      </div>
                      <div className="flex gap-1 mt-1">
                        {faq.tags.slice(0, 2).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {faq.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{faq.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{faq.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(faq.status)}</TableCell>
                  <TableCell>{faq.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{faq.helpful + faq.notHelpful > 0 ? Math.round((faq.helpful / (faq.helpful + faq.notHelpful)) * 100) : 0}%</div>
                      <div className="text-muted-foreground">{faq.helpful}/{faq.helpful + faq.notHelpful}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <span className="text-sm">{faq.order}</span>
                      <Button variant="ghost" size="sm">
                        <ArrowDown className="h-3 w-3" />
                      </Button>
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
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>FAQ Details</DialogTitle>
                            <DialogDescription>
                              Complete FAQ information and statistics
                            </DialogDescription>
                          </DialogHeader>
                          <FAQDetail faq={faq} />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit FAQ</DialogTitle>
                            <DialogDescription>
                              Update FAQ information
                            </DialogDescription>
                          </DialogHeader>
                          <FAQForm faq={faq} onClose={() => {}} />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this FAQ? This action cannot be undone.
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
