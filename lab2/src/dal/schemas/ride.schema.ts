import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Ride extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Passenger', required: true })
  passengerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driverId: Types.ObjectId;

  @Prop({ required: true })
  startPoint: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'] })
  status: string;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
