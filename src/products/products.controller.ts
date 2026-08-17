import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action, AppAbility } from '../casl/casl-ability.factory';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Product'))
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl = null;
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file, 'posify-products');
      imageUrl = uploadResult.secure_url;
    }
    
    return this.productsService.create({
      sku: createProductDto.sku,
      name: createProductDto.name,
      costPrice: Number(createProductDto.costPrice),
      sellPrice: Number(createProductDto.sellPrice),
      stock: Number(createProductDto.stock),
      outletId: Number(createProductDto.outletId),
      isActive: createProductDto.isActive !== undefined ? String(createProductDto.isActive) === 'true' : true,
      imageUrl
    } as any);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Product'))
  findAll(@CurrentUser() user: any) {
    // If not OWNER, filter by user.outletId
    const filterOutletId = user.role === 'OWNER' ? undefined : user.outletId;
    return this.productsService.findAll(filterOutletId);
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Product'))
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Product'))
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl = undefined;
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file, 'posify-products');
      imageUrl = uploadResult.secure_url;
    }

    const dataToUpdate: any = {};
    if (updateProductDto.sku !== undefined) dataToUpdate.sku = updateProductDto.sku;
    if (updateProductDto.name !== undefined) dataToUpdate.name = updateProductDto.name;
    if (updateProductDto.costPrice !== undefined) dataToUpdate.costPrice = Number(updateProductDto.costPrice);
    if (updateProductDto.sellPrice !== undefined) dataToUpdate.sellPrice = Number(updateProductDto.sellPrice);
    if (updateProductDto.stock !== undefined) dataToUpdate.stock = Number(updateProductDto.stock);
    if (updateProductDto.outletId !== undefined) dataToUpdate.outletId = Number(updateProductDto.outletId);
    if (updateProductDto.isActive !== undefined) dataToUpdate.isActive = String(updateProductDto.isActive) === 'true';
    if (imageUrl) dataToUpdate.imageUrl = imageUrl;

    return this.productsService.update(+id, dataToUpdate);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Product'))
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
