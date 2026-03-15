import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Driver extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true, unique: true })
  licenseNumber: string;

  @Prop({ required: true, enum: ['available', 'busy', 'offline'], default: 'offline' })
  status: string;

  @Prop()
  currentLocation: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
