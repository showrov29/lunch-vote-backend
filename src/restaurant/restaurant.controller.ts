import { Controller, Get, Post, Body } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // Route to get all restaurants
  @Get()
  async getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  // Route to allow voting (you may need to adjust depending on your voting logic)
  @Post('vote')
  async voteForRestaurant(
    @Body('restaurantId') restaurantId: number,
    employee: any,
  ) {
    return this.restaurantService.vote();
  }

  // Route to get the daily winner
  @Get('winner')
  async getDailyWinner() {
    return this.restaurantService.getDailyWinner();
  }
}
