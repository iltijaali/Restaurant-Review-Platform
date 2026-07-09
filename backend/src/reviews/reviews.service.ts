import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './entities/review.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,

    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
  ) {
    const restaurant =
      await this.restaurantsRepository.findOne({
        where: {
          id: createReviewDto.restaurantId,
        },
      });

    if (!restaurant) {
      throw new NotFoundException(
        'Restaurant not found',
      );
    }

    const existingReview =
      await this.reviewsRepository.findOne({
        where: {
          userId,
          restaurantId:
            createReviewDto.restaurantId,
        },
      });

    if (existingReview) {
      throw new BadRequestException(
        'You already reviewed this restaurant',
      );
    }

    const review =
      this.reviewsRepository.create({
        ...createReviewDto,
        userId,
      });

    const savedReview =
      await this.reviewsRepository.save(
        review,
      );

    await this.updateAverageRating(
      createReviewDto.restaurantId,
    );

    return savedReview;
  }

  async findRestaurantReviews(
    restaurantId: number,
  ) {
    return this.reviewsRepository.find({
      where: {
        restaurantId,
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateAverageRating(
    restaurantId: number,
  ) {
    const reviews =
      await this.reviewsRepository.find({
        where: {
          restaurantId,
        },
      });

    const total =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0,
      );

    const average =
      reviews.length === 0
        ? 0
        : total / reviews.length;

    await this.restaurantsRepository.update(
      restaurantId,
      {
        averageRating:
          Number(average.toFixed(1)),
      },
    );
  }

  async remove(
    id: number,
    userId: number,
  ) {
    const review =
      await this.reviewsRepository.findOne({
        where: {
          id,
        },
      });

    if (!review) {
      throw new NotFoundException(
        'Review not found',
      );
    }

    if (review.userId !== userId) {
      throw new BadRequestException(
        'You can only delete your own review',
      );
    }

    const restaurantId =
      review.restaurantId;

    await this.reviewsRepository.remove(
      review,
    );

    await this.updateAverageRating(
      restaurantId,
    );

    return {
      message:
        'Review deleted successfully',
    };
  }
}