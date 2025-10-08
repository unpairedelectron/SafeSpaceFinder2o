'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Heart,
  Users,
  MapPin,
  Star,
  Check,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition, FadeIn, SlideIn, StaggerChildren } from '@/components/animations/PageTransitions';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Safety First',
    description: 'Community-verified safety scores help you find truly welcoming spaces'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Inclusive Spaces',
    description: 'Find LGBTQ+ friendly, wheelchair accessible, and neurodiversity-supportive locations'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community-Driven',
    description: 'Real reviews from people with shared experiences and identities'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Local Discovery',
    description: 'Discover safe spaces in your neighborhood with our interactive map'
  }
];

const stats = [
  { value: '10,000+', label: 'Safe Spaces' },
  { value: '50,000+', label: 'Community Members' },
  { value: '200+', label: 'Cities' },
  { value: '4.9', label: 'Average Rating' }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Community Member',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'This platform helped me find safe spaces in my new city. The community reviews are incredibly helpful!'
  },
  {
    name: 'Alex Chen',
    role: 'LGBTQ+ Advocate',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Finally, a platform that understands the importance of truly inclusive spaces. Game changer!'
  },
  {
    name: 'Jordan Rivera',
    role: 'Accessibility Consultant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    content: 'The detailed accessibility information saves me so much time. Thank you for building this!'
  }
];

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-pink-600/20 dark:to-blue-600/20" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
            <FadeIn>
              <div className="text-center max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-8"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Find Your Safe Space</span>
                </motion.div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                  Discover{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Inclusive
                  </span>
                  <br />
                  Spaces Near You
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                  Find LGBTQ+ friendly, wheelchair accessible, and autism-friendly businesses verified by our community
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Link href="/discover">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Exploring
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/add-business">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Add a Business
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Community Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Free to Use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Always Improving</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Safe Space Finder?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  More than just a directory—a community-powered platform for finding truly welcoming spaces
                </p>
              </div>
            </FadeIn>

            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-xl transition-shadow group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Loved by Our Community
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Real stories from real people finding their safe spaces
                </p>
              </div>
            </FadeIn>

            <StaggerChildren className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Ready to Find Your Safe Space?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join thousands of community members discovering inclusive spaces
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/discover">
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-gray-100 w-full sm:w-auto"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      Join Our Community
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
