import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costPrice: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sellPrice: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @Type(() => Number)
  @IsNumber()
  outletId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
