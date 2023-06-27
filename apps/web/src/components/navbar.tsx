import { HomeIcon, MenuIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-teal.svg';
import { useAuthenticationStore } from '../store/authentication-store';
import { checkCurrentAccessToken } from '../utils/auth-utils';

const Navbar = () => {
  const pathname = window.location.pathname;
  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkCurrentAccessToken();
  }, [pathname]);

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-white/20 shadow-sm md:mb-3'>
      <nav className='flex items-center justify-between px-4 py-3 md:px-14 md:py-3.5'>
        <div className='flex-1 flex-shrink-0'>
          <Link to={'/'}>
            <img className='w-32 min-w-[128px] cursor-pointer' src={logo} alt='logo' />
          </Link>
        </div>
        {/* Non-mobile */}
        <fieldset className='relative hidden md:flex md:items-center md:justify-center md:w-full md:max-w-lg mx-3'>
          <span className='absolute left-4'>
            <SearchIcon className='w-4 h-4 text-slate-400' />
          </span>
          <input
            className='text-slate-600 border-slate-200 focus:border-primary placeholder:text-slate-400 border rounded-lg block w-full max-w-xl p-2 pl-10 outline-none transition ease-in'
            type='search'
            placeholder='Search for restaurants, dishes, or cuisines'
          />
        </fieldset>
        {/* Mobile */}
        <fieldset className='relative flex md:hidden items-center justify-center w-10 mr-3'>
          <span className='absolute left-4'>
            <SearchIcon className='w-5 h-5 text-primary' />
          </span>
          <input
            className='text-slate-600 border-slate-200 focus:border-primary placeholder:text-slate-400 border rounded-lg block w-10 px-3 py-2 pl-10 outline-none transition ease-in'
            type='search'
          />
        </fieldset>
        <ul className='flex items-center space-x-3'>
          {!isAuthenticated && pathname !== '/login' ? (
            <Link
              to={'login'}
              className='hidden group sm:flex items-center space-x-3 border border-slate-200 py-2 px-3 rounded-md hover:border-slate-300 transition ease-in cursor-pointer'
            >
              <HomeIcon className='w-4 h-4 text-primary' />
              <p className='text-slate-700 cursor-pointer'>Sign up or login</p>
            </Link>
          ) : null}
          <li className='hidden group sm:flex items-center space-x-3 border border-slate-200 py-2 px-3 rounded-md hover:border-slate-300 transition ease-in cursor-pointer'>
            <ShoppingBagIcon className='w-4 h-4 text-primary' />
            <p className='text-slate-700 cursor-pointer'>￡0.00</p>
          </li>
          <li className='group flex items-center space-x-3 border border-slate-200 py-2 px-3 rounded-md hover:border-slate-300 transition ease-in cursor-pointer'>
            <MenuIcon className='w-4 h-4 text-primary' />
            <p className='text-slate-700 cursor-pointer'>Menu</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
