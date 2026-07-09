import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { Query } from '@nestjs/common';
import { QueryRestaurantDto } from './dto/query-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  create(
    @Body()
    createRestaurantDto: CreateRestaurantDto,
    @Req() req,
  ) {
    return this.restaurantsService.create(
      createRestaurantDto,
      req.user.id,
    );
  }

 @Get()
findAll(
  @Query()
  queryDto: QueryRestaurantDto,
) {
  return this.restaurantsService.findAll(
    queryDto,
  );
}

  @Get('my-restaurants')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  findMyRestaurants(
    @Req() req,
  ) {
    return this.restaurantsService.findMyRestaurants(
      req.user.id,
    );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.restaurantsService.findOne(
      id,
    );
  }

  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateRestaurantDto: UpdateRestaurantDto,
    @Req() req,
  ) {
    return this.restaurantsService.update(
      id,
      updateRestaurantDto,
      req.user.id,
    );
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.OWNER)
  remove(
    @Param('id', ParseIntPipe)
    id: number,
    @Req() req,
  ) {
    return this.restaurantsService.remove(
      id,
      req.user.id,
    );
  }
}