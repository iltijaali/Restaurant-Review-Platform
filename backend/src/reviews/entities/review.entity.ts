import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  comment!: string;

  @Column()
  rating!: number;

  @Column({
    name: 'user_id',
  })
  userId!: number;

  @Column({
    name: 'restaurant_id',
  })
  restaurantId!: number;

  @ManyToOne(
    () => User,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @ManyToOne(
    () => Restaurant,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'restaurant_id',
  })
  restaurant!: Restaurant;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}