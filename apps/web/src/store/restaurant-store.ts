import axios from 'axios';
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { Restaurant } from '../definitions/interfaces/restaurant';
import { fetchNewAccessToken } from '../utils/auth-utils';

interface RestaurantStore {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  fetchRestaurants: () => Promise<void>;
  fetchRestaurantDetails: (args: { restaurantId: number }) => Promise<Restaurant>;
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  restaurants: [],
  setRestaurants: (restaurants: Restaurant[]) => set({ restaurants }),
  fetchRestaurants: async () => {
    try {
      const response = await axios.get<Restaurant[]>('http://localhost:4000/restaurants', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });

      const restaurants = response.data;
      get().setRestaurants(restaurants);
    } catch (error: any) {
      if (error.response.status === 403) {
        // 403 means access token has expired. Fetch new access token and retry.
        await fetchNewAccessToken();
        await get().fetchRestaurants();
      } else {
        throw new Error('Error fetching restaurants');
      }
    }
  },
  fetchRestaurantDetails: async (args: { restaurantId: number }): Promise<Restaurant> => {
    const { restaurantId } = args;
    try {
      const response = await axios.get<Restaurant>(
        `http://localhost:4000/restaurants/${restaurantId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response.status === 403) {
        // 403 means access token has expired. Fetch new access token and retry.
        await fetchNewAccessToken();
        return await get().fetchRestaurantDetails({ restaurantId: args.restaurantId });
      } else {
        throw new Error('Error fetching restaurant details');
      }
    }
  },
}));
