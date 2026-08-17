import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OutletsService } from './outlets.service';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action, AppAbility } from '../casl/casl-ability.factory';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('outlets')
export class OutletsController {
  constructor(private readonly outletsService: OutletsService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Outlet'))
  create(@Body() createOutletDto: CreateOutletDto) {
    return this.outletsService.create(createOutletDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Outlet'))
  findAll() {
    // In a real app, you might want to filter this by user.outletId if they are not OWNER.
    // Since prisma logic is in service, we'll keep it simple here.
    return this.outletsService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'Outlet'))
  findOne(@Param('id') id: string) {
    return this.outletsService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'Outlet'))
  update(@Param('id') id: string, @Body() updateOutletDto: UpdateOutletDto) {
    return this.outletsService.update(+id, updateOutletDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'Outlet'))
  remove(@Param('id') id: string) {
    return this.outletsService.remove(+id);
  }
}
