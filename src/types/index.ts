export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  favorites: string[];
  watchHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  lessons: Lesson[];
  promoCode?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  thumbnail?: string;
  order: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoCode {
  _id: string;
  code: string;
  courseId: string;
  expiresAt?: Date;
  maxUses?: number;
  usedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
} 