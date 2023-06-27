import axios from 'axios';
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { Menu } from '../definitions/interfaces/menu';
import { fetchNewAccessToken } from '../utils/auth-utils';

interface MenuListStore {
  menus: Menu[];
  setMenus: (menus: Menu[]) => void;
  menuList: string[];
  setMenuList: (menuList: string[]) => void;
  selectedMenu: string | null;
  setSelectedMenu: (menu: string) => void;
  fetchMenuList: (args: { restaurantId: number }) => Promise<void>;
}

export const useMenuListStore = create<MenuListStore>((set, get) => ({
  menus: [],
  setMenus: (menus: Menu[]) => set({ menus }),
  menuList: [],
  setMenuList: (menuList: string[]) => set({ menuList }),
  selectedMenu: null,
  setSelectedMenu: (menu: string) => {
    set({ selectedMenu: menu });
  },
  fetchMenuList: async (args: { restaurantId: number }) => {
    try {
      const { restaurantId } = args;
      const response = await axios.get<Menu[]>(`http://localhost:4000/menus/${restaurantId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });

      const menus = response.data;
      get().setMenus(menus);
      get().setMenuList(menus.map((menu) => menu.categoryName));
    } catch (error: any) {
      if (error.response.status === 403) {
        // 403 means access token has expired. Fetch new access token and retry.
        await fetchNewAccessToken();
        await get().fetchMenuList({ restaurantId: args.restaurantId });
      } else {
        throw new Error('Error fetching menu list');
      }
    }
  },
}));
