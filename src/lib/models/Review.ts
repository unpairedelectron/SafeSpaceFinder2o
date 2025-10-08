import mongoose, { Schema, Model } from 'mongoose';

export interface IReview {
  _id: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  photos: string[];
  verifiedPhotos: string[];
  safetyRating: {
    overall: number;
    accessibility?: number;
    inclusivity?: number;
    staff?: number;
  };
  visitDate: Date;
  identityContext?: string[];
  accessibilityContext?: string[];
  helpful: number;
  notHelpful: number;
  helpfulBy: mongoose.Types.ObjectId[];
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  moderationNotes?: string;
  reportCount: number;
  response?: {
    text: string;
    respondedBy: mongoose.Types.ObjectId;
    respondedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IReviewMethods {
  markHelpful(userId: mongoose.Types.ObjectId): Promise<void>;
  markNotHelpful(userId: mongoose.Types.ObjectId): Promise<void>;
  updateBusinessScore(): Promise<void>;
}

type ReviewModel = Model<IReview, {}, IReviewMethods>;

const reviewSchema = new Schema<IReview, ReviewModel, IReviewMethods>(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    title: {
      type: String,
      required: [true, 'Review title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Review content is required'],
      minlength: [20, 'Review must be at least 20 characters'],
      maxlength: [5000, 'Review cannot exceed 5000 characters'],
    },
    photos: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 photos',
      },
    },
    verifiedPhotos: {
      type: [String],
      default: [],
    },
    safetyRating: {
      overall: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      accessibility: {
        type: Number,
        min: 1,
        max: 5,
      },
      inclusivity: {
        type: Number,
        min: 1,
        max: 5,
      },
      staff: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    visitDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v: Date) {
          return v <= new Date();
        },
        message: 'Visit date cannot be in the future',
      },
    },
    identityContext: {
      type: [String],
      default: [],
    },
    accessibilityContext: {
      type: [String],
      default: [],
    },
    helpful: {
      type: Number,
      default: 0,
      min: 0,
    },
    notHelpful: {
      type: Number,
      default: 0,
      min: 0,
    },
    helpfulBy: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'flagged'],
      default: 'pending',
    },
    moderationNotes: String,
    reportCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    response: {
      text: String,
      respondedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      respondedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reviewSchema.index({ business: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ helpful: -1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ verified: 1 });

// Compound index to prevent duplicate reviews
reviewSchema.index({ business: 1, user: 1 }, { unique: true });

// Method to mark review as helpful
reviewSchema.methods.markHelpful = async function (
  userId: mongoose.Types.ObjectId
): Promise<void> {
  if (!this.helpfulBy.includes(userId)) {
    this.helpfulBy.push(userId);
    this.helpful += 1;
    await this.save();
  }
};

// Method to mark review as not helpful
reviewSchema.methods.markNotHelpful = async function (
  userId: mongoose.Types.ObjectId
): Promise<void> {
  const index = this.helpfulBy.indexOf(userId);
  if (index > -1) {
    this.helpfulBy.splice(index, 1);
    this.helpful = Math.max(0, this.helpful - 1);
  }
  this.notHelpful += 1;
  await this.save();
};

// Method to update business score after review changes
reviewSchema.methods.updateBusinessScore = async function (): Promise<void> {
  const Business = mongoose.model('Business');
  const business = await Business.findById(this.business);
  
  if (business && typeof business.updateSafetyScore === 'function') {
    await business.updateSafetyScore();
  }
};

// Post-save hook to update business safety score
reviewSchema.post('save', async function () {
  await this.updateBusinessScore();
});

// Post-remove hook to update business safety score
reviewSchema.post('remove', async function () {
  await this.updateBusinessScore();
});

// Export model
const Review = (mongoose.models.Review as ReviewModel) || 
  mongoose.model<IReview, ReviewModel>('Review', reviewSchema);

export default Review;
