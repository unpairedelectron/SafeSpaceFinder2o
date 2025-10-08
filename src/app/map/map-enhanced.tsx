'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Filter, 
  Navigation, 
  List,
  Heart,
  Star,
  Shield,
  X,
  Search,
  Layers,
  Maximize2,
  Minimize2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card, { CardContent } from '@/components/ui/Card';
import Dropdown from '@/components/ui/Dropdown';
import Modal, { ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { PageTransition, FadeIn, SlideIn } from '@/components/animations/PageTransitions';
import Checkbox from '@/components/ui/Checkbox';

interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  safetyScore: number;
  features: {
    accessibility?: string[];
    identity?: string[];
    neurodiversity?: string[];
  };
  photos?: string[];
  rating: number;
  reviewCount: number;
  distance?: string;
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Rainbow Café',
    category: 'Restaurant',
    address: '123 Pride Street, San Francisco, CA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    safetyScore: 95,
    features: {
      accessibility: ['Wheelchair Accessible', 'Accessible Restroom'],
      identity: ['LGBTQ+ Friendly', 'Gender-Neutral Restrooms'],
      neurodiversity: ['Quiet Hours', 'Sensory Friendly']
    },
    photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24'],
    rating: 4.8,
    reviewCount: 124,
    distance: '0.5 km'
  },
  {
    id: '2',
    name: 'Inclusive Gym',
    category: 'Gym',
    address: '456 Unity Avenue, San Francisco, CA',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    safetyScore: 92,
    features: {
      accessibility: ['Elevator', 'Accessible Equipment'],
      identity: ['Body Positive', 'All Genders Welcome']
    },
    photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48'],
    rating: 4.7,
    reviewCount: 89,
    distance: '1.2 km'
  },
  {
    id: '3',
    name: 'Safe Space Library',
    category: 'Library',
    address: '789 Knowledge Lane, San Francisco, CA',
    coordinates: { lat: 37.7649, lng: -122.4294 },
    safetyScore: 98,
    features: {
      accessibility: ['Wheelchair Accessible', 'Braille Signage', 'Audio Books'],
      identity: ['Diverse Collection', 'Safe Space'],
      neurodiversity: ['Quiet Zones', 'Sensory Room']
    },
    photos: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da'],
    rating: 4.9,
    reviewCount: 156,
    distance: '0.8 km'
  }
];

const categories = ['All', 'Restaurant', 'Café', 'Bar', 'Park', 'Gym', 'Library', 'Shopping', 'Healthcare'];

export default function MapEnhanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showList, setShowList] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState<Set<string>>(new Set());
  
  // Filter states
  const [filters, setFilters] = useState({
    minSafetyScore: 0,
    accessibility: [] as string[],
    identity: [] as string[],
    neurodiversity: [] as string[]
  });

  const filteredBusinesses = mockBusinesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    const matchesSafetyScore = business.safetyScore >= filters.minSafetyScore;
    
    return matchesSearch && matchesCategory && matchesSafetyScore;
  });

  const toggleSave = (businessId: string) => {
    setSavedBusinesses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(businessId)) {
        newSet.delete(businessId);
      } else {
        newSet.add(businessId);
      }
      return newSet;
    });
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <PageTransition>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header with Search */}
        <div className="bg-white border-b border-gray-200 p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for safe spaces..."
                results={[]}
                trendingSearches={['LGBTQ+ Friendly Cafés', 'Wheelchair Accessible Parks', 'Autism Friendly Restaurants']}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="w-5 h-5" />
              {(filters.accessibility.length > 0 || filters.identity.length > 0 || filters.neurodiversity.length > 0) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-xs text-white flex items-center justify-center">
                  {filters.accessibility.length + filters.identity.length + filters.neurodiversity.length}
                </span>
              )}
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Map Area */}
          <div className="flex-1 relative bg-gray-200">
            {/* Placeholder Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 font-medium">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">
                    Map will be displayed here when API is connected
                  </p>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white shadow-lg"
                onClick={() => setShowList(!showList)}
              >
                <List className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white shadow-lg"
              >
                <Navigation className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white shadow-lg"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>
            </div>

            {/* Results Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-medium">
                {filteredBusinesses.length} places found
              </div>
            </div>
          </div>

          {/* Business List Sidebar */}
          <AnimatePresence>
            {showList && (
              <motion.div
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full md:w-96 bg-white border-l border-gray-200 overflow-y-auto"
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Places ({filteredBusinesses.length})
                  </h2>
                  <button
                    onClick={() => setShowList(false)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {filteredBusinesses.map((business, index) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={business.photos?.[0] || 'https://via.placeholder.com/150'}
                            alt={business.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {business.name}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSave(business.id);
                              }}
                              className="flex-shrink-0 text-gray-400 hover:text-pink-600 transition-colors"
                            >
                              <Heart 
                                className={cn(
                                  'w-5 h-5',
                                  savedBusinesses.has(business.id) && 'fill-pink-600 text-pink-600'
                                )}
                              />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Badge variant="outline" size="sm">
                              {business.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {business.rating}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>{business.distance}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className={cn(
                              'w-2 h-2 rounded-full',
                              getSafetyScoreColor(business.safetyScore)
                            )} />
                            <span className="text-sm text-gray-600">
                              Safety Score: {business.safetyScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filters Modal */}
        <Modal isOpen={showFilters} onClose={() => setShowFilters(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Filters</ModalTitle>
            </ModalHeader>

            <div className="space-y-6 p-6">
              {/* Safety Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Safety Score: {filters.minSafetyScore}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minSafetyScore}
                  onChange={(e) => setFilters({ ...filters, minSafetyScore: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Accessibility */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Accessibility</h3>
                <div className="space-y-2">
                  {['Wheelchair Accessible', 'Elevator', 'Accessible Restroom', 'Braille Signage'].map((feature) => (
                    <Checkbox
                      key={feature}
                      label={feature}
                      checked={filters.accessibility.includes(feature)}
                      onChange={(checked) => {
                        setFilters({
                          ...filters,
                          accessibility: checked
                            ? [...filters.accessibility, feature]
                            : filters.accessibility.filter((f) => f !== feature)
                        });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Identity */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Identity</h3>
                <div className="space-y-2">
                  {['LGBTQ+ Friendly', 'Gender-Neutral Restrooms', 'Religious Inclusive'].map((feature) => (
                    <Checkbox
                      key={feature}
                      label={feature}
                      checked={filters.identity.includes(feature)}
                      onChange={(checked) => {
                        setFilters({
                          ...filters,
                          identity: checked
                            ? [...filters.identity, feature]
                            : filters.identity.filter((f) => f !== feature)
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 p-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFilters({
                    minSafetyScore: 0,
                    accessibility: [],
                    identity: [],
                    neurodiversity: []
                  });
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </ModalContent>
        </Modal>

        {/* Business Detail Modal */}
        <Modal 
          isOpen={!!selectedBusiness} 
          onClose={() => setSelectedBusiness(null)}
        >
          {selectedBusiness && (
            <ModalContent className="max-w-2xl">
              <ModalHeader>
                <ModalTitle>{selectedBusiness.name}</ModalTitle>
              </ModalHeader>

              <div className="p-6 space-y-4">
                <img
                  src={selectedBusiness.photos?.[0] || 'https://via.placeholder.com/600x300'}
                  alt={selectedBusiness.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="flex items-center gap-4">
                  <Badge variant="primary">{selectedBusiness.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedBusiness.rating}</span>
                    <span className="text-gray-600">({selectedBusiness.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className={cn('w-5 h-5', getSafetyScoreColor(selectedBusiness.safetyScore).replace('bg-', 'text-'))} />
                  <span className="font-medium">Safety Score: {selectedBusiness.safetyScore}</span>
                </div>

                <p className="text-gray-600">{selectedBusiness.address}</p>

                {/* Features */}
                <div className="space-y-3">
                  {Object.entries(selectedBusiness.features).map(([category, features]) => (
                    features && features.length > 0 && (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {features.map((feature) => (
                            <Badge key={feature} variant="outline" size="sm">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      window.open(`https://maps.google.com/?q=${selectedBusiness.coordinates.lat},${selectedBusiness.coordinates.lng}`, '_blank');
                    }}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleSave(selectedBusiness.id)}
                  >
                    <Heart className={cn(
                      'w-4 h-4',
                      savedBusinesses.has(selectedBusiness.id) && 'fill-pink-600 text-pink-600'
                    )} />
                  </Button>
                </div>
              </div>
            </ModalContent>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
}
