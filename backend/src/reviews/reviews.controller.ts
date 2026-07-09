import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body()
    createReviewDto: CreateReviewDto,
    @Req() req,
  ) {
    return this.reviewsService.create(
      createReviewDto,
      req.user.id,
    );
  }

  @Get('restaurant/:restaurantId')
  findRestaurantReviews(
    @Param(
      'restaurantId',
      ParseIntPipe,
    )
    restaurantId: number,
  ) {
    return this.reviewsService.findRestaurantReviews(
      restaurantId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', ParseIntPipe)
    id: number,
    @Req() req,
  ) {
    return this.reviewsService.remove(
      id,
      req.user.id,
    );
  }
}