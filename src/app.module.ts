import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { SyncModule } from './sync/sync.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule, SyncModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
