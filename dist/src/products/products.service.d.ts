import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        outletId: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(outletId?: number): import("@prisma/client").Prisma.PrismaPromise<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        outletId: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        outletId: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        outletId: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__ProductClient<{
        sku: string;
        name: string;
        costPrice: import("@prisma/client/runtime/library").Decimal;
        sellPrice: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        outletId: number;
        isActive: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
