export interface RestaurantOwner {
  id: number;
  name: string;
  email: string;
  role: "owner" | "reviewer";
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  id: number;
  title: string;
  previewImage: string;
  location: string;
  description: string;
  cuisine: string;
  averageRating: string;
  ownerId: number;
  owner: RestaurantOwner;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RestaurantResponse {
  data: Restaurant[];
  meta: RestaurantMeta;
}

export interface RestaurantQueryParams {
  page?: number;
  limit?: number;
  cuisine?: string;
  minRating?: number;
  search?: string;
  order?: "ASC" | "DESC";
  sortBy?: string;
}

export interface CreateRestaurantDto {
  title: string;
  previewImage: string;
  location: string;
  description: string;
  cuisine: string;
}

export interface UpdateRestaurantDto
  extends Partial<CreateRestaurantDto> {}