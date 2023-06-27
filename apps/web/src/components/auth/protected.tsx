import { HomeIcon } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticationStore } from '../../store/authentication-store';

type Props = {
  children: ReactNode;
};

const Protected = (props: Props) => {
  const checkCurrentAccessToken = useAuthenticationStore((state) => state.checkCurrentAccessToken);
  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkCurrentAccessToken();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col items-center justify-center max-w-xl mx-auto'>
        <h1 className='font-semibold text-2xl text-center text-slate-800 mb-2'>
          Your session has been expired or you are not authorized to see this content
        </h1>
        <p className='text-slate-600 mb-4'>Please login or sign up to see the content</p>
        <div>
          <Link
            to={'login'}
            className='group flex items-center space-x-3 border border-slate-200 py-2 px-3 rounded-md hover:border-slate-300 transition ease-in cursor-pointer'
          >
            <HomeIcon className='w-4 h-4 text-primary' />
            <p className='text-slate-700 cursor-pointer'>Sign up or login</p>
          </Link>
        </div>
      </div>
    );
  }

  return <div>{props.children}</div>;
};

export default Protected;
