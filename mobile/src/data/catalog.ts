import data from './products.json';
import type { Product } from '../state/model';
export const products: Product[] = data;
export const categories = ['All', ...new Set(products.map((p) => p.category))];
