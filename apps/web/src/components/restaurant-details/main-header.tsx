import { ArrowLeftIcon, InfoIcon, ShoppingBagIcon, StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Restaurant } from '../../definitions/interfaces/restaurant';
import { useRestaurantStore } from '../../store/restaurant-store';
import InfoCard from './info-card';

const MainHeader = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const fetchRestaurantDetails = useRestaurantStore((s) => s.fetchRestaurantDetails);

  useEffect(() => {
    // NOTE: I have used restaurantId: 1 just for the demonstration.
    // I would like to use a library like react-query or SWR to handle the data fetching.
    fetchRestaurantDetails({ restaurantId: 1 }).then((res) => {
      setRestaurant(res);
    });
  }, []);

  return (
    <>
      <button className='flex items-center space-x-3 text-primary cursor-pointer mb-4'>
        <ArrowLeftIcon className='w-4 h-4 text-primary' />
        <span>Back</span>
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-8 gap-3 pb-4 -mx-4 sm:m-0 mb-3'>
        {/* row 1 */}
        <div className='sm:col-span-1 md:col-span-2 w-full'>
          <img
            className='w-full h-56 sm:h-full md:aspect-video md:h-72 object-cover sm:rounded-md'
            src={restaurant?.image}
            alt={restaurant?.name}
          />
        </div>
        {/* row 2 */}
        <div className='sm:col-span-2 md:col-span-4 px-4'>
          <h1 className='text-2xl md:text-4xl font-bold capitalize mb-1 md:mb-2'>
            {restaurant?.name}
          </h1>
          <div className='mb-3'>
            <p className='text-slate-800 md:mb-2'>{['Salads', 'Healthy', 'Vegan'].join('・')}</p>
            <p className='text-slate-600 md:mb-2'>
              Opens at {restaurant?.openingHours} and closes at {restaurant?.closingHours}
              <span className='hidden md:inline-block'>
                ・ Delivery ￡
                {restaurant?.deliveryFee ? Math.round(restaurant?.deliveryFee).toFixed(2) : ''} ・
                ￡
                {restaurant?.minimumOrderValue
                  ? Math.round(restaurant!.minimumOrderValue).toFixed(2)
                  : ''}{' '}
                minimum
              </span>
            </p>
            <p className='md:hidden text-slate-600'>
              Delivery ￡
              {restaurant?.deliveryFee ? Math.round(restaurant?.deliveryFee).toFixed(2) : ''} ・ ￡
              {restaurant?.minimumOrderValue
                ? Math.round(restaurant!.minimumOrderValue).toFixed(2)
                : ''}{' '}
              minimum
            </p>
          </div>
          <InfoCard MainIcon={InfoIcon} title='Info' subtitle='Map, allergens and hygiene rating' />
          <InfoCard MainIcon={StarIcon} title='4.7 Excellent' subtitle='See all 500 reviews' />
          <div className='flex md:hidden items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <ShoppingBagIcon className='w-5 h-6 text-primary' />
              <p className='text-slate-600'>Delivery</p>
            </div>
            <p className='text-primary cursor-pointer'>Change</p>
          </div>
        </div>
        {/* row 3 */}
        <div className='md:col-span-2 hidden md:flex items-start justify-between px-4'>
          <div className='flex items-center space-x-3'>
            <ShoppingBagIcon className='w-5 h-6 text-primary' />
            <p className='text-slate-600'>
              Delivery <span className='hidden lg:inline-block'>in 20 -35 min</span>
            </p>
          </div>
          <p className='text-primary cursor-pointer'>Change</p>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
