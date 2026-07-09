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

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    name: 'preview_image',
  })
  previewImage!: string;

  @Column()
  location!: string;

  @Column({
    type: 'text',
  })
  description!: string;

  @Column()
  cuisine!: string;

  @Column({
    name: 'average_rating',
    type: 'decimal',
    precision: 2,
    scale: 1,
    default: 0,
  })
  averageRating!: number;

  @Column({
    name: 'owner_id',
  })
  ownerId!: number;

  @ManyToOne(
    () => User,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'owner_id',
  })
  owner!: User;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}