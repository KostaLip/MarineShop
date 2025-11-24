import { Category } from "./category";

export interface Product {
    productID?: number,
    category: Category,
    productName: string,
    description: string,
    price: number,
    stockQuantity: number,
    dateCreated: Date,
    displayImage: string,
    rating: number
}