import { Dish } from './dish';

export interface Menu {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  isAvailable: boolean;
  Dishes: Dish[];
}
