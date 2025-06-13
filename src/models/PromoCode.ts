import mongoose, { Document, Model } from 'mongoose';

interface IPromoCode extends Document {
  code: string;
  courseId: mongoose.Types.ObjectId;
  expiresAt?: Date;
  maxUses?: number;
  usedCount: number;
}

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Код промокода обязателен'],
    unique: true,
    trim: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'ID курса обязателен'],
  },
  expiresAt: {
    type: Date,
  },
  maxUses: {
    type: Number,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Метод для проверки валидности промокода
promoCodeSchema.methods.isValid = function(): boolean {
  if (this.expiresAt && new Date() > this.expiresAt) {
    return false;
  }
  if (this.maxUses && this.usedCount >= this.maxUses) {
    return false;
  }
  return true;
};

const PromoCode: Model<IPromoCode> = mongoose.models.PromoCode || mongoose.model<IPromoCode>('PromoCode', promoCodeSchema);

export default PromoCode; 