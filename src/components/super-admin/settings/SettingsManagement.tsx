
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
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Settings,
  Globe,
  Mail,
  CreditCard,
  Shield,
  Palette,
  Database,
  Bell,
  Upload,
  Save,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Travel Explorer',
    siteDescription: 'Your ultimate travel companion for extraordinary experiences',
    siteUrl: 'https://travelexplorer.com',
    contactEmail: 'info@travelexplorer.com',
    supportEmail: 'support@travelexplorer.com',
    phone: '+1 (555) 123-4567',
    
    // Business Settings
    currency: 'USD',
    timezone: 'UTC-5',
    language: 'en',
    taxRate: '8.5',
    commissionRate: '10',
    
    // Email Settings
    emailProvider: 'smtp',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    emailFromName: 'Travel Explorer',
    emailFromAddress: 'noreply@travelexplorer.com',
    
    // Payment Settings
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalClientSecret: '',
    enableStripe: true,
    enablePaypal: true,
    
    // Security Settings
    enableTwoFactor: false,
    sessionTimeout: '30',
    passwordMinLength: '8',
    requireEmailVerification: true,
    enableCaptcha: true,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    bookingConfirmations: true,
    paymentAlerts: true,
    
    // Appearance Settings
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    fontFamily: 'Inter',
    logoUrl: '',
    faviconUrl: '',
    
    // SEO Settings
    metaTitle: 'Travel Explorer - Extraordinary Travel Experiences',
    metaDescription: 'Discover amazing travel destinations and book unique experiences around the world.',
    metaKeywords: 'travel, destinations, experiences, booking, adventure',
    googleAnalyticsId: '',
    googleTagManagerId: '',
    
    // Social Media
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
    // Here you would typically save to your backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Website Settings</h2>
          <p className="text-muted-foreground">Configure your website settings and preferences</p>
        </div>
        <Button onClick={() => handleSave('all')}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            SEO & Social
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>Basic information about your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      value={settings.siteUrl}
                      onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How customers can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
                <CardDescription>Configure business-related settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                        <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                        <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                        <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      value={settings.taxRate}
                      onChange={(e) => handleSettingChange('taxRate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      value={settings.commissionRate}
                      onChange={(e) => handleSettingChange('commissionRate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email settings for notifications and communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailFromName">From Name</Label>
                  <Input
                    id="emailFromName"
                    value={settings.emailFromName}
                    onChange={(e) => handleSettingChange('emailFromName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFromAddress">From Address</Label>
                  <Input
                    id="emailFromAddress"
                    type="email"
                    value={settings.emailFromAddress}
                    onChange={(e) => handleSettingChange('emailFromAddress', e.target.value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-semibold">SMTP Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={settings.smtpPort}
                      onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Providers</CardTitle>
                <CardDescription>Configure payment processing options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Stripe</h4>
                      <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                    </div>
                    <Switch
                      checked={settings.enableStripe}
                      onCheckedChange={(checked) => handleSettingChange('enableStripe', checked)}
                    />
                  </div>
                  {settings.enableStripe && (
                    <div className="grid grid-cols-2 gap-4 ml-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                        <Input
                          id="stripePublishableKey"
                          value={settings.stripePublishableKey}
                          onChange={(e) => handleSettingChange('stripePublishableKey', e.target.value)}
                          placeholder="pk_test_..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripeSecretKey">Secret Key</Label>
                        <Input
                          id="stripeSecretKey"
                          type="password"
                          value={settings.stripeSecretKey}
                          onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
                          placeholder="sk_test_..."
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">PayPal</h4>
                      <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                    </div>
                    <Switch
                      checked={settings.enablePaypal}
                      onCheckedChange={(checked) => handleSettingChange('enablePaypal', checked)}
                    />
                  </div>
                  {settings.enablePaypal && (
                    <div className="grid grid-cols-2 gap-4 ml-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypalClientId">Client ID</Label>
                        <Input
                          id="paypalClientId"
                          value={settings.paypalClientId}
                          onChange={(e) => handleSettingChange('paypalClientId', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypalClientSecret">Client Secret</Label>
                        <Input
                          id="paypalClientSecret"
                          type="password"
                          value={settings.paypalClientSecret}
                          onChange={(e) => handleSettingChange('paypalClientSecret', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Configure security and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => handleSettingChange('enableTwoFactor', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">CAPTCHA</h4>
                    <p className="text-sm text-muted-foreground">Enable CAPTCHA for forms</p>
                  </div>
                  <Switch
                    checked={settings.enableCaptcha}
                    onCheckedChange={(checked) => handleSettingChange('enableCaptcha', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Min Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange('passwordMinLength', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure notification settings for different events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'emailNotifications', title: 'Email Notifications', description: 'Send notifications via email' },
                { key: 'smsNotifications', title: 'SMS Notifications', description: 'Send notifications via SMS' },
                { key: 'pushNotifications', title: 'Push Notifications', description: 'Send browser push notifications' },
                { key: 'marketingEmails', title: 'Marketing Emails', description: 'Send promotional emails to users' },
                { key: 'bookingConfirmations', title: 'Booking Confirmations', description: 'Send booking confirmation emails' },
                { key: 'paymentAlerts', title: 'Payment Alerts', description: 'Send payment-related notifications' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
                <CardDescription>Customize your website's color scheme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        value={settings.primaryColor}
                        onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                      />
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                        className="w-12 h-10 border border-input rounded"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        value={settings.secondaryColor}
                        onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                      />
                      <input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                        className="w-12 h-10 border border-input rounded"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Assets</CardTitle>
                <CardDescription>Upload your logo and favicon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload logo</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload favicon</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SEO & Social Settings */}
        <TabsContent value="seo">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Configure search engine optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={settings.metaTitle}
                    onChange={(e) => handleSettingChange('metaTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.metaDescription}
                    onChange={(e) => handleSettingChange('metaDescription', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input
                    id="metaKeywords"
                    value={settings.metaKeywords}
                    onChange={(e) => handleSettingChange('metaKeywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => handleSettingChange('googleAnalyticsId', e.target.value)}
                      placeholder="GA-XXXXXXXXX-X"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                    <Input
                      id="googleTagManagerId"
                      value={settings.googleTagManagerId}
                      onChange={(e) => handleSettingChange('googleTagManagerId', e.target.value)}
                      placeholder="GTM-XXXXXXX"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>Configure social media links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook URL</Label>
                    <Input
                      id="facebookUrl"
                      value={settings.facebookUrl}
                      onChange={(e) => handleSettingChange('facebookUrl', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterUrl">Twitter URL</Label>
                    <Input
                      id="twitterUrl"
                      value={settings.twitterUrl}
                      onChange={(e) => handleSettingChange('twitterUrl', e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagramUrl">Instagram URL</Label>
                    <Input
                      id="instagramUrl"
                      value={settings.instagramUrl}
                      onChange={(e) => handleSettingChange('instagramUrl', e.target.value)}
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      value={settings.linkedinUrl}
                      onChange={(e) => handleSettingChange('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube URL</Label>
                  <Input
                    id="youtubeUrl"
                    value={settings.youtubeUrl}
                    onChange={(e) => handleSettingChange('youtubeUrl', e.target.value)}
                    placeholder="https://youtube.com/channel/yourchannel"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
