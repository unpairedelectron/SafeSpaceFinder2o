'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, MapPin, Users, Heart, CheckCircle, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Community-verified safety scores to help you make informed decisions.',
    },
    {
      icon: MapPin,
      title: 'Easy Discovery',
      description: 'Find inclusive spaces near you with advanced filtering options.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Real reviews from people with similar identities and needs.',
    },
    {
      icon: Heart,
      title: 'Truly Inclusive',
      description: 'LGBTQ+ friendly, wheelchair accessible, autism-friendly, and more.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Safe Spaces' },
    { value: '50,000+', label: 'Community Reviews' },
    { value: '100+', label: 'Cities Covered' },
    { value: '95%', label: 'User Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Safe Space
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover inclusive, accessible, and safe public spaces. Built by the community, for everyone who deserves to feel welcome.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/map"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <MapPin className="h-5 w-5 mr-2" aria-hidden="true" />
                Explore Map
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-indigo-600 bg-white hover:bg-gray-50 rounded-lg border-2 border-indigo-600 shadow-lg hover:shadow-xl transition-all"
              >
                Join Community
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 -z-10 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 -z-10 transform translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full blur-3xl opacity-30" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Safe Space Finder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to creating a world where everyone can find spaces that welcome them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Finding safe spaces is easy with our three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced filters to find spaces that meet your specific needs and identities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Read Reviews</h3>
              <p className="text-gray-600">
                Check community-verified reviews and safety scores from people like you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit with Confidence</h3>
              <p className="text-gray-600">
                Know what to expect before you go, and share your own experience to help others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Safe Space?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of community members making the world more inclusive, one space at a time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-indigo-600 bg-white hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent hover:bg-white hover:bg-opacity-10 rounded-lg border-2 border-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'Community Member',
                quote: 'This app changed my life. I can now confidently explore new places knowing they\'re safe and welcoming.',
                avatar: '👤',
              },
              {
                name: 'Jordan Smith',
                role: 'Accessibility Advocate',
                quote: 'Finally, an app that truly understands accessibility. The detailed reviews are incredibly helpful.',
                avatar: '👤',
              },
              {
                name: 'Sam Rivera',
                role: 'LGBTQ+ Advocate',
                quote: 'Safe Space Finder has helped our community discover inclusive businesses. It\'s a game-changer.',
                avatar: '👤',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
