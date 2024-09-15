import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getRestaurants() {
    return this.prisma.restaurant.findMany({
      include: { packs: true },
    });
  }

  async vote() {
    // return this.prisma.vote.create({
    //   //   data: {
    //   //     restaurantId,
    //   //     employee,
    //   //   },
    // });
  }

  async getDailyWinner() {
    const today = new Date();
    return this.prisma.vote.groupBy({
      by: ['foodPackId'],
      where: {
        createdAt: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
          lt: new Date(today.setHours(24, 0, 0, 0)),
        },
      },
      _count: {
        foodPackId: true,
      },
      orderBy: {
        _count: {
          foodPackId: 'desc',
        },
      },
      take: 1,
    });
  }
}
