'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Slider from '@/components/ui/Slider';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@/components/ui/Dropdown';
import StarRating from '@/components/ui/StarRating';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { PageTransition, FadeIn, SlideIn, ScrollReveal } from '@/components/animations/PageTransitions';
import {
  Search,
  MapPin,
  Star,
  Shield,
  Heart,
  Accessibility,
  Brain,
  Users,
  Filter,
  SlidersHorizontal,
  Map,
  List,
  Bookmark,
  Phone,
  Globe,
  ChevronDown,
} from 'lucide-react';

const mockBusinesses = [
  {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    rating: 4.8,
    safetyScore: 95,
    features: ['LGBTQ+ Friendly', 'Wheelchair Accessible', 'Quiet Space'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    description: 'A welcoming space for everyone with excellent coffee.',
    verifiedReviews: 24,
    distance: 0.2,
    phone: '+1 (555) 123-4567',
    website: 'rainbowcafe.com',
  },
  {
    id: '2',
    name: 'Accessible Eats',
    type: 'Restaurant',
    address: '456 Oak Ave, Midtown',
    rating: 4.6,
    safetyScore: 92,
    features: ['Wheelchair Accessible', 'Autism Friendly', 'Sign Language'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    description: 'Family restaurant with full accessibility.',
    verifiedReviews: 31,
    distance: 0.5,
    phone: '+1 (555) 234-5678',
    website: 'accessibleeats.com',
  },
  {
    id: '3',
    name: 'Peaceful Gardens',
    type: 'Park',
    address: '789 Green Blvd, Westside',
    rating: 4.9,
    safetyScore: 88,
    features: ['Quiet Space', 'Wheelchair Accessible', 'Pet Friendly'],
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c',
    description: 'Tranquil park space perfect for meditation.',
    verifiedReviews: 18,
    distance: 1.2,
    phone: '+1 (555) 345-6789',
    website: 'peacefulgardens.com',
  },
  {
    id: '4',
    name: 'Unity Bookstore',
    type: 'Bookstore',
    address: '321 Reading St, Downtown',
    rating: 4.7,
    safetyScore: 90,
    features: ['LGBTQ+ Friendly', 'Wheelchair Accessible', 'Quiet Space'],
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
    description: 'Independent bookstore with diverse collection.',
    verifiedReviews: 42,
    distance: 0.8,
    phone: '+1 (555) 456-7890',
    website: 'unitybookstore.com',
  },
  {
    id: '5',
    name: 'Inclusive Fitness',
    type: 'Gym',
    address: '555 Wellness Way, Uptown',
    rating: 4.5,
    safetyScore: 87,
    features: ['Wheelchair Accessible', 'Gender Neutral Facilities', 'Trained Staff'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    description: 'Fitness center welcoming all bodies and abilities.',
    verifiedReviews: 28,
    distance: 1.5,
    phone: '+1 (555) 567-8901',
    website: 'inclusivefitness.com',
  },
  {
    id: '6',
    name: 'Safe Haven Clinic',
    type: 'Healthcare',
    address: '888 Care Circle, Medical District',
    rating: 4.9,
    safetyScore: 96,
    features: ['LGBTQ+ Friendly', 'Wheelchair Accessible', 'Multilingual Staff'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
    description: 'Inclusive healthcare with specialized services.',
    verifiedReviews: 56,
    distance: 2.1,
    phone: '+1 (555) 678-9012',
    website: 'safehavenclinic.com',
  },
];

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'coffee', label: 'Coffee Shop' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'park', label: 'Park' },
  { value: 'bookstore', label: 'Bookstore' },
  { value: 'gym', label: 'Gym' },
  { value: 'healthcare', label: 'Healthcare' },
];

const sortOptions = [
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating' },
  { value: 'safety', label: 'Safety Score' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export default function DiscoverEnhanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState(5);
  const [minRating, setMinRating] = useState(0);
  const [savedBusinesses, setSavedBusinesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter checkboxes
  const [filters, setFilters] = useState({
    lgbtqFriendly: false,
    wheelchairAccessible: false,
    quietSpace: false,
    autismFriendly: false,
    petFriendly: false,
    genderNeutral: false,
  });

  const toggleSaved = (id: string) => {
    setSavedBusinesses((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredBusinesses = mockBusinesses
    .filter((b) => {
      // Search filter
      if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Distance filter
      if (b.distance > distance) return false;
      // Rating filter
      if (b.rating < minRating) return false;
      // Feature filters
      if (filters.lgbtqFriendly && !b.features.some((f) => f.includes('LGBTQ'))) return false;
      if (filters.wheelchairAccessible && !b.features.some((f) => f.includes('Wheelchair')))
        return false;
      if (filters.quietSpace && !b.features.some((f) => f.includes('Quiet'))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'safety':
          return b.safetyScore - a.safetyScore;
        case 'reviews':
          return b.verifiedReviews - a.verifiedReviews;
        default:
          return a.distance - b.distance;
      }
    });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <FadeIn>
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Safe Spaces</h1>
                <p className="text-xl text-white/90">
                  Find inclusive, accessible, and welcoming places near you
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      icon={<Search />}
                      placeholder="Search for businesses, parks, restaurants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select
                      options={categories}
                      value={category}
                      onChange={setCategory}
                      placeholder="Category"
                    />
                  </div>
                  <Button icon={<Search />} size="lg" className="md:w-auto">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <SlideIn direction="left">
              <div className="lg:w-80">
                <Card className="sticky top-24">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilters({
                            lgbtqFriendly: false,
                            wheelchairAccessible: false,
                            quietSpace: false,
                            autismFriendly: false,
                            petFriendly: false,
                            genderNeutral: false,
                          });
                          setDistance(5);
                          setMinRating(0);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Distance Slider */}
                    <div>
                      <Slider
                        value={distance}
                        onChange={setDistance}
                        min={0}
                        max={25}
                        step={0.5}
                        label="Distance"
                        showValue
                        formatValue={(v) => `${v} miles`}
                      />
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Minimum Rating
                      </label>
                      <StarRating
                        rating={minRating}
                        onChange={setMinRating}
                        size="lg"
                        interactive
                      />
                    </div>

                    {/* Feature Filters */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
                      <div className="space-y-3">
                        <Checkbox
                          checked={filters.lgbtqFriendly}
                          onChange={(checked) =>
                            setFilters({ ...filters, lgbtqFriendly: checked })
                          }
                          label="LGBTQ+ Friendly"
                        />
                        <Checkbox
                          checked={filters.wheelchairAccessible}
                          onChange={(checked) =>
                            setFilters({ ...filters, wheelchairAccessible: checked })
                          }
                          label="Wheelchair Accessible"
                        />
                        <Checkbox
                          checked={filters.quietSpace}
                          onChange={(checked) =>
                            setFilters({ ...filters, quietSpace: checked })
                          }
                          label="Quiet Space"
                        />
                        <Checkbox
                          checked={filters.autismFriendly}
                          onChange={(checked) =>
                            setFilters({ ...filters, autismFriendly: checked })
                          }
                          label="Autism Friendly"
                        />
                        <Checkbox
                          checked={filters.petFriendly}
                          onChange={(checked) =>
                            setFilters({ ...filters, petFriendly: checked })
                          }
                          label="Pet Friendly"
                        />
                        <Checkbox
                          checked={filters.genderNeutral}
                          onChange={(checked) =>
                            setFilters({ ...filters, genderNeutral: checked })
                          }
                          label="Gender Neutral Facilities"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SlideIn>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <SlideIn direction="right">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {filteredBusinesses.length} Places Found
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Showing results within {distance} miles
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      className="w-40"
                    />
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${
                          viewMode === 'grid'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <SlidersHorizontal className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${
                          viewMode === 'list'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </SlideIn>

              {/* Results Grid/List */}
              {loading ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredBusinesses.map((business, index) => (
                    <ScrollReveal key={business.id}>
                      <Card className="hover:shadow-xl transition-all duration-300 group">
                        <div className="relative">
                          <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold opacity-20">
                              {business.name[0]}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleSaved(business.id)}
                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <Bookmark
                              className={`w-5 h-5 ${
                                savedBusinesses.includes(business.id)
                                  ? 'fill-purple-600 text-purple-600'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                          <div className="absolute bottom-3 left-3">
                            <Badge variant="success" icon={<Shield />}>
                              {business.safetyScore}% Safe
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                                {business.name}
                              </h3>
                              <p className="text-sm text-gray-600">{business.type}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <StarRating rating={business.rating} size="sm" />
                            <span className="text-sm text-gray-600">
                              ({business.verifiedReviews})
                            </span>
                          </div>

                          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                            {business.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {business.features.slice(0, 3).map((feature) => (
                              <Badge key={feature} variant="outline">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{business.address}</span>
                          </div>

                          <div className="flex items-center text-sm font-medium text-purple-600">
                            <span>{business.distance} miles away</span>
                          </div>
                        </CardContent>

                        <CardFooter className="bg-gray-50 p-4">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" icon={<Phone />} />
                              <Button variant="ghost" size="sm" icon={<Globe />} />
                              <Button variant="ghost" size="sm" icon={<Map />} />
                            </div>
                            <Button size="sm" href={`/business/${business.id}`}>
                              View Details
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && filteredBusinesses.length === 0 && (
                <Card className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        lgbtqFriendly: false,
                        wheelchairAccessible: false,
                        quietSpace: false,
                        autismFriendly: false,
                        petFriendly: false,
                        genderNeutral: false,
                      });
                    }}
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
