import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly bio?: string;

  @IsDateString()
  @IsOptional()
  readonly birthDate?: string;

  @IsDateString()
  @IsOptional()
  readonly deathDate?: string;
}
