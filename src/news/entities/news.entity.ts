import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop()
  created_at: null | string;

  @Prop()
  title: null | string;

  @Prop()
  url: null | string;

  @Prop()
  author: null | string;

  @Prop()
  points: null | number;

  @Prop()
  story_text: null | string;

  @Prop()
  comment_text: null | string;

  @Prop()
  num_comments: null | number;

  @Prop()
  story_id: null | number;

  @Prop()
  story_title: null | string;

  @Prop()
  story_url: null | string;

  @Prop()
  parent_id: null | number;

  @Prop()
  created_at_i: null | number;

  @Prop()
  _tags: null | string[];

  @Prop({ unique: true, required: true })
  objectID: string;

  @Prop({ type: Object })
  _highlightResult: null | any;
}

export const NewsSchema = SchemaFactory.createForClass(News);
