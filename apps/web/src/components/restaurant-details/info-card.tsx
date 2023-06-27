import { ChevronRightIcon, LucideIcon } from 'lucide-react';

type Props = {
  MainIcon: LucideIcon;
  title: string;
  subtitle: string;
};

const InfoCard = (props: Props) => {
  return (
    <div className='flex items-center space-x-3 w-full mb-2 sm:mb-4 cursor-pointer'>
      <props.MainIcon className='w-5 h-5 text-gray-400' />
      <div className='flex items-center justify-between md:justify-start md:space-x-4 w-full'>
        <div>
          <p className='text-slate-800'>{props.title}</p>
          <p className='text-slate-500 text-sm'>{props.subtitle}</p>
        </div>
        <ChevronRightIcon className='w-6 h-6 text-primary' />
      </div>
    </div>
  );
};

export default InfoCard;
