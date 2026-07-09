import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { QueryRestaurantDto } from './dto/query-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
    ownerId: number,
  ) {
    const restaurant =
      this.restaurantsRepository.create({
        ...createRestaurantDto,
        ownerId,
      });

    return this.restaurantsRepository.save(
      restaurant,
    );
  }
  async findAll(
  queryDto: QueryRestaurantDto,
) {
  const {
    page = 1,
    limit = 10,
    cuisine,
    minRating,
    search,
    sortBy = 'averageRating',
    order = 'DESC',
  } = queryDto;

  const query =
    this.restaurantsRepository.createQueryBuilder(
      'restaurant',
    );

  query.leftJoinAndSelect(
    'restaurant.owner',
    'owner',
  );

  if (cuisine) {
    query.andWhere(
      'LOWER(restaurant.cuisine) LIKE LOWER(:cuisine)',
      {
        cuisine: `%${cuisine}%`,
      },
    );
  }

  if (minRating) {
    query.andWhere(
      'restaurant.averageRating >= :minRating',
      {
        minRating,
      },
    );
  }

  if (search) {
    query.andWhere(
      '(LOWER(restaurant.title) LIKE LOWER(:search) OR LOWER(restaurant.location) LIKE LOWER(:search))',
      {
        search: `%${search}%`,
      },
    );
  }

  query.orderBy(
    `restaurant.${sortBy}`,
    order,
  );

  query.skip((page - 1) * limit);

  query.take(limit);

  const [restaurants, total] =
    await query.getManyAndCount();

  return {
    data: restaurants,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(
        total / limit,
      ),
    },
  };
}
  async findOne(id: number) {
    const restaurant =
      await this.restaurantsRepository.findOne({
        where: {
          id,
        },
        relations: {
          owner: true,
        },
      });

    if (!restaurant) {
      throw new NotFoundException(
        'Restaurant not found',
      );
    }

    return restaurant;
  }

  async findMyRestaurants(
    ownerId: number,
  ) {
    return this.restaurantsRepository.find({
      where: {
        ownerId,
      },
    });
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
    ownerId: number,
  ) {
    const restaurant =
      await this.findOne(id);

    if (restaurant.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You can only update your own restaurants',
      );
    }

    Object.assign(
      restaurant,
      updateRestaurantDto,
    );

    return this.restaurantsRepository.save(
      restaurant,
    );
  }

  async remove(
    id: number,
    ownerId: number,
  ) {
    const restaurant =
      await this.findOne(id);

    if (restaurant.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You can only delete your own restaurants',
      );
    }

    await this.restaurantsRepository.remove(
      restaurant,
    );

    return {
      message:
        'Restaurant deleted successfully',
    };
  }

    


}