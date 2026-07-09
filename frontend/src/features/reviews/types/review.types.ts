export interface Review {
  id: number;
  rating: number;
  comment: string;

  userId: number;
  restaurantId: number;
  user?: {
    id: number;
    name?: string;
    email: string;
  };
  restaurant?: {
    id: number;
    title: string;
    cuisine?: string;
    location?: string;
  };

  createdAt: string;
}

export interface CreateReviewDto {
  rating: number;
  comment: string;
  restaurantId: number;
}
