import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  bio?: string;
  pronouns?: string;
  identities?: string[];
  accessibilityNeeds?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  verified: boolean;
  role: 'user' | 'moderator' | 'admin';
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    communityUpdates: boolean;
    newReviews: boolean;
    safetyAlerts: boolean;
  };
  privacy?: {
    showEmail: boolean;
    showLocation: boolean;
    showIdentities: boolean;
  };
  savedBusinesses?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  toPublicJSON(): Partial<IUser>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't include password in queries by default
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    pronouns: {
      type: String,
      maxlength: [50, 'Pronouns cannot exceed 50 characters'],
    },
    identities: {
      type: [String],
      default: [],
    },
    accessibilityNeeds: {
      type: [String],
      default: [],
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      communityUpdates: { type: Boolean, default: true },
      newReviews: { type: Boolean, default: true },
      safetyAlerts: { type: Boolean, default: true },
    },
    privacy: {
      showEmail: { type: Boolean, default: false },
      showLocation: { type: Boolean, default: true },
      showIdentities: { type: Boolean, default: true },
    },
    savedBusinesses: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public user data (without sensitive info)
userSchema.methods.toPublicJSON = function (): Partial<IUser> {
  const obj = this.toObject();
  delete obj.password;
  
  if (!obj.privacy?.showEmail) delete obj.email;
  if (!obj.privacy?.showLocation) delete obj.location;
  if (!obj.privacy?.showIdentities) delete obj.identities;
  
  return obj;
};

// Export model
const User = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
