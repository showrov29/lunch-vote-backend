import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getRestaurants() {
    const restaurants = await this.prisma.restaurant.findMany({
      include: {
        packs: {
          include: {
            votes: true, // Include votes for each food pack
          },
        },
      },
    });

    // Calculate total votes for each restaurant
    return restaurants.map((restaurant) => {
      const totalVotes = restaurant.packs.reduce((sum, pack) => {
        return sum + pack.votes.length; // Count the number of votes for each food pack
      }, 0);

      return {
        ...restaurant,
        totalVotes, // Add total votes to the restaurant object
      };
    });
  }

  async castVote(foodPackId: number, employee: string) {
    // Create a new vote entry
    const newVote = await this.prisma.vote.create({
      data: {
        foodPackId,
        employee,
      },
    });

    // Optionally, return the updated food pack with vote count
    const updatedFoodPack = await this.prisma.foodPack.findUnique({
      where: { id: foodPackId },
      include: { votes: true }, // Include votes to get the count
    });

    return { newVote, voteCount: updatedFoodPack.votes.length };
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
