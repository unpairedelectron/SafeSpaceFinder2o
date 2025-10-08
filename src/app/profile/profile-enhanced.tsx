'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { PageTransition, FadeIn, SlideIn } from '@/components/animations/PageTransitions';
import StarRating from '@/components/ui/StarRating';
import {
  User,
  Settings,
  Heart,
  MessageSquare,
  MapPin,
  Shield,
  Award,
  Calendar,
  Edit2,
  Save,
  TrendingUp,
  ThumbsUp,
  Star,
  CheckCircle,
} from 'lucide-react';

const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: '',
  bio: 'Community advocate passionate about creating inclusive spaces for everyone.',
  identities: ['LGBTQ+', 'Accessibility Advocate'],
  accessibilityNeeds: ['Wheelchair Accessible', 'Sign Language'],
  verified: true,
  joinedDate: 'January 2024',
  stats: {
    reviews: 24,
    savedPlaces: 12,
    contributions: 45,
    helpfulVotes: 189,
  },
};

const mockReviews = [
  {
    id: '1',
    businessName: 'Rainbow Café',
    rating: 5,
    safetyScore: 95,
    comment: 'Incredibly welcoming staff and accessible facilities. Perfect quiet corners for focused work.',
    date: '2024-01-15',
    helpful: 23,
  },
  {
    id: '2',
    businessName: 'Accessible Eats',
    rating: 4,
    safetyScore: 88,
    comment: 'Great food and genuinely accessible. Staff trained in disability awareness.',
    date: '2024-01-10',
    helpful: 15,
  },
  {
    id: '3',
    businessName: 'Unity Bookstore',
    rating: 5,
    safetyScore: 92,
    comment: 'Amazing selection and truly inclusive environment. Staff are knowledgeable and welcoming.',
    date: '2024-01-05',
    helpful: 18,
  },
];

const mockSavedPlaces = [
  { id: '1', name: 'Rainbow Café', type: 'Coffee Shop', safetyScore: 95, distance: '0.2 miles' },
  { id: '2', name: 'Peaceful Gardens', type: 'Park', safetyScore: 88, distance: '1.2 miles' },
  { id: '3', name: 'Unity Bookstore', type: 'Bookstore', safetyScore: 92, distance: '0.5 miles' },
  { id: '4', name: 'Inclusive Gym', type: 'Fitness', safetyScore: 90, distance: '0.8 miles' },
];

export default function ProfileEnhanced() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockUser);

  const handleSave = () => {
    setIsEditing(false);
    // API call would go here
  };

  const statCards = [
    { icon: MessageSquare, label: 'Reviews', value: mockUser.stats.reviews, color: 'purple' },
    { icon: Heart, label: 'Saved Places', value: mockUser.stats.savedPlaces, color: 'pink' },
    { icon: TrendingUp, label: 'Contributions', value: mockUser.stats.contributions, color: 'blue' },
    { icon: ThumbsUp, label: 'Helpful Votes', value: mockUser.stats.helpfulVotes, color: 'green' },
  ];

  const tabItems = [
    {
      label: 'Reviews',
      value: 'reviews',
      content: (
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{review.businessName}</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <StarRating rating={review.rating} size="sm" />
                    <Badge variant="outline" icon={Shield}>
                      {review.safetyScore}% safe
                    </Badge>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ThumbsUp className="w-4 h-4" />
                <span>{review.helpful} found this helpful</span>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      label: 'Saved Places',
      value: 'saved',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockSavedPlaces.map((place) => (
            <Card key={place.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-sm text-gray-600">{place.type}</p>
                </div>
                <Badge variant="success" icon={Shield}>
                  {place.safetyScore}%
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{place.distance}</span>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      label: 'About',
      value: 'about',
      content: (
        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <Input label="Name" value={profileData.name} />
              <Input label="Email" value={profileData.email} type="email" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} icon={Save}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Bio</h3>
                <p className="text-gray-700">{profileData.bio}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Identities</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.identities.map((identity) => (
                    <Badge key={identity} variant="secondary">
                      {identity}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Accessibility Needs</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.accessibilityNeeds.map((need) => (
                    <Badge key={need} variant="outline">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={() => setIsEditing(true)} icon={Edit2}>
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Header />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <FadeIn>
            <Card className="mb-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative">
                  <Avatar fallback={profileData.name} size="xl" className="w-32 h-32" />
                  {profileData.verified && (
                    <div className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full border-4 border-white">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                    {profileData.verified && (
                      <Badge variant="success" icon={CheckCircle}>
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{profileData.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profileData.joinedDate}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" icon={Settings} href="/settings">
                  Settings
                </Button>
              </div>
            </Card>
          </FadeIn>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statCards.map((stat, index) => (
              <SlideIn key={stat.label} direction="up" delay={index * 0.1}>
                <Card className="text-center hover:shadow-md transition-shadow">
                  <div className={`inline-flex p-3 rounded-full bg-${stat.color}-100 mb-3`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              </SlideIn>
            ))}
          </div>

          {/* Achievements */}
          <SlideIn direction="up">
            <Card className="mb-6">
              <Card.Header>
                <Card.Title>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span>Achievements</span>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'First Review', icon: Star, earned: true },
                    { name: 'Top Contributor', icon: TrendingUp, earned: true },
                    { name: 'Community Hero', icon: Heart, earned: true },
                    { name: 'Explorer', icon: MapPin, earned: false },
                  ].map((achievement) => (
                    <div
                      key={achievement.name}
                      className={`flex flex-col items-center p-4 rounded-lg ${
                        achievement.earned ? 'bg-yellow-50' : 'bg-gray-50'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-full mb-2 ${
                          achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}
                      >
                        <achievement.icon
                          className={`w-6 h-6 ${
                            achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </SlideIn>

          {/* Tabs */}
          <SlideIn direction="up" delay={0.2}>
            <Card>
              <Tabs items={tabItems} defaultValue="reviews" />
            </Card>
          </SlideIn>
        </main>
      </div>
    </PageTransition>
  );
}
