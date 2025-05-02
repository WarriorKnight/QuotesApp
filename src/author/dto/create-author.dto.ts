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
  readonly birthDate?: string; // Use string for DTO input, can be transformed to Date in service

  @IsDateString()
  @IsOptional()
  readonly deathDate?: string; // Use string for DTO input, can be transformed to Date in service
}
