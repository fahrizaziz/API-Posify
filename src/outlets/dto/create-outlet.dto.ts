import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateOutletDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
