import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Car extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driverId: Types.ObjectId;

  @Prop({ required: true })
  carModel: string;

  @Prop({ required: true, unique: true })
  plateNumber: string;

  @Prop({ required: true, enum: ['active', 'maintenance', 'inactive'], default: 'active' })
  status: string;

  @Prop()
  location: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
