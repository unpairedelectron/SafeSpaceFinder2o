'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Progress from '@/components/ui/Progress';
import { Tabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import StarRating from '@/components/ui/StarRating';
import { PageTransition, FadeIn, SlideIn, ScrollReveal } from '@/components/animations/PageTransitions';
import {
  MapPin,
  Star,
  Shield,
  Phone,
  Globe,
  Clock,
  Heart,
  Share2,
  Bookmark,
  Camera,
  ThumbsUp,
  Accessibility,
  Brain,
  Users,
  Image as ImageIcon,
  MessageCircle,
  TrendingUp,
  Award,
  CheckCircle,
} from 'lucide-react';

export default function BusinessDetailEnhanced() {
  const [isSaved, setIsSaved] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);

  // Mock data
  const business = {
    id: '1',
    name: 'Rainbow Café',
    type: 'Coffee Shop',
    address: '123 Main St, Downtown',
    phone: '+1 (555) 123-4567',
    website: 'www.rainbowcafe.com',
    rating: 4.8,
    safetyScore: 95,
    features: ['lgbtq-friendly', 'wheelchair-accessible', 'quiet-space'],
    description: 'A welcoming space for everyone with excellent coffee and inclusive atmosphere. We pride ourselves on creating a safe, comfortable environment where all people can relax and enjoy quality beverages and food.',
    verifiedReviews: 24,
    distance: '0.2 miles',
    hours: {
      monday: '7:00 AM - 8:00 PM',
      tuesday: '7:00 AM - 8:00 PM',
      wednesday: '7:00 AM - 8:00 PM',
      thursday: '7:00 AM - 8:00 PM',
      friday: '7:00 AM - 10:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 6:00 PM',
    },
    certifications: ['Safe Space Certified', 'LGBTQ+ Verified', 'Accessibility Approved'],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
      'https://images.unsplash.com/photo-1501747315-124a0eaca060',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760',
    ],
  };

  const reviews = [
    {
      id: '1',
      userName: 'Alex Johnson',
      userAvatar: 'AJ',
      rating: 5,
      safetyScore: 95,
      comment:
        'Absolutely love this place! Staff are incredibly welcoming and the space is very accessible. Gender-neutral bathrooms are a huge plus.',
      date: '2 days ago',
      helpful: 12,
      verified: true,
      images: 2,
    },
    {
      id: '2',
      userName: 'Sam Rivera',
      userAvatar: 'SR',
      rating: 5,
      safetyScore: 100,
      comment:
        'Perfect quiet space for someone with sensory sensitivities. The staff understand and are very accommodating. Highly recommend!',
      date: '1 week ago',
      helpful: 8,
      verified: true,
      images: 0,
    },
    {
      id: '3',
      userName: 'Jordan Lee',
      userAvatar: 'JL',
      rating: 4,
      safetyScore: 90,
      comment:
        'Great coffee and very friendly atmosphere. Wheelchair access is excellent. Only minor issue was wait time during peak hours.',
      date: '2 weeks ago',
      helpful: 5,
      verified: true,
      images: 1,
    },
  ];

  const tabItems = [
    {
      label: 'Overview',
      value: 'overview',
      content: (
        <div className="space-y-6">
          <ScrollReveal>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Space</h3>
              <p className="text-gray-700 leading-relaxed">{business.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inclusive Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: Accessibility, label: 'Wheelchair Accessible', color: 'blue' },
                  { icon: Heart, label: 'LGBTQ+ Friendly', color: 'pink' },
                  { icon: Brain, label: 'Quiet Space Available', color: 'purple' },
                  { icon: Users, label: 'Gender-Neutral Facilities', color: 'green' },
                  { icon: Camera, label: 'Photo Verified', color: 'orange' },
                  { icon: Award, label: 'Trained Staff', color: 'yellow' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <feature.icon className={`h-5 w-5 text-${feature.color}-600`} />
                    <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      ),
    },
    {
      label: `Reviews (${business.verifiedReviews})`,
      value: 'reviews',
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">{business.rating}</span>
                <div>
                  <StarRating rating={business.rating} size="lg" />
                  <p className="text-sm text-gray-600">{business.verifiedReviews} verified reviews</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsReviewModalOpen(true)} icon={MessageCircle}>
              Write Review
            </Button>
          </div>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <ScrollReveal key={review.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Avatar fallback={review.userAvatar} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="success" icon={CheckCircle}>
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            <StarRating rating={review.rating} size="sm" />
                            <Badge variant="outline" icon={Shield}>
                              {review.safetyScore}% safe
                            </Badge>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      {review.images > 0 && (
                        <div className="flex items-center space-x-2 mb-3">
                          {[...Array(review.images)].map((_, i) => (
                            <div
                              key={i}
                              className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center"
                            >
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      )}
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Photos',
      value: 'photos',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {business.images.map((_, index) => (
            <ScrollReveal key={index}>
              <div className="aspect-square bg-gray-200 rounded-lg hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <FadeIn>
          <div className="relative h-96 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="success" icon={Shield} className="text-sm">
                    {business.safetyScore}% Safe
                  </Badge>
                  {business.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-sm bg-white/90">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{business.name}</h1>
                <p className="text-xl text-white/90">{business.type}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info Card */}
              <SlideIn direction="up">
                <Card>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-6 w-6 text-yellow-400 fill-current" />
                        <span className="text-2xl font-bold text-gray-900">{business.rating}</span>
                      </div>
                      <div className="text-gray-600">{business.verifiedReviews} verified reviews</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={isSaved ? 'primary' : 'outline'}
                        size="sm"
                        icon={Bookmark}
                        onClick={() => setIsSaved(!isSaved)}
                        className={isSaved ? 'fill-current' : ''}
                      />
                      <Button variant="outline" size="sm" icon={Share2} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-gray-900">{business.address}</p>
                        <p className="text-sm text-purple-600">{business.distance} away</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <a href={`tel:${business.phone}`} className="text-gray-900 hover:text-purple-600">
                        {business.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <a
                        href={`https://${business.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                </Card>
              </SlideIn>

              {/* Tabs */}
              <SlideIn direction="up" delay={0.1}>
                <Card>
                  <Tabs items={tabItems} defaultValue="overview" />
                </Card>
              </SlideIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hours */}
              <SlideIn direction="right">
                <Card>
                  <Card.Header>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <Card.Title>Hours</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-2">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{day}</span>
                          <span className="text-gray-900 font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              </SlideIn>

              {/* Safety Score */}
              <SlideIn direction="right" delay={0.1}>
                <Card>
                  <Card.Header>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <Card.Title>Safety Score</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">{business.safetyScore}%</div>
                      <div className="text-sm text-gray-600">
                        Based on {business.verifiedReviews} verified reviews
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Progress value={98} label="Accessibility" showLabel variant="success" />
                      <Progress value={96} label="Inclusivity" showLabel variant="success" />
                      <Progress value={92} label="Staff Training" showLabel variant="success" />
                    </div>
                  </Card.Content>
                </Card>
              </SlideIn>

              {/* Action Buttons */}
              <SlideIn direction="right" delay={0.2}>
                <div className="space-y-3">
                  <Button className="w-full" icon={MapPin}>
                    Get Directions
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Back to Search
                    </Button>
                  </Link>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>

        {/* Review Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title="Write a Review"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <StarRating
                rating={reviewRating}
                onChange={setReviewRating}
                size="lg"
                interactive
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Experience
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={5}
                placeholder="Share your experience with this space..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsReviewModalOpen(false)}>Submit Review</Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
}
