import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Passenger extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  phone!: string;

  @Prop({ default: 0 })
  rating!: number;

  @Prop({ required: true })
  paymentMethod!: string;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
