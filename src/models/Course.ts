import mongoose, { Document, Model } from 'mongoose';

interface ILesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  thumbnail?: string;
  order: number;
}

interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail: string;
  category: mongoose.Types.ObjectId;
  lessons: ILesson[];
  promoCode?: string;
  isPublished: boolean;
}

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название урока обязательно'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Описание урока обязательно'],
  },
  videoUrl: {
    type: String,
    required: [true, 'URL видео обязателен'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность урока обязательна'],
  },
  thumbnail: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название курса обязательно'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Описание курса обязательно'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Обложка курса обязательна'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Категория курса обязательна'],
  },
  lessons: [lessonSchema],
  promoCode: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export default Course; 