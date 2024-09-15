import { RestaurantService } from './restaurant/restaurant.service';
import { Module } from '@nestjs/common';

import { RestaurantModule } from './restaurant/restaurant.module';
// import { RestaurantController } from './restaurant/restaurant.controller';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [RestaurantModule],
  // controllers: [RestaurantService, PrismaService],
  // providers: [RestaurantService, PrismaService],
})
export class AppModule {}
