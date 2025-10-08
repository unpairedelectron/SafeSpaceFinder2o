'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Globe,
  Clock,
  Accessibility,
  Heart,
  Brain,
  Camera,
  FileText,
  Check
} from 'lucide-react';
import { PageTransition } from '@/components/animations/PageTransitions';
import { MultiStepForm } from '@/components/ui/Stepper';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import ImageUpload from '@/components/ui/ImageUpload';
import { cn } from '@/lib/utils';

const businessCategories = [
  'Restaurant',
  'Café',
  'Bar',
  'Park',
  'Gym',
  'Library',
  'Shopping',
  'Healthcare',
  'Entertainment',
  'Education',
  'Other',
];

const accessibilityFeatures = [
  'Wheelchair Accessible',
  'Elevator Available',
  'Accessible Parking',
  'Accessible Restroom',
  'Braille Signage',
  'Audio Assistance',
  'Sign Language Support',
];

const identityFeatures = [
  'LGBTQ+ Friendly',
  'Gender-Neutral Restrooms',
  'Religious Inclusive',
  'Culturally Diverse',
  'Family Friendly',
];

const neurodiversityFeatures = [
  'Autism Friendly',
  'Quiet Hours Available',
  'Sensory Friendly',
  'Flexible Seating',
  'Low Lighting Options',
];

export default function AddBusinessEnhanced() {
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: '',
    category: '',
    description: '',

    // Contact
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',

    // Features
    accessibilityFeatures: [] as string[],
    identityFeatures: [] as string[],
    neurodiversityFeatures: [] as string[],

    // Additional
    photos: [] as string[],
    policies: '',
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // TODO: Submit to API
    alert('Business listing submitted successfully!');
  };

  const steps = [
    {
      title: 'Basic Info',
      description: 'Business details',
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
          <p className="text-gray-600">
            Tell us about your business or the place you'd like to add to our community.
          </p>

          <Input
            label="Business Name *"
            placeholder="Enter business name"
            value={formData.businessName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            required
          />

          <Select
            label="Category *"
            value={formData.category}
            onChange={(value: string) => setFormData({ ...formData, category: value })}
            options={[
              { value: '', label: 'Select a category' },
              ...businessCategories.map((cat) => ({ value: cat, label: cat })),
            ]}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe what makes this space inclusive and welcoming..."
              rows={4}
              className={cn(
                'w-full px-4 py-3 border border-gray-300 rounded-lg',
                'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                'placeholder:text-gray-400 resize-none'
              )}
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Minimum 50 characters. Include details about accessibility, inclusivity, and what makes this space safe.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Location',
      description: 'Address & contact',
      icon: <MapPin className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Location & Contact</h2>
          <p className="text-gray-600">
            Help people find this space with accurate location and contact information.
          </p>

          <Input
            label="Street Address *"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City *"
              placeholder="City"
              value={formData.city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="State *"
              placeholder="State"
              value={formData.state}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>

          <Input
            label="ZIP Code *"
            placeholder="12345"
            value={formData.zipCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, zipCode: e.target.value })}
            required
          />

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                icon={<Phone className="w-5 h-5 text-gray-400" />}
              />

              <Input
                label="Email"
                type="email"
                placeholder="contact@business.com"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input
                label="Website"
                type="url"
                placeholder="https://business.com"
                value={formData.website}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, website: e.target.value })}
                icon={<Globe className="w-5 h-5 text-gray-400" />}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Features',
      description: 'Accessibility & inclusivity',
      icon: <Accessibility className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Inclusive Features</h2>
          <p className="text-gray-600">
            Select all features that apply to this space. This helps community members find places that meet their needs.
          </p>

          {/* Accessibility */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Accessibility className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
                <p className="text-sm text-gray-600">Physical accessibility features</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {accessibilityFeatures.map((feature) => (
                <Checkbox
                  key={feature}
                  label={feature}
                  checked={formData.accessibilityFeatures.includes(feature)}
                  onChange={(checked: boolean) => {
                    setFormData({
                      ...formData,
                      accessibilityFeatures: checked
                        ? [...formData.accessibilityFeatures, feature]
                        : formData.accessibilityFeatures.filter((f) => f !== feature),
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Identity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Identity Inclusivity</h3>
                <p className="text-sm text-gray-600">Inclusive and welcoming environment</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {identityFeatures.map((feature) => (
                <Checkbox
                  key={feature}
                  label={feature}
                  checked={formData.identityFeatures.includes(feature)}
                  onChange={(checked: boolean) => {
                    setFormData({
                      ...formData,
                      identityFeatures: checked
                        ? [...formData.identityFeatures, feature]
                        : formData.identityFeatures.filter((f) => f !== feature),
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Neurodiversity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Neurodiversity Support</h3>
                <p className="text-sm text-gray-600">Features for neurodiverse individuals</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {neurodiversityFeatures.map((feature) => (
                <Checkbox
                  key={feature}
                  label={feature}
                  checked={formData.neurodiversityFeatures.includes(feature)}
                  onChange={(checked: boolean) => {
                    setFormData({
                      ...formData,
                      neurodiversityFeatures: checked
                        ? [...formData.neurodiversityFeatures, feature]
                        : formData.neurodiversityFeatures.filter((f) => f !== feature),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Photos',
      description: 'Visual verification',
      icon: <Camera className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
          <p className="text-gray-600">
            Add photos to help verify accessibility features and give people a sense of the space.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <Camera className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Photo Guidelines</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Include photos of accessibility features (ramps, restrooms, etc.)</li>
                <li>Show the entrance and interior spaces</li>
                <li>Capture any inclusive signage or amenities</li>
                <li>Maximum 10 photos, each under 5MB</li>
              </ul>
            </div>
          </div>

          <ImageUpload
            maxFiles={10}
            maxSize={5 * 1024 * 1024} // 5MB
            accept="image/*"
            onChange={(files: File[]) => {
              const urls = files.map((file: File) => URL.createObjectURL(file));
              setFormData({ ...formData, photos: [...formData.photos, ...urls] });
            }}
          />

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setFormData({
                        ...formData,
                        photos: formData.photos.filter((_, i) => i !== index),
                      });
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Review',
      description: 'Final review',
      icon: <Check className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Review Your Listing</h2>
          <p className="text-gray-600">
            Please review all information before submitting. You can edit any section by going back.
          </p>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Basic Information
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Business Name:</dt>
                  <dd className="font-medium text-gray-900">{formData.businessName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="font-medium text-gray-900">{formData.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Description:</dt>
                  <dd className="text-gray-900">{formData.description}</dd>
                </div>
              </dl>
            </div>

            {/* Location */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Location & Contact
              </h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-600 mb-1">Address:</dt>
                  <dd className="text-gray-900">
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </dd>
                </div>
                {formData.phone && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Phone:</dt>
                    <dd className="font-medium text-gray-900">{formData.phone}</dd>
                  </div>
                )}
                {formData.website && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Website:</dt>
                    <dd className="font-medium text-gray-900">{formData.website}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Features */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-purple-600" />
                Inclusive Features
              </h3>
              <div className="space-y-3 text-sm">
                {formData.accessibilityFeatures.length > 0 && (
                  <div>
                    <dt className="text-gray-600 mb-2">Accessibility:</dt>
                    <dd className="flex flex-wrap gap-2">
                      {formData.accessibilityFeatures.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {formData.identityFeatures.length > 0 && (
                  <div>
                    <dt className="text-gray-600 mb-2">Identity Inclusivity:</dt>
                    <dd className="flex flex-wrap gap-2">
                      {formData.identityFeatures.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {formData.neurodiversityFeatures.length > 0 && (
                  <div>
                    <dt className="text-gray-600 mb-2">Neurodiversity Support:</dt>
                    <dd className="flex flex-wrap gap-2">
                      {formData.neurodiversityFeatures.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </div>
            </div>

            {/* Photos */}
            {formData.photos.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  Photos ({formData.photos.length})
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {formData.photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-900">
              <strong>Next Steps:</strong> After submission, our team will review your listing within 24-48 hours. You'll receive an email notification once it's approved and live on the platform.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Add a Safe Space
            </h1>
            <p className="text-lg text-gray-600">
              Help grow our community by adding an inclusive and accessible space
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <MultiStepForm steps={steps} onComplete={handleSubmit} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
