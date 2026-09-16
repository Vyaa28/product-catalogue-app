import { ReviewEntity } from "./ReviewEntity";

export interface ProductEntity {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  weight: number;
  availabilityStatus: string;
  reviews: ReviewEntity[];
  thumbnail: string;
  imageUrl: string;
}