import { ShoppingBagIcon } from 'lucide-react';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { useMenuListStore } from '../../store/menu-list-store';
import Button from '../button';
import MenuCard from './menu-card';

const MenuList = () => {
  const [menus, fetchMenuList, menuList, selectedMenu, setSelectedMenu] = useMenuListStore(
    (s) => [s.menus, s.fetchMenuList, s.menuList, s.selectedMenu, s.setSelectedMenu],
    shallow
  );

  useEffect(() => {
    // NOTE: I have used restaurantId: 1 just for the demonstration.
    // I would like to use a library like react-query or SWR to handle the data fetching.
    fetchMenuList({ restaurantId: 1 });
  }, []);

  return (
    <>
      <div className='sticky top-16 md:top-[70px] z-40 bg-white flex items-center space-x-3 overflow-x-auto hide-scrollbar border-t border-slate-200 py-5 px-4 sm:px-6 md:px-14 -mx-4 sm:-mx-6 md:-mx-14 shadow-md shadow-slate-100 scroll-smooth'>
        {menuList.map((item, index) => (
          <a
            href={`#${item}`}
            onClick={() => setSelectedMenu(item)}
            key={`${item}-${index}`}
            className={`${
              (selectedMenu === null && index === 0) || selectedMenu === item
                ? 'bg-primary text-white font-semibold'
                : 'text-primary'
            } text-sm whitespace-nowrap px-4 py-0.5 rounded-full`}
          >
            {item}
          </a>
        ))}
      </div>
      <div className='bg-gray-100/80 px-4 sm:px-10 md:px-16 -mx-4 sm:-mx-6 md:-mx-14 py-4'>
        <p className='text-sm text-slate-500 mb-4'>Adults need around 2000 kcal a day</p>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
          <div className='col-span-1 lg:col-span-3'>
            {menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-col lg:items-center lg:justify-center max-h-52 sticky lg:top-44 z-40 bg-white rounded-sm shadow-sm p-4'>
            <div className='flex flex-1 flex-col items-center justify-center w-full'>
              <ShoppingBagIcon size={32} className='text-slate-400 mb-3' />
              <p className='text-slate-400'>Your basket is empty</p>
            </div>
            <Button className='w-full' disabled>
              Go to checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuList;
