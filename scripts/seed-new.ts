#!/usr/bin/env ts-node

/**
 * Database Seed Script
 * Populates the database with sample data for development and testing
 * 
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import connectDB, { disconnectDB } from '../src/lib/database/mongodb';
import User from '../src/lib/models/User';
import Business from '../src/lib/models/Business';
import Review from '../src/lib/models/Review';

// Sample user data
const sampleUsers = [
  {
    name: 'Alex Chen',
    email: 'alex@example.com',
    password: 'password123',
    role: 'user' as const,
    identities: ['lgbtq+', 'asian'],
    accessibilityNeeds: [],
    verified: true,
    bio: 'Community advocate and safe space enthusiast. Passionate about creating inclusive environments for everyone.',
    pronouns: 'they/them',
  },
  {
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    password: 'password123',
    role: 'user' as const,
    identities: ['non-binary'],
    accessibilityNeeds: ['wheelchair-user'],
    verified: true,
    bio: 'Accessibility consultant helping businesses become more inclusive. Wheelchair user and disability rights advocate.',
    pronouns: 'they/them',
  },
  {
    name: 'Sam Rivera',
    email: 'sam@example.com',
    password: 'password123',
    role: 'user' as const,
    identities: ['lgbtq+', 'latinx'],
    accessibilityNeeds: [],
    verified: true,
    bio: 'Teacher and community organizer focused on LGBTQ+ youth support and education.',
    pronouns: 'he/they',
  },
  {
    name: 'Admin User',
    email: 'admin@safespacefinder.com',
    password: 'admin123',
    role: 'admin' as const,
    identities: [],
    accessibilityNeeds: [],
    verified: true,
    bio: 'Platform administrator',
    pronouns: 'she/her',
  },
];

// Sample business data
const sampleBusinesses = [
  {
    name: 'Rainbow Cafe',
    description: 'A welcoming cafe in the heart of Castro. We pride ourselves on creating a safe, inclusive space for all. Our staff is trained in LGBTQ+ cultural competency and we offer gender-neutral facilities.',
    category: 'Cafe',
    address: {
      street: '123 Castro St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94114',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.4350, 37.7609], // [longitude, latitude]
    },
    phone: '+1 (415) 555-0123',
    website: 'https://rainbowcafe.example.com',
    email: 'hello@rainbowcafe.example.com',
    features: {
      identity: ['lgbtq-friendly', 'gender-neutral-bathrooms'],
      accessibility: ['wheelchair-accessible', 'braille-menu'],
      neurodiversity: ['quiet-space-available', 'sensory-friendly'],
    },
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
    ],
    verifiedImages: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'],
    safetyScore: 95,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Inclusive Yoga Studio',
    description: 'Body-positive yoga studio offering classes for all abilities and body types. We focus on mindfulness, accessibility, and creating a judgment-free environment. Modified poses available for all levels.',
    category: 'Fitness',
    address: {
      street: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.4074, 37.7879],
    },
    phone: '+1 (415) 555-0456',
    website: 'https://inclusiveyoga.example.com',
    email: 'info@inclusiveyoga.example.com',
    features: {
      identity: ['lgbtq-friendly', 'poc-owned', 'women-owned'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access'],
      neurodiversity: ['quiet-classes', 'flexible-scheduling'],
    },
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'],
    verifiedImages: [],
    safetyScore: 92,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Safe Space Bookstore',
    description: 'Independent bookstore with curated collection of diverse voices, LGBTQ+ literature, and inclusive childrens books. We host regular community events and author readings.',
    category: 'Shopping',
    address: {
      street: '789 Valencia St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.4214, 37.7599],
    },
    phone: '+1 (415) 555-0789',
    website: 'https://safespacebookstore.example.com',
    email: 'books@safespacebooks.example.com',
    features: {
      identity: ['lgbtq-friendly', 'poc-owned', 'community-focused'],
      accessibility: ['wheelchair-accessible', 'wide-aisles', 'accessible-checkout'],
      neurodiversity: ['quiet-space', 'low-sensory-lighting'],
    },
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'],
    verifiedImages: [],
    safetyScore: 90,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Accessible Tech Co-Working',
    description: 'Modern co-working space designed with accessibility in mind. Features adjustable desks, quiet rooms, and sensory-friendly lighting. Inclusive community of tech professionals.',
    category: 'Coworking',
    address: {
      street: '321 Folsom St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.3971, 37.7858],
    },
    phone: '+1 (415) 555-0321',
    website: 'https://accessibletech.example.com',
    email: 'hello@accessibletech.example.com',
    features: {
      identity: ['lgbtq-friendly', 'inclusive-hiring'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access', 'accessible-bathrooms'],
      neurodiversity: ['quiet-rooms', 'noise-cancelling-headphones', 'flexible-hours'],
    },
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
    verifiedImages: [],
    safetyScore: 88,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Pride Medical Center',
    description: 'Healthcare facility specializing in LGBTQ+ affirming care. Our providers are trained in gender-affirming care, HIV prevention, and mental health support for LGBTQ+ individuals.',
    category: 'Healthcare',
    address: {
      street: '555 California St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94104',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.4016, 37.7931],
    },
    phone: '+1 (415) 555-0555',
    website: 'https://pridemedical.example.com',
    email: 'care@pridemedical.example.com',
    features: {
      identity: ['lgbtq-friendly', 'lgbtq-healthcare-specialists', 'trans-friendly'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access', 'accessible-exam-rooms'],
      neurodiversity: ['extended-appointments', 'quiet-waiting-room'],
    },
    images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'],
    verifiedImages: [],
    safetyScore: 97,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Harmony Community Center',
    description: 'Multi-purpose community center offering programs for all ages. We provide support groups, educational workshops, and social events in a safe, welcoming environment.',
    category: 'Community Center',
    address: {
      street: '234 Mission St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.3942, 37.7898],
    },
    phone: '+1 (415) 555-0234',
    website: 'https://harmonycc.example.com',
    email: 'info@harmonycc.example.com',
    features: {
      identity: ['lgbtq-friendly', 'all-ages-welcome', 'family-friendly'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access', 'accessible-bathrooms'],
      neurodiversity: ['quiet-space', 'sensory-friendly-events', 'visual-schedules'],
    },
    images: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800'],
    verifiedImages: [],
    safetyScore: 93,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Open Arms Restaurant',
    description: 'Farm-to-table restaurant with diverse menu options including vegan, gluten-free, and allergen-friendly dishes. We celebrate diversity in food and people.',
    category: 'Restaurant',
    address: {
      street: '876 Haight St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94117',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.4469, 37.7699],
    },
    phone: '+1 (415) 555-0876',
    website: 'https://openarmsrestaurant.example.com',
    email: 'reservations@openarms.example.com',
    features: {
      identity: ['lgbtq-friendly', 'women-owned', 'poc-owned'],
      accessibility: ['wheelchair-accessible', 'accessible-seating', 'accessible-bathroom'],
      neurodiversity: ['quiet-dining-area', 'allergen-menu'],
    },
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'],
    verifiedImages: [],
    safetyScore: 89,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Bright Future Library',
    description: 'Public library with extensive collection of diverse literature. We offer inclusive programming, accessibility services, and sensory-friendly hours for neurodivergent visitors.',
    category: 'Library',
    address: {
      street: '432 Oak St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    location: {
      type: 'Point' as const,
      coordinates: [-122.4294, 37.7749],
    },
    phone: '+1 (415) 555-0432',
    website: 'https://brightfuturelibrary.example.com',
    email: 'info@brightfuture.example.com',
    features: {
      identity: ['lgbtq-friendly', 'inclusive-collection'],
      accessibility: ['wheelchair-accessible', 'elevator-access', 'accessible-computers'],
      neurodiversity: ['quiet-study-rooms', 'sensory-friendly-hours', 'visual-aids'],
    },
    images: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800'],
    verifiedImages: [],
    safetyScore: 91,
    verified: true,
    status: 'approved' as const,
  },
];

/**
 * Main seed function
 */
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Business.deleteMany({}),
      Review.deleteMany({}),
    ]);
    console.log('✅ Existing data cleared\n');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      // Password will be hashed by pre-save hook
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`   ✓ ${user.name} (${user.email}) - ${user.role}`);
    }
    console.log(`✅ Created ${createdUsers.length} users\n`);

    // Create businesses
    console.log('🏢 Creating businesses...');
    const createdBusinesses = [];
    for (const businessData of sampleBusinesses) {
      const business = await Business.create({
        ...businessData,
        addedBy: createdUsers[3]._id, // Admin user
      });
      createdBusinesses.push(business);
      console.log(`   ✓ ${business.name} (${business.category}) - Score: ${business.safetyScore}`);
    }
    console.log(`✅ Created ${createdBusinesses.length} businesses\n`);

    // Create reviews
    console.log('⭐ Creating reviews...');
    const reviews = [
      {
        business: createdBusinesses[0]._id,
        user: createdUsers[0]._id,
        rating: 5,
        title: 'Amazing and welcoming space!',
        content: 'This cafe is absolutely wonderful. The staff is incredibly welcoming and knowledgeable about LGBTQ+ needs. The atmosphere is warm and inclusive, and they have great coffee too! My partner and I felt completely safe and respected here. Highly recommend!',
        safetyRating: {
          overall: 5,
          accessibility: 5,
          inclusivity: 5,
          staff: 5,
        },
        visitDate: new Date('2024-11-15'),
        identityContext: ['lgbtq+'],
        photos: ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400'],
        verified: true,
        status: 'approved' as const,
      },
      {
        business: createdBusinesses[0]._id,
        user: createdUsers[1]._id,
        rating: 5,
        title: 'Fully accessible - fantastic!',
        content: 'As a wheelchair user, I was thrilled to find this cafe. Wide doorways, accessible seating, and staff who truly understand accessibility needs. The braille menu is a thoughtful touch that shows they care. Five stars all around!',
        safetyRating: {
          overall: 5,
          accessibility: 5,
          inclusivity: 5,
          staff: 5,
        },
        visitDate: new Date('2024-11-20'),
        accessibilityContext: ['wheelchair-user'],
        verified: true,
        status: 'approved' as const,
      },
      {
        business: createdBusinesses[1]._id,
        user: createdUsers[0]._id,
        rating: 4,
        title: 'Great classes, inclusive approach',
        content: 'Love this yoga studio! They use inclusive language and have a truly body-positive approach. Instructors are mindful of different abilities and offer modifications. Would love to see more sensory-friendly class options, but overall excellent!',
        safetyRating: {
          overall: 4,
          accessibility: 4,
          inclusivity: 5,
          staff: 5,
        },
        visitDate: new Date('2024-12-01'),
        identityContext: ['lgbtq+'],
        verified: true,
        status: 'approved' as const,
      },
      {
        business: createdBusinesses[2]._id,
        user: createdUsers[2]._id,
        rating: 5,
        title: 'My favorite bookstore in SF',
        content: 'This bookstore is an absolute treasure! Wonderful LGBTQ+ section, diverse authors represented, and the staff creates such a welcoming environment. Their community events bring people together. Supporting local businesses like this is so important!',
        safetyRating: {
          overall: 5,
          accessibility: 4,
          inclusivity: 5,
          staff: 5,
        },
        visitDate: new Date('2024-11-28'),
        identityContext: ['lgbtq+', 'latinx'],
        verified: true,
        status: 'approved' as const,
      },
      {
        business: createdBusinesses[3]._id,
        user: createdUsers[1]._id,
        rating: 4,
        title: 'Excellent accessibility features',
        content: 'Great co-working space with thoughtful accessibility features. The quiet rooms are perfect for focused work, and the adjustable desks accommodate different needs. My only critique is that parking can be limited during peak hours.',
        safetyRating: {
          overall: 4,
          accessibility: 5,
          inclusivity: 4,
          staff: 4,
        },
        visitDate: new Date('2024-12-05'),
        accessibilityContext: ['wheelchair-user'],
        verified: true,
        status: 'approved' as const,
      },
      {
        business: createdBusinesses[4]._id,
        user: createdUsers[2]._id,
        rating: 5,
        title: 'Finally, healthcare that understands',
        content: 'Finding LGBTQ+-affirming healthcare has been challenging, but Pride Medical Center exceeded my expectations. The staff is knowledgeable, respectful, and creates a truly safe environment. They understand the unique healthcare needs of our community. Highly recommended!',
        safetyRating: {
          overall: 5,
          accessibility: 5,
          inclusivity: 5,
          staff: 5,
        },
        visitDate: new Date('2024-11-10'),
        identityContext: ['lgbtq+'],
        verified: true,
        status: 'approved' as const,
      },
    ];

    const createdReviews = [];
    for (const reviewData of reviews) {
      const review = await Review.create(reviewData);
      createdReviews.push(review);
      const business = createdBusinesses.find((b) => b._id.equals(reviewData.business));
      console.log(`   ✓ Review for ${business?.name} (${reviewData.rating}★)`);
    }
    console.log(`✅ Created ${createdReviews.length} reviews\n`);

    // Update business safety scores based on reviews
    console.log('📊 Updating business safety scores...');
    for (const business of createdBusinesses) {
      if (typeof business.updateSafetyScore === 'function') {
        await business.updateSafetyScore();
      }
    }
    console.log('✅ Safety scores updated\n');

    // Success summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Database seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Businesses: ${createdBusinesses.length}`);
    console.log(`   - Reviews: ${createdReviews.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📝 Test Credentials:\n');
    console.log('   👤 Regular User:');
    console.log('      Email: alex@example.com');
    console.log('      Password: password123\n');
    console.log('   ♿ Accessibility Reviewer:');
    console.log('      Email: jordan@example.com');
    console.log('      Password: password123\n');
    console.log('   🏳️‍🌈 Community Organizer:');
    console.log('      Email: sam@example.com');
    console.log('      Password: password123\n');
    console.log('   🔐 Admin User:');
    console.log('      Email: admin@safespacefinder.com');
    console.log('      Password: admin123\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('✅ Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Open: http://localhost:3000');
    console.log('   3. Login with any test account above\n');

    // Disconnect
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    if (error instanceof Error) {
      console.error('\nError details:', error.message);
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Run seed function
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
