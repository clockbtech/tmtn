import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    captcha: ''
  });
  const [captchaQuestion, setCaptchaQuestion] = useState({
    num1: Math.floor(Math.random() * 10) + 1,
    num2: Math.floor(Math.random() * 10) + 1
  });
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate CAPTCHA
    const expectedAnswer = captchaQuestion.num1 + captchaQuestion.num2;
    if (parseInt(formData.captcha) !== expectedAnswer) {
      toast({
        title: "CAPTCHA Error",
        description: "Please solve the math problem correctly.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours."
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      captcha: ''
    });

    // Generate new CAPTCHA
    setCaptchaQuestion({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1
    });
  };
  return <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="mt-1" placeholder="Enter your full name" />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" placeholder="Enter your email address" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="subject">Subject *</Label>
          <Select onValueChange={handleSelectChange} required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="booking">Booking Assistance</SelectItem>
              <SelectItem value="trekking">Trekking Information</SelectItem>
              <SelectItem value="accommodation">Accommodation</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="emergency">Emergency Support</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required className="mt-1 min-h-32" placeholder="Tell us how we can help you..." />
        </div>
        
        {/* Basic CAPTCHA */}
        <div>
          <Label htmlFor="captcha">Security Check *</Label>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-lg font-medium">
              {captchaQuestion.num1} + {captchaQuestion.num2} = ?
            </span>
            <Input id="captcha" name="captcha" type="number" value={formData.captcha} onChange={handleInputChange} required className="w-20" placeholder="Answer" />
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-tmtn-blue hover:bg-tmtn-blue/90">
          Send Message
        </Button>
      </form>
    </div>;
};
export default ContactForm;
