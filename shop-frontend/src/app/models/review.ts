import { Product } from "./product";
import { User } from "./user";

export interface Review {
    reviewId: number,
    user: User,
    product: Product,
    rating: number,
    reviewComment: string,
    dateCreated: Date
}