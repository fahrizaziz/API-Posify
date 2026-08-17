import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OutletsService {
  constructor(private prisma: PrismaService) {}

  create(createOutletDto: CreateOutletDto) {
    return this.prisma.outlet.create({ data: createOutletDto });
  }

  findAll() {
    return this.prisma.outlet.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const outlet = await this.prisma.outlet.findUnique({ where: { id } });
    if (!outlet) throw new NotFoundException('Outlet not found');
    return outlet;
  }

  update(id: number, updateOutletDto: UpdateOutletDto) {
    return this.prisma.outlet.update({
      where: { id },
      data: updateOutletDto,
    });
  }

  remove(id: number) {
    return this.prisma.outlet.delete({ where: { id } });
  }
}
