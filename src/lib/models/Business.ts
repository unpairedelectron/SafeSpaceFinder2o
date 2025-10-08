import mongoose, { Schema, Model } from 'mongoose';

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IBusiness {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  location: ILocation;
  phone?: string;
  website?: string;
  email?: string;
  hours?: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  images: string[];
  verifiedImages: string[];
  features: {
    accessibility: string[];
    identity: string[];
    neurodiversity: string[];
  };
  safetyScore: number;
  totalReviews: number;
  averageRating: number;
  verified: boolean;
  claimedBy?: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  addedBy: mongoose.Types.ObjectId;
  viewCount: number;
  saveCount: number;
  reportCount: number;
  lastVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IBusinessMethods {
  updateSafetyScore(): Promise<void>;
  incrementViewCount(): Promise<void>;
  addSave(userId: mongoose.Types.ObjectId): Promise<void>;
  removeSave(userId: mongoose.Types.ObjectId): Promise<void>;
}

type BusinessModel = Model<IBusiness, {}, IBusinessMethods>;

const businessSchema = new Schema<IBusiness, BusinessModel, IBusinessMethods>(
  {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      minlength: [2, 'Business name must be at least 2 characters'],
      maxlength: [200, 'Business name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Restaurant',
        'Cafe',
        'Bar',
        'Healthcare',
        'Fitness',
        'Education',
        'Shopping',
        'Entertainment',
        'Service',
        'Community Center',
        'Coworking',
        'Library',
        'Other',
      ],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'USA' },
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v: number[]) {
            return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
          },
          message: 'Invalid coordinates',
        },
      },
    },
    phone: {
      type: String,
      match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number'],
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    hours: {
      type: Map,
      of: {
        open: String,
        close: String,
        closed: Boolean,
      },
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 20;
        },
        message: 'Cannot have more than 20 images',
      },
    },
    verifiedImages: {
      type: [String],
      default: [],
    },
    features: {
      accessibility: {
        type: [String],
        default: [],
      },
      identity: {
        type: [String],
        default: [],
      },
      neurodiversity: {
        type: [String],
        default: [],
      },
    },
    safetyScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    claimedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'flagged'],
      default: 'pending',
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    saveCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastVerified: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
businessSchema.index({ location: '2dsphere' }); // For geospatial queries
businessSchema.index({ name: 'text', description: 'text' }); // For text search
businessSchema.index({ category: 1 });
businessSchema.index({ safetyScore: -1 });
businessSchema.index({ averageRating: -1 });
businessSchema.index({ status: 1 });
businessSchema.index({ createdAt: -1 });
businessSchema.index({ 'address.city': 1, 'address.state': 1 });

// Method to update safety score based on reviews
businessSchema.methods.updateSafetyScore = async function (): Promise<void> {
  const Review = mongoose.model('Review');
  
  const reviews = await Review.find({ business: this._id });
  
  if (reviews.length === 0) {
    this.safetyScore = 0;
    this.totalReviews = 0;
    this.averageRating = 0;
    await this.save();
    return;
  }

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = totalRating / reviews.length;

  // Calculate safety score (0-100) based on multiple factors
  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;
  const negativeReviews = reviews.filter((r) => r.rating <= 2).length;
  
  const positiveRatio = positiveReviews / reviews.length;
  const negativeRatio = negativeReviews / reviews.length;
  
  // Safety score formula
  let safetyScore = (positiveRatio * 100) - (negativeRatio * 30);
  
  // Boost for verified reviews
  const verifiedReviews = reviews.filter((r) => r.verified).length;
  const verifiedBonus = (verifiedReviews / reviews.length) * 10;
  
  safetyScore = Math.min(100, Math.max(0, safetyScore + verifiedBonus));
  
  this.safetyScore = Math.round(safetyScore);
  this.totalReviews = reviews.length;
  
  await this.save();
};

// Method to increment view count
businessSchema.methods.incrementViewCount = async function (): Promise<void> {
  this.viewCount += 1;
  await this.save();
};

// Method to add save
businessSchema.methods.addSave = async function (
  userId: mongoose.Types.ObjectId
): Promise<void> {
  this.saveCount += 1;
  await this.save();
  
  // Add to user's saved businesses
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(userId, {
    $addToSet: { savedBusinesses: this._id },
  });
};

// Method to remove save
businessSchema.methods.removeSave = async function (
  userId: mongoose.Types.ObjectId
): Promise<void> {
  this.saveCount = Math.max(0, this.saveCount - 1);
  await this.save();
  
  // Remove from user's saved businesses
  const User = mongoose.model('User');
  await User.findByIdAndUpdate(userId, {
    $pull: { savedBusinesses: this._id },
  });
};

// Export model
const Business = (mongoose.models.Business as BusinessModel) || 
  mongoose.model<IBusiness, BusinessModel>('Business', businessSchema);

export default Business;
