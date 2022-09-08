import {
  IsOptional,
  IsString,
  IsInt,
  IsArray,
  IsObject,
} from 'class-validator';

export class CreateNewsDto {
  @IsOptional()
  @IsString()
  created_at: null | string;

  @IsOptional()
  @IsString()
  title: null | string;

  @IsOptional()
  @IsString()
  url: null | string;

  @IsOptional()
  @IsString()
  author: null | string;

  @IsOptional()
  @IsInt()
  points: null | number;

  @IsOptional()
  @IsString()
  story_text: null | string;

  @IsOptional()
  @IsString()
  comment_text: null | string;

  @IsOptional()
  @IsInt()
  num_comments: null | number;

  @IsOptional()
  @IsInt()
  story_id: null | number;

  @IsOptional()
  @IsString()
  story_title: null | string;

  @IsOptional()
  @IsString()
  story_url: null | string;

  @IsOptional()
  @IsInt()
  parent_id: null | number;

  @IsOptional()
  @IsInt()
  created_at_i: null | number;

  @IsOptional()
  @IsArray()
  _tags: null | string[];

  @IsOptional()
  @IsString()
  objectID: null | string;

  @IsOptional()
  @IsObject()
  _highlightResult: null | any;
}
