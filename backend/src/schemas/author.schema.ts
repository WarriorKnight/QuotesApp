import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop()
  bio?: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  deathDate?: Date;

  @Prop()
  Country?: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
