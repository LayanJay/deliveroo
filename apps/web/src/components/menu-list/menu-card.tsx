import { Menu } from '../../definitions/interfaces/menu';
import DishCard from './dish-card';

type Props = {
  menu: Menu;
};

const MenuCard = (props: Props) => {
  return (
    <div id={props.menu.categoryName} className='scroll-mt-36 md:scroll-mt-[156px] mb-6'>
      <h3 className='font-bold text-lg capitalize mb-3'>{props.menu.categoryName}</h3>
      <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {props.menu.Dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
