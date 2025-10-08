'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  Building2,
  MapPin,
  Phone,
  Globe,
  Clock,
  Upload,
  Plus,
  X,
  Check,
  Info,
  Accessibility,
  Heart,
  Brain,
  Users,
  Camera,
  AlertCircle
} from 'lucide-react'

const businessCategories = [
  'Restaurant', 'Café', 'Bar', 'Park', 'Gym', 'Library', 
  'Shopping', 'Healthcare', 'Entertainment', 'Education', 'Other'
]

const accessibilityFeatures = [
  { id: 'wheelchair-accessible', label: 'Wheelchair Accessible', icon: Accessibility },
  { id: 'elevator', label: 'Elevator Available', icon: Accessibility },
  { id: 'accessible-parking', label: 'Accessible Parking', icon: Accessibility },
  { id: 'accessible-restroom', label: 'Accessible Restroom', icon: Accessibility },
  { id: 'braille-signage', label: 'Braille Signage', icon: Accessibility },
  { id: 'audio-assistance', label: 'Audio Assistance', icon: Users },
  { id: 'sign-language', label: 'Sign Language Support', icon: Users }
]

const identityFeatures = [
  { id: 'lgbtq-friendly', label: 'LGBTQ+ Friendly', icon: Heart },
  { id: 'gender-neutral-restrooms', label: 'Gender-Neutral Restrooms', icon: Users },
  { id: 'religious-inclusive', label: 'Religious Inclusive', icon: Heart },
  { id: 'cultural-diverse', label: 'Culturally Diverse', icon: Users },
  { id: 'family-friendly', label: 'Family Friendly', icon: Heart }
]

const neurodiversityFeatures = [
  { id: 'autism-friendly', label: 'Autism Friendly', icon: Brain },
  { id: 'quiet-hours', label: 'Quiet Hours Available', icon: Brain },
  { id: 'sensory-friendly', label: 'Sensory Friendly', icon: Brain },
  { id: 'flexible-seating', label: 'Flexible Seating', icon: Users },
  { id: 'low-lighting-option', label: 'Low Lighting Options', icon: Brain }
]

export default function AddBusinessPage() {
  const [step, setStep] = useState(1)
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
    
    // Hours
    hours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    
    // Features
    accessibilityFeatures: [] as string[],
    identityFeatures: [] as string[],
    neurodiversityFeatures: [] as string[],
    
    // Additional
    photos: [] as File[],
    policies: '',
    accommodations: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleFeatureToggle = (category: 'accessibilityFeatures' | 'identityFeatures' | 'neurodiversityFeatures', featureId: string) => {
    const features = formData[category]
    const newFeatures = features.includes(featureId)
      ? features.filter(f => f !== featureId)
      : [...features, featureId]
    setFormData({ ...formData, [category]: newFeatures })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] })
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos })
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.businessName) newErrors.businessName = 'Business name is required'
      if (!formData.category) newErrors.category = 'Category is required'
      if (!formData.description) newErrors.description = 'Description is required'
    }

    if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required'
      if (!formData.city) newErrors.city = 'City is required'
      if (!formData.state) newErrors.state = 'State is required'
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      console.log('Form submitted:', formData)
      // Handle submission - send to API
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Add Your Business</h1>
          <p className="text-xl text-primary-100">
            Join our community and help make your space more discoverable to everyone
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Basic Info' },
              { num: 2, label: 'Location' },
              { num: 3, label: 'Hours' },
              { num: 4, label: 'Features' },
              { num: 5, label: 'Photos & Review' }
            ].map((item, index) => (
              <div key={item.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= item.num
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > item.num ? <Check className="h-5 w-5" /> : item.num}
                  </div>
                  <span className="text-xs mt-2 text-gray-600 hidden sm:block">{item.label}</span>
                </div>
                {index < 4 && (
                  <div
                    className={`w-12 sm:w-24 h-1 mx-2 transition-colors ${
                      step > item.num ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                <p className="text-gray-600">Tell us about your business</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.businessName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Rainbow Café"
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {businessCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe what makes your space welcoming and inclusive..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Pro Tip:</p>
                  <p>Highlight what makes your space inclusive and welcoming to diverse communities. Mention specific accommodations and policies.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Contact</h2>
                <p className="text-gray-600">Where can people find you?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="12345"
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="contact@yourbus iness.com"
                />
              </div>
            </div>
          )}

          {/* Step 3: Hours */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Hours</h2>
                <p className="text-gray-600">When are you open?</p>
              </div>

              <div className="space-y-4">
                {Object.entries(formData.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-24">
                      <span className="font-medium text-gray-900 capitalize">{day}</span>
                    </div>
                    {hours.closed ? (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-gray-500">Closed</span>
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            hours: {
                              ...formData.hours,
                              [day]: { ...hours, closed: false }
                            }
                          })}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Set Hours
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center space-x-4">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => setFormData({
                            ...formData,
                            hours: {
                              ...formData.hours,
                              [day]: { ...hours, open: e.target.value }
                            }
                          })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => setFormData({
                            ...formData,
                            hours: {
                              ...formData.hours,
                              [day]: { ...hours, close: e.target.value }
                            }
                          })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            hours: {
                              ...formData.hours,
                              [day]: { ...hours, closed: true, open: '', close: '' }
                            }
                          })}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Mark Closed
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Features */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Inclusive Features</h2>
                <p className="text-gray-600">Select all features that apply to your business</p>
              </div>

              {/* Accessibility Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Accessibility className="h-5 w-5 text-blue-600" />
                  <span>Accessibility</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {accessibilityFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.accessibilityFeatures.includes(feature.id)
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.accessibilityFeatures.includes(feature.id)}
                        onChange={() => handleFeatureToggle('accessibilityFeatures', feature.id)}
                        className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <feature.icon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Identity Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span>Identity & Community</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {identityFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.identityFeatures.includes(feature.id)
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.identityFeatures.includes(feature.id)}
                        onChange={() => handleFeatureToggle('identityFeatures', feature.id)}
                        className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <feature.icon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Neurodiversity Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>Neurodiversity Support</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {neurodiversityFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.neurodiversityFeatures.includes(feature.id)
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.neurodiversityFeatures.includes(feature.id)}
                        onChange={() => handleFeatureToggle('neurodiversityFeatures', feature.id)}
                        className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <feature.icon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inclusive Policies
                </label>
                <textarea
                  name="policies"
                  value={formData.policies}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe your inclusive policies and commitments..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Accommodations
                </label>
                <textarea
                  name="accommodations"
                  value={formData.accommodations}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="List any special accommodations you offer..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Photos & Review */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos & Final Review</h2>
                <p className="text-gray-600">Add photos to showcase your space</p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload photos</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Review Your Listing</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Name:</span>
                    <span className="font-medium text-gray-900">{formData.businessName || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">{formData.category || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">{formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features Selected:</span>
                    <span className="font-medium text-gray-900">
                      {formData.accessibilityFeatures.length + formData.identityFeatures.length + formData.neurodiversityFeatures.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photos:</span>
                    <span className="font-medium text-gray-900">{formData.photos.length}</span>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Before you submit:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>All information provided is accurate</li>
                    <li>Photos are recent and representative</li>
                    <li>You have authority to represent this business</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
            <div className={step === 1 ? 'ml-auto' : ''}>
              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors font-medium flex items-center space-x-2"
                >
                  <Check className="h-5 w-5" />
                  <span>Submit Listing</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
