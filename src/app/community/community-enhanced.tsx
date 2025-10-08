'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { PageTransition, FadeIn, SlideIn, ScrollReveal } from '@/components/animations/PageTransitions';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  TrendingUp,
  Users,
  Award,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Send,
  Image as ImageIcon,
  Smile,
  MoreVertical,
  Flag,
  Edit,
  Trash2,
} from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      verified: true,
      role: 'Community Leader',
    },
    content:
      'Just discovered the most amazing LGBTQ+ friendly café downtown! The staff were so welcoming and they have a beautiful quiet corner for reading. Highly recommend checking it out! 🌈',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ['LGBTQ+', 'Coffee Shop', 'Downtown'],
    liked: false,
    bookmarked: false,
  },
  {
    id: '2',
    author: {
      name: 'Sam Rivera',
      avatar: 'SR',
      verified: true,
      role: 'Accessibility Advocate',
    },
    content:
      'PSA: The new park on Green Boulevard has excellent wheelchair accessibility! Wide paths, accessible bathrooms, and even sensory-friendly areas. A+ for inclusivity! ♿',
    timestamp: '5 hours ago',
    likes: 42,
    comments: 12,
    shares: 8,
    tags: ['Accessibility', 'Park', 'Review'],
    liked: true,
    bookmarked: false,
  },
  {
    id: '3',
    author: {
      name: 'Jordan Lee',
      avatar: 'JL',
      verified: false,
      role: 'Community Member',
    },
    content:
      'Looking for autism-friendly restaurants in the area. Does anyone have recommendations? Preferably places with quiet dining options. Thanks!',
    timestamp: '1 day ago',
    likes: 15,
    comments: 18,
    shares: 2,
    tags: ['Question', 'Autism Friendly', 'Restaurant'],
    liked: false,
    bookmarked: true,
  },
];

const mockEvents = [
  {
    id: '1',
    title: 'Pride Month Celebration',
    date: 'June 15, 2025',
    time: '6:00 PM',
    location: 'Rainbow Café, Downtown',
    attendees: 45,
    category: 'Social',
  },
  {
    id: '2',
    title: 'Accessibility Workshop',
    date: 'June 20, 2025',
    time: '2:00 PM',
    location: 'Community Center',
    attendees: 28,
    category: 'Education',
  },
  {
    id: '3',
    title: 'Safe Spaces Meetup',
    date: 'June 25, 2025',
    time: '7:00 PM',
    location: 'Unity Bookstore',
    attendees: 32,
    category: 'Networking',
  },
];

const topContributors = [
  { name: 'Alex Johnson', avatar: 'AJ', contributions: 145, badge: 'gold' },
  { name: 'Sam Rivera', avatar: 'SR', contributions: 128, badge: 'silver' },
  { name: 'Jordan Lee', avatar: 'JL', contributions: 98, badge: 'bronze' },
  { name: 'Taylor Kim', avatar: 'TK', contributions: 87, badge: null },
  { name: 'Casey Morgan', avatar: 'CM', contributions: 76, badge: null },
];

export default function CommunityEnhanced() {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState('feed');

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <FadeIn>
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Community</h1>
                <p className="text-xl text-white/90 mb-6">
                  Connect, share experiences, and support each other
                </p>
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>2,847 Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>1,234 Posts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>12 Events</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post Card */}
              <SlideIn direction="up">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar fallback="You" size="md" />
                      <button
                        onClick={() => setIsNewPostOpen(true)}
                        className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        Share your experience...
                      </button>
                      <Button onClick={() => setIsNewPostOpen(true)} icon={<Send />}>
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Tabs */}
              <SlideIn direction="up" delay={0.1}>
                <Card>
                  <Tabs defaultValue="feed">
                    <div className="border-b border-gray-200 px-6 pt-6">
                      <TabsList>
                        <TabsTrigger value="feed">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Feed
                        </TabsTrigger>
                        <TabsTrigger value="popular">
                          <Heart className="w-4 h-4 mr-2" />
                          Popular
                        </TabsTrigger>
                        <TabsTrigger value="following">
                          <Users className="w-4 h-4 mr-2" />
                          Following
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="feed">
                      <div className="divide-y divide-gray-200">
                        {posts.map((post, index) => (
                          <ScrollReveal key={post.id}>
                            <div className="p-6">
                              {/* Post Header */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                  <Avatar fallback={post.author.avatar} size="md" />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-gray-900">
                                        {post.author.name}
                                      </span>
                                      {post.author.verified && (
                                        <Badge variant="primary">Verified</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                      <span>{post.author.role}</span>
                                      <span>•</span>
                                      <span>{post.timestamp}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" icon={<MoreVertical />} />
                              </div>

                              {/* Post Content */}
                              <p className="text-gray-900 mb-4">{post.content}</p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Post Actions */}
                              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                                <button
                                  onClick={() => toggleLike(post.id)}
                                  className={`flex items-center gap-2 text-sm transition-colors ${
                                    post.liked
                                      ? 'text-purple-600 font-medium'
                                      : 'text-gray-600 hover:text-purple-600'
                                  }`}
                                >
                                  <ThumbsUp
                                    className={`w-5 h-5 ${
                                      post.liked ? 'fill-current' : ''
                                    }`}
                                  />
                                  <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                                  <MessageCircle className="w-5 h-5" />
                                  <span>{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                                  <Share2 className="w-5 h-5" />
                                  <span>{post.shares}</span>
                                </button>
                                <button
                                  onClick={() => toggleBookmark(post.id)}
                                  className={`flex items-center gap-2 text-sm transition-colors ml-auto ${
                                    post.bookmarked
                                      ? 'text-purple-600'
                                      : 'text-gray-600 hover:text-purple-600'
                                  }`}
                                >
                                  <Bookmark
                                    className={`w-5 h-5 ${
                                      post.bookmarked ? 'fill-current' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="popular">
                      <div className="p-6 text-center text-gray-600">
                        Popular posts will appear here
                      </div>
                    </TabsContent>

                    <TabsContent value="following">
                      <div className="p-6 text-center text-gray-600">
                        Posts from people you follow will appear here
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </SlideIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <SlideIn direction="right">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <Badge variant="primary" className="mt-3">
                          {event.category}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Top Contributors */}
              <SlideIn direction="right" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topContributors.map((contributor, index) => (
                      <div key={contributor.name} className="flex items-center gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="font-bold text-gray-400 w-6">{index + 1}</span>
                          <Avatar fallback={contributor.avatar} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">
                              {contributor.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {contributor.contributions} contributions
                            </div>
                          </div>
                        </div>
                        {contributor.badge && (
                          <Award
                            className={`w-5 h-5 ${
                              contributor.badge === 'gold'
                                ? 'text-yellow-500'
                                : contributor.badge === 'silver'
                                ? 'text-gray-400'
                                : 'text-orange-600'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </SlideIn>

              {/* Community Guidelines */}
              <SlideIn direction="right" delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-700">
                    <p>✓ Be respectful and inclusive</p>
                    <p>✓ Share authentic experiences</p>
                    <p>✓ Report inappropriate content</p>
                    <p>✓ Support each other</p>
                    <Button variant="outline" className="w-full mt-4">
                      Read Full Guidelines
                    </Button>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        <Modal
          open={isNewPostOpen}
          onClose={() => setIsNewPostOpen(false)}
          title="Create Post"
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar fallback="You" size="md" />
              <div className="flex-1">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={6}
                  placeholder="What's on your mind? Share your experience..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" icon={<ImageIcon />}>
                Photo
              </Button>
              <Button variant="ghost" icon={<MapPin />}>
                Location
              </Button>
              <Button variant="ghost" icon={<Smile />}>
                Emoji
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle post creation
                  setIsNewPostOpen(false);
                  setNewPostContent('');
                }}
                disabled={!newPostContent.trim()}
              >
                Post
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
}
