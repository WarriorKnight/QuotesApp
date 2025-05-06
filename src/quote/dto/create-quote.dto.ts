import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsArray,
} from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsMongoId()
  // @IsNotEmpty()
  @IsOptional()
  readonly author: string;

  @IsString()
  @IsOptional()
  readonly source?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly tags?: string[];
}
