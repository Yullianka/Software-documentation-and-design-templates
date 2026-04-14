import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Ride', required: true })
  rideId!: Types.ObjectId;

  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true, enum: ['pending', 'completed', 'failed', 'refunded'] })
  status!: string;

  @Prop({ required: true })
  paymentMethod!: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
