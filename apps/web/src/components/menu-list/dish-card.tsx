import { truncate } from 'lodash';
import { Dish } from '../../definitions/interfaces/dish';

type Props = {
  dish: Dish;
};

const DishCard = (props: Props) => {
  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 bg-white border-b border-slate-100 p-4 md:m-0 ${
        !props.dish.isAvailable ? 'opacity-40' : 'cursor-pointer'
      } rounded-sm sm:shadow`}
    >
      <div className='col-span-2 sm:col-span-3 md:col-span-5'>
        <h4 className='font-bold capitalize mb-1'>{props.dish.dishName}</h4>
        <p className='text-sm text-slate-500 mb-1'>
          {truncate(props.dish.description, { length: 50 })}
        </p>
        <p className='text-sm text-slate-500 md:text-slate-600'>
          {props.dish.calories.toFixed(2)} kcal
        </p>
        <p className='text-sm text-slate-500 md:text-slate-600'>￡{props.dish.price.toFixed(2)}</p>
      </div>
      <div className='col-span-1 md:col-span-2 flex items-center justify-center w-full h-full'>
        <img
          className='object-cover rounded-md w-24 h-24 md:w-28 md:h-28'
          src={props.dish.image}
          alt={props.dish.dishName}
        />
      </div>
    </div>
  );
};

export default DishCard;
