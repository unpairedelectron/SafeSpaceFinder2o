'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import BusinessCard from '@/components/BusinessCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  MapPin, 
  Star, 
  Shield, 
  Accessibility, 
  Heart, 
  Brain, 
  Users,
  Search,
  TrendingUp,
  CheckCircle,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react'

// Mock data for demonstration
const mockBusinesses = [
  {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    rating: 4.8,
    safetyScore: 95,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space'],
    image: '/api/placeholder/400/300',
    description: 'A welcoming space for everyone with excellent coffee and inclusive atmosphere.',
    verifiedReviews: 24,
    distance: '0.2 miles'
  },
  {
    id: '2',
    name: 'Accessible Eats',
    type: 'Restaurant',
    address: '456 Oak Ave, Midtown',
    rating: 4.6,
    safetyScore: 92,
    features: ['wheelchair-accessible', 'autism-friendly', 'sign-language'],
    image: '/api/placeholder/400/300',
    description: 'Family restaurant with full accessibility and sensory-friendly dining options.',
    verifiedReviews: 31,
    distance: '0.5 miles'
  },
  {
    id: '3',
    name: 'Peaceful Gardens',
    type: 'Park',
    address: '789 Green Blvd, Westside',
    rating: 4.9,
    safetyScore: 88,
    features: ['quiet-space', 'wheelchair-accessible', 'meditation-area'],
    image: '/api/placeholder/400/300',
    description: 'Tranquil park space perfect for meditation and quiet reflection.',
    verifiedReviews: 18,
    distance: '1.2 miles'
  }
]

const featureIcons = {
  'lgbtq-friendly': Heart,
  'wheelchair-accessible': Accessibility,
  'autism-friendly': Brain,
  'quiet-space': Shield,
  'sign-language': Users,
  'meditation-area': Shield
}

const features = [
  {
    icon: Shield,
    title: 'Safety Verified',
    description: 'Every space is reviewed by our community for safety and inclusivity.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Real reviews from people with shared experiences and needs.'
  },
  {
    icon: Accessibility,
    title: 'Accessibility First',
    description: 'Detailed accessibility information for every location.'
  },
  {
    icon: Heart,
    title: 'LGBTQ+ Friendly',
    description: 'Find welcoming spaces that celebrate diversity and inclusion.'
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => business.features.includes(filter))
    return matchesSearch && matchesFilters
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <Badge variant="gradient" size="lg" className="mb-6 inline-flex">
              <Sparkles className="w-4 h-4 mr-2" />
              Find Your Perfect Safe Space
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Discover Places That
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Welcome Everyone
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Search thousands of verified inclusive, accessible, and safe spaces in your community
            </p>
            
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <SearchBar 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search for restaurants, cafes, parks, or services..."
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                <Heart className="w-3 h-3 mr-1" />
                LGBTQ+ Friendly
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                <Accessibility className="w-3 h-3 mr-1" />
                Wheelchair Accessible
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                <Brain className="w-3 h-3 mr-1" />
                Autism Friendly
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                <Shield className="w-3 h-3 mr-1" />
                Safe Space
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group">
                Explore Map
                <MapPin className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                Add a Business
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-16 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '1,247', label: 'Verified Businesses', icon: CheckCircle, color: 'text-indigo-600' },
              { value: '4.8★', label: 'Average Safety Rating', icon: Star, color: 'text-yellow-500' },
              { value: '12K+', label: 'Community Reviews', icon: Users, color: 'text-purple-600' },
              { value: '89%', label: 'Feel Safer', icon: Shield, color: 'text-green-600' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Why Choose Safe Space Finder
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Community,<br/>Driven by Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're more than a directory—we're a movement to make the world more inclusive and accessible for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Badge variant="success" className="mb-3">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending Now
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Featured Safe Spaces
              </h2>
              <p className="text-lg text-gray-600">
                Highly-rated and verified by our community
              </p>
            </div>
            <Link href="/discover">
              <Button variant="outline" className="hidden sm:flex items-center group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBusinesses.map((business) => (
              <BusinessCard 
                key={business.id} 
                business={business}
                featureIcons={featureIcons}
              />
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/discover">
              <Button variant="outline" className="w-full">
                View All Safe Spaces
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Know a great safe space?
          </h2>
          <p className="text-xl mb-10 text-indigo-100">
            Help others discover welcoming places by adding them to our community directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="secondary" className="group">
              Add a Business
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
