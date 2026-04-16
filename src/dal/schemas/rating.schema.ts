import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rating extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Ride', required: true })
  rideId!: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  score!: number;

  @Prop()
  comment!: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
