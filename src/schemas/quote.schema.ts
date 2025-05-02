import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Tag } from './tag.schema';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema()
export class Quote {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  source?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags?: Tag[];
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
