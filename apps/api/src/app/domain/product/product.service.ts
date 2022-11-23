import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
@Injectable()
export class ProductService {
    private readonly products: Product[] = [];
        
  getProducts(): string {
    return 'This action returns all products';
  }
}
