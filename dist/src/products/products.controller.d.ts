import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly cloudinaryService;
    constructor(productsService: ProductsService, cloudinaryService: CloudinaryService);
    create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        outletId: number;
    }>;
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        outletId: number;
    }[]>;
    findOne(id: string): Promise<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        outletId: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        outletId: number;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ProductClient<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        outletId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
