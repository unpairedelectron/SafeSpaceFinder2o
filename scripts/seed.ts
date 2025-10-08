import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Import models
import connectDB from '../src/lib/database/mongodb';
import User from '../src/lib/models/User';
import Business from '../src/lib/models/Business';
import Review from '../src/lib/models/Review';

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
    features: {
      identity: ['lgbtq-friendly', 'gender-neutral-bathrooms'],
      accessibility: ['wheelchair-accessible', 'braille-menu'],
      neurodiversity: ['quiet-space-available', 'sensory-friendly'],
    },
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
    ],
    safetyScore: 95,
    verified: true,
    status: 'approved' as const,
  },
  {
    name: 'Inclusive Yoga Studio',
    category: 'Fitness & Wellness',
    address: '456 Market St, San Francisco, CA 94102',
    coordinates: { lat: 37.7879, lng: -122.4074 },
    phone: '+1 (415) 555-0456',
    website: 'https://inclusiveyoga.example.com',
    features: {
      identity: ['lgbtq-friendly', 'poc-owned', 'women-owned'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access'],
      neurodiversity: ['quiet-classes', 'flexible-scheduling'],
    },
    photos: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    ],
    safetyScore: 92,
    verified: true,
  },
  {
    name: 'Safe Space Bookstore',
    category: 'Retail',
    address: '789 Valencia St, San Francisco, CA 94110',
    coordinates: { lat: 37.7599, lng: -122.4214 },
    phone: '+1 (415) 555-0789',
    website: 'https://safespacebookstore.example.com',
    features: {
      identity: ['lgbtq-friendly', 'poc-owned', 'community-focused'],
      accessibility: ['wheelchair-accessible', 'wide-aisles', 'accessible-checkout'],
      neurodiversity: ['quiet-space', 'low-sensory-lighting'],
    },
    photos: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    ],
    safetyScore: 90,
    verified: true,
  },
  {
    name: 'Accessible Tech Co-Working',
    category: 'Co-working Space',
    address: '321 Folsom St, San Francisco, CA 94107',
    coordinates: { lat: 37.7858, lng: -122.3971 },
    phone: '+1 (415) 555-0321',
    website: 'https://accessibletech.example.com',
    features: {
      identity: ['lgbtq-friendly', 'inclusive-hiring'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access', 'accessible-bathrooms'],
      neurodiversity: ['quiet-rooms', 'noise-cancelling-headphones', 'flexible-hours'],
    },
    photos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    ],
    safetyScore: 88,
    verified: true,
  },
  {
    name: 'Pride Medical Center',
    category: 'Healthcare',
    address: '555 California St, San Francisco, CA 94104',
    coordinates: { lat: 37.7931, lng: -122.4016 },
    phone: '+1 (415) 555-0555',
    website: 'https://pridemedical.example.com',
    features: {
      identity: ['lgbtq-friendly', 'lgbtq-healthcare-specialists', 'trans-friendly'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access', 'accessible-exam-rooms'],
      neurodiversity: ['extended-appointments', 'quiet-waiting-room'],
    },
    photos: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    ],
    safetyScore: 97,
    verified: true,
  },
  {
    name: 'Harmony Community Center',
    category: 'Community Center',
    address: '234 Mission St, San Francisco, CA 94105',
    coordinates: { lat: 37.7898, lng: -122.3942 },
    phone: '+1 (415) 555-0234',
    website: 'https://harmonycc.example.com',
    features: {
      identity: ['lgbtq-friendly', 'all-ages-welcome', 'family-friendly'],
      accessibility: ['wheelchair-accessible', 'accessible-parking', 'elevator-access', 'accessible-bathrooms'],
      neurodiversity: ['quiet-space', 'sensory-friendly-events', 'visual-schedules'],
    },
    photos: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
    ],
    safetyScore: 93,
    verified: true,
  },
  {
    name: 'Open Arms Restaurant',
    category: 'Restaurant',
    address: '876 Haight St, San Francisco, CA 94117',
    coordinates: { lat: 37.7699, lng: -122.4469 },
    phone: '+1 (415) 555-0876',
    website: 'https://openarmsrestaurant.example.com',
    features: {
      identity: ['lgbtq-friendly', 'women-owned', 'poc-owned'],
      accessibility: ['wheelchair-accessible', 'accessible-seating', 'accessible-bathroom'],
      neurodiversity: ['quiet-dining-area', 'allergen-menu'],
    },
    photos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    safetyScore: 89,
    verified: true,
  },
  {
    name: 'Bright Future Library',
    category: 'Library',
    address: '432 Oak St, San Francisco, CA 94102',
    coordinates: { lat: 37.7749, lng: -122.4294 },
    phone: '+1 (415) 555-0432',
    website: 'https://brightfuturelibrary.example.com',
    features: {
      identity: ['lgbtq-friendly', 'inclusive-collection'],
      accessibility: ['wheelchair-accessible', 'elevator-access', 'accessible-computers'],
      neurodiversity: ['quiet-study-rooms', 'sensory-friendly-hours', 'visual-aids'],
    },
    photos: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    ],
    safetyScore: 91,
    verified: true,
  },
];

const sampleUsers = [
  {
    name: 'Alex Chen',
    email: 'alex@example.com',
    password: 'password123',
    role: 'user' as const,
    identities: ['lgbtq+', 'asian'],
    accessibilityNeeds: [],
    verifiedReviewer: true,
    bio: 'Community advocate and safe space enthusiast. Passionate about creating inclusive environments for everyone.',
  },
  {
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    password: 'password123',
    role: 'user' as const,
    identities: ['non-binary'],
    accessibilityNeeds: ['wheelchair-user'],
    verifiedReviewer: true,
    bio: 'Accessibility consultant helping businesses become more inclusive. Wheelchair user and disability rights advocate.',
  },
  {
    name: 'Sam Rivera',
    email: 'sam@example.com',
    password: 'password123',
    role: 'user' as const,
    identities: ['lgbtq+', 'latinx'],
    accessibilityNeeds: [],
    verifiedReviewer: true,
    bio: 'Teacher and community organizer focused on LGBTQ+ youth support and education.',
  },
  {
    name: 'Admin User',
    email: 'admin@safespacefinder.com',
    password: 'admin123',
    role: 'admin' as const,
    identities: [],
    accessibilityNeeds: [],
    verifiedReviewer: true,
    bio: 'Platform administrator',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...\n');

    await connectDB();
    console.log('✅ Connected to database\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Business.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.name} (${user.email})`);
    }
    console.log('');

    // Create businesses
    console.log('🏢 Creating businesses...');
    const createdBusinesses = [];
    for (const businessData of sampleBusinesses) {
      const business = await Business.create({
        ...businessData,
        ownerId: createdUsers[3]._id, // Admin owns all businesses
      });
      createdBusinesses.push(business);
      console.log(`   ✓ Created business: ${business.name} (Score: ${business.safetyScore})`);
    }
    console.log('');

    // Create sample reviews
    console.log('⭐ Creating reviews...');
    const sampleReviews = [
      {
        businessId: createdBusinesses[0]._id,
        userId: createdUsers[0]._id,
        rating: 5,
        safetyRating: 95,
        comment: 'Amazing space! Staff is incredibly welcoming and knowledgeable about LGBTQ+ needs. The atmosphere is warm and inclusive. My partner and I felt completely safe and respected here.',
        features: ['lgbtq-friendly', 'wheelchair-accessible'],
        photos: ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400'],
        verified: true,
        helpfulCount: 24,
      },
      {
        businessId: createdBusinesses[0]._id,
        userId: createdUsers[1]._id,
        rating: 5,
        safetyRating: 98,
        comment: 'Fully accessible! Wide doorways, accessible seating, and staff who understand accessibility needs. The braille menu is a thoughtful touch. Highly recommend!',
        features: ['wheelchair-accessible', 'braille-menu'],
        photos: [],
        verified: true,
        helpfulCount: 18,
      },
      {
        businessId: createdBusinesses[1]._id,
        userId: createdUsers[0]._id,
        rating: 4,
        safetyRating: 90,
        comment: 'Great yoga classes with inclusive language and body-positive approach. Instructors are mindful of different abilities. Would love to see more sensory-friendly options though!',
        features: ['lgbtq-friendly', 'wheelchair-accessible'],
        photos: [],
        verified: true,
        helpfulCount: 12,
      },
      {
        businessId: createdBusinesses[2]._id,
        userId: createdUsers[2]._id,
        rating: 5,
        safetyRating: 92,
        comment: 'This bookstore is a treasure! Wonderful LGBTQ+ section, diverse authors, and the staff creates such a welcoming environment. Great community events too.',
        features: ['lgbtq-friendly', 'community-focused'],
        photos: [],
        verified: true,
        helpfulCount: 15,
      },
      {
        businessId: createdBusinesses[3]._id,
        userId: createdUsers[1]._id,
        rating: 4,
        safetyRating: 88,
        comment: 'Excellent co-working space with great accessibility features. Quiet rooms are perfect for focused work. Only minor issue is parking can be limited.',
        features: ['wheelchair-accessible', 'quiet-rooms'],
        photos: [],
        verified: true,
        helpfulCount: 9,
      },
      {
        businessId: createdBusinesses[4]._id,
        userId: createdUsers[2]._id,
        rating: 5,
        safetyRating: 97,
        comment: 'Finally, healthcare providers who truly understand LGBTQ+ health needs! Staff is knowledgeable, respectful, and creates a safe environment. Highly recommended.',
        features: ['lgbtq-friendly', 'trans-friendly'],
        photos: [],
        verified: true,
        helpfulCount: 31,
      },
    ];

    for (const reviewData of sampleReviews) {
      const review = await Review.create(reviewData);
      console.log(`   ✓ Created review for ${createdBusinesses.find(b => b._id.equals(reviewData.businessId))?.name}`);
    }
    console.log('');

    console.log('🎉 Database seeded successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary:');
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Businesses: ${createdBusinesses.length}`);
    console.log(`   - Reviews: ${sampleReviews.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📝 Test Credentials:\n');
    console.log('   Regular User:');
    console.log('     Email: alex@example.com');
    console.log('     Password: password123\n');
    console.log('   Accessibility Reviewer:');
    console.log('     Email: jordan@example.com');
    console.log('     Password: password123\n');
    console.log('   Admin User:');
    console.log('     Email: admin@safespacefinder.com');
    console.log('     Password: admin123\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ You can now run: npm run dev');
    console.log('   and login with any of the test accounts above!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
