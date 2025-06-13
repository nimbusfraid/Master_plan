import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  avatar?: string;
  favorites: mongoose.Types.ObjectId[];
  watchHistory: mongoose.Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    minlength: [8, 'Пароль должен содержать минимум 8 символов'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  watchHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true,
});

// Хэширование пароля перед сохранением
userSchema.pre('save', async function(this: IUser, next: () => void) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// Метод для проверки пароля
userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 