
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  Calendar,
  FileText,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface TermsSection {
  id: string;
  title: string;
  content: string;
  order: number;
  lastUpdated: string;
  status: 'active' | 'draft';
}

const mockSections: TermsSection[] = [
  {
    id: '1',
    title: 'Acceptance of Terms',
    content: 'By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.',
    order: 1,
    lastUpdated: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'Booking and Payment Terms',
    content: 'All bookings are subject to availability and confirmation. Payment must be made according to the terms specified at the time of booking.',
    order: 2,
    lastUpdated: '2024-01-15',
    status: 'active'
  },
  {
    id: '3',
    title: 'Cancellation Policy',
    content: 'Cancellations must be made according to our cancellation policy. Refunds will be processed based on the timing of cancellation.',
    order: 3,
    lastUpdated: '2024-01-10',
    status: 'draft'
  }
];

export const TermsOfServiceManagement = () => {
  const [sections, setSections] = useState<TermsSection[]>(mockSections);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<TermsSection | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft' as 'active' | 'draft'
  });

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (section: TermsSection) => {
    setEditingSection(section);
    setFormData({
      title: section.title,
      content: section.content,
      status: section.status
    });
    setIsEditing(true);
  };

  const handleAdd = () => {
    setEditingSection(null);
    setFormData({
      title: '',
      content: '',
      status: 'draft'
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingSection) {
      setSections(prev => prev.map(section =>
        section.id === editingSection.id
          ? {
              ...section,
              title: formData.title,
              content: formData.content,
              status: formData.status,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : section
      ));
      toast.success('Terms of service section updated successfully');
    } else {
      const newSection: TermsSection = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        status: formData.status,
        order: sections.length + 1,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setSections(prev => [...prev, newSection]);
      toast.success('Terms of service section added successfully');
    }

    setIsEditing(false);
    setEditingSection(null);
  };

  const handleDelete = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
    toast.success('Terms of service section deleted successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingSection(null);
    setFormData({ title: '', content: '', status: 'draft' });
  };

  // Analytics
  const totalSections = sections.length;
  const activeSections = sections.filter(s => s.status === 'active').length;
  const draftSections = sections.filter(s => s.status === 'draft').length;

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSections}</div>
            <p className="text-xs text-muted-foreground">
              Terms of service sections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sections</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSections}</div>
            <p className="text-xs text-muted-foreground">
              Published sections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Sections</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftSections}</div>
            <p className="text-xs text-muted-foreground">
              Pending review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Terms of Service Management</CardTitle>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Edit Form */}
          {isEditing && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingSection ? 'Edit Section' : 'Add New Section'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter section title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'draft' }))}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter section content"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sections List */}
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <Card key={section.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{section.title}</h3>
                        <Badge variant={section.status === 'active' ? 'default' : 'secondary'}>
                          {section.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{section.content}</p>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {section.lastUpdated}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(section)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(section.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSections.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No terms of service sections found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
