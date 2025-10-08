'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import RadioGroup from '@/components/ui/Radio';
import Slider from '@/components/ui/Slider';
import Avatar from '@/components/ui/Avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import Alert from '@/components/ui/Alert';
import ImageUpload from '@/components/ui/ImageUpload';
import { DatePicker } from '@/components/ui/Calendar';
import { PageTransition, FadeIn, SlideIn } from '@/components/animations/PageTransitions';
import {
  User,
  Bell,
  Shield,
  Globe,
  Eye,
  Lock,
  Smartphone,
  Mail,
  Heart,
  Accessibility,
  Save,
  CheckCircle,
} from 'lucide-react';

export default function SettingsEnhanced() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Profile Settings
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [bio, setBio] = useState('Community advocate passionate about creating inclusive spaces.');
  const [location, setLocation] = useState('New York, NY');
  const [birthdate, setBirthdate] = useState<Date>();
  const [profileImages, setProfileImages] = useState<File[]>([]);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showEmail, setShowEmail] = useState(false);
  const [showLocation, setShowLocation] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reviewNotifications, setReviewNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(false);

  // Accessibility Settings
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  // Identity & Preferences
  const [identities, setIdentities] = useState({
    lgbtq: true,
    wheelchair: false,
    autism: false,
    deaf: false,
  });

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
    { value: 'friends', label: 'Friends Only', description: 'Only your friends can see' },
    { value: 'private', label: 'Private', description: 'Only you can see your profile' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <FadeIn>
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-xl text-white/90">Manage your account and preferences</p>
            </div>
          </div>
        </FadeIn>

        {/* Success Alert */}
        {showSuccess && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <Alert variant="success" title="Changes saved!" onClose={() => setShowSuccess(false)}>
              Your settings have been updated successfully.
            </Alert>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <SlideIn direction="left">
              <Card className="lg:sticky lg:top-24">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {[
                      { icon: User, label: 'Profile', id: 'profile' },
                      { icon: Shield, label: 'Privacy', id: 'privacy' },
                      { icon: Bell, label: 'Notifications', id: 'notifications' },
                      { icon: Accessibility, label: 'Accessibility', id: 'accessibility' },
                      { icon: Heart, label: 'Identity', id: 'identity' },
                      { icon: Lock, label: 'Security', id: 'security' },
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Settings */}
              <SlideIn direction="right" id="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <Avatar fallback={name} size="xl" className="w-24 h-24" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Profile Picture</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Upload a new avatar or change your current one
                        </p>
                        <Button variant="outline" size="sm">
                          Change Picture
                        </Button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                      <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail />}
                      />
                    </div>

                    <Input
                      label="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      icon={<Globe />}
                    />

                    <DatePicker
                      label="Birth Date"
                      value={birthdate}
                      onChange={setBirthdate}
                      placeholder="Select your birthdate"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <Select
                      label="Language"
                      options={languageOptions}
                      placeholder="Select language"
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button variant="outline">Cancel</Button>
                      <Button icon={<Save />} onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Privacy Settings */}
              <SlideIn direction="right" delay={0.1} id="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      name="privacy"
                      label="Profile Visibility"
                      options={privacyOptions}
                      value={profileVisibility}
                      onChange={setProfileVisibility}
                    />

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900">What others can see</h4>
                      <Checkbox
                        checked={showEmail}
                        onChange={setShowEmail}
                        label="Show email address"
                        description="Let others see your email on your profile"
                      />
                      <Checkbox
                        checked={showLocation}
                        onChange={setShowLocation}
                        label="Show location"
                        description="Display your city and state"
                      />
                      <Checkbox
                        checked={allowMessages}
                        onChange={setAllowMessages}
                        label="Allow direct messages"
                        description="Let community members send you messages"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button icon={<Save />} onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Notification Settings */}
              <SlideIn direction="right" delay={0.2} id="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">General</h4>
                      <Checkbox
                        checked={emailNotifications}
                        onChange={setEmailNotifications}
                        label="Email notifications"
                        description="Receive notifications via email"
                      />
                      <Checkbox
                        checked={pushNotifications}
                        onChange={setPushNotifications}
                        label="Push notifications"
                        description="Receive push notifications on your device"
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900">Activity</h4>
                      <Checkbox
                        checked={reviewNotifications}
                        onChange={setReviewNotifications}
                        label="New reviews"
                        description="When someone reviews a place you saved"
                      />
                      <Checkbox
                        checked={commentNotifications}
                        onChange={setCommentNotifications}
                        label="Comments"
                        description="When someone comments on your posts"
                      />
                      <Checkbox
                        checked={eventNotifications}
                        onChange={setEventNotifications}
                        label="Events"
                        description="Updates about community events"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button icon={<Save />} onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Accessibility Settings */}
              <SlideIn direction="right" delay={0.3} id="accessibility">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Accessibility className="w-5 h-5" />
                      Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Slider
                      value={fontSize}
                      onChange={setFontSize}
                      min={12}
                      max={24}
                      label="Font Size"
                      showValue
                      formatValue={(v) => `${v}px`}
                    />

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <Checkbox
                        checked={highContrast}
                        onChange={setHighContrast}
                        label="High contrast mode"
                        description="Increase contrast for better visibility"
                      />
                      <Checkbox
                        checked={reduceMotion}
                        onChange={setReduceMotion}
                        label="Reduce motion"
                        description="Minimize animations and transitions"
                      />
                      <Checkbox
                        checked={screenReader}
                        onChange={setScreenReader}
                        label="Screen reader optimization"
                        description="Enhanced support for screen readers"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button icon={<Save />} onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Identity Preferences */}
              <SlideIn direction="right" delay={0.4} id="identity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Identity & Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-gray-600">
                      Help us personalize your experience by sharing your identity and accessibility needs.
                    </p>

                    <div className="space-y-4">
                      <Checkbox
                        checked={identities.lgbtq}
                        onChange={(checked) =>
                          setIdentities({ ...identities, lgbtq: checked })
                        }
                        label="LGBTQ+"
                        description="Show me LGBTQ+ friendly spaces"
                      />
                      <Checkbox
                        checked={identities.wheelchair}
                        onChange={(checked) =>
                          setIdentities({ ...identities, wheelchair: checked })
                        }
                        label="Wheelchair user"
                        description="Prioritize wheelchair accessible locations"
                      />
                      <Checkbox
                        checked={identities.autism}
                        onChange={(checked) =>
                          setIdentities({ ...identities, autism: checked })
                        }
                        label="Autism spectrum"
                        description="Show sensory-friendly and quiet spaces"
                      />
                      <Checkbox
                        checked={identities.deaf}
                        onChange={(checked) =>
                          setIdentities({ ...identities, deaf: checked })
                        }
                        label="Deaf or hard of hearing"
                        description="Highlight places with sign language support"
                      />
                    </div>

                    <Alert variant="info">
                      Your identity preferences are private and used only to personalize your
                      experience. They will not be shared without your permission.
                    </Alert>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button icon={<Save />} onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Security Settings */}
              <SlideIn direction="right" delay={0.5} id="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <Input
                          label="Current Password"
                          type="password"
                          placeholder="Enter current password"
                          icon={<Lock />}
                        />
                        <Input
                          label="New Password"
                          type="password"
                          placeholder="Enter new password"
                          icon={<Lock />}
                        />
                        <Input
                          label="Confirm Password"
                          type="password"
                          placeholder="Confirm new password"
                          icon={<Lock />}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <Smartphone className="w-6 h-6 text-purple-600 mt-1" />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 mb-1">
                            Two-factor authentication is disabled
                          </h5>
                          <p className="text-sm text-gray-600 mb-3">
                            Add an extra layer of security to your account
                          </p>
                          <Button size="sm">Enable 2FA</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button icon={<Save />} onClick={handleSave}>
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
