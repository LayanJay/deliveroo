import { ArrowLeftIcon, FacebookIcon, HomeIcon, LogOutIcon, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google-icon.png';
import Button from '../components/button';
import Input from '../components/input';
import Layout from '../components/layout';
import { LoginFormValues } from '../definitions/interfaces/form-values';
import { useQuery } from '../hooks/use-query';
import { useAuthenticationStore } from '../store/authentication-store';

const LoginPage = () => {
  const signOut = useAuthenticationStore((state) => state.signOut);
  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);
  const getGoogleOAuthURL = useAuthenticationStore((state) => state.getGoogleOAuthURL);
  const signInWithEmail = useAuthenticationStore((state) => state.signInWithEmail);
  const navigate = useNavigate();
  const params = useQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<LoginFormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithEmail(data);
      reset();
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  });

  if (isAuthenticated) {
    return (
      <Layout>
        <div className='flex flex-col items-center justify-center max-w-xl mx-auto mt-4'>
          <h1 className='font-semibold text-2xl text-center text-slate-800 mb-2'>
            You are already logged in
          </h1>
          <p className='text-slate-600 mb-4'>You can go back to home or sign out</p>
          <div className='flex items-center space-x-3'>
            <Link
              to={'/'}
              className='hidden group sm:flex items-center space-x-3 border border-slate-200 py-2 px-3 rounded-md hover:border-slate-300 transition ease-in cursor-pointer'
            >
              <HomeIcon className='w-4 h-4 text-primary' />
              <p className='text-slate-700 cursor-pointer'>Go back to home</p>
            </Link>
            <button
              onClick={() => signOut()}
              className='hidden group sm:flex items-center space-x-3 border border-slate-200 py-2 px-3 rounded-md hover:border-slate-300 transition ease-in cursor-pointer'
            >
              <LogOutIcon className='w-4 h-4 text-primary' />
              <p className='text-slate-700 cursor-pointer'>Sign out</p>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (params.get('provider') === 'email') {
    return (
      <Layout>
        <div className='flex flex-col items-center justify-center max-w-2xl mx-auto mt-4'>
          <div className='w-full max-w-md'>
            <button
              className='flex items-center space-x-3 text-primary cursor-pointer mb-4'
              onClick={() => navigate('/login')}
            >
              <ArrowLeftIcon className='w-4 h-4 text-primary' />
              <span>Back</span>
            </button>
            <h1 className='font-semibold text-2xl text-slate-800 mb-6'>Sign up or log in</h1>
          </div>
          <form onSubmit={onSubmit} className='w-full max-w-md'>
            <Input
              label='Email address'
              name='email'
              type='email'
              register={register}
              placeholder='e.g. name@example.com'
              error={errors.email?.message}
              wrapperClassName='mb-4'
            />
            <Input
              label='Password'
              name='password'
              type='password'
              register={register}
              placeholder='e.g. ********'
              error={errors.email?.message}
              wrapperClassName='mb-6'
            />
            <Button type='submit' className='w-full mb-4' disabled={isSubmitting || !isDirty}>
              Continue
            </Button>
            <p className='text-sm text-slate-500 max-w-md'>
              Don't have an account?{' '}
              <Link to={'/register'} className='text-primary underline'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center max-w-2xl mx-auto mt-4'>
        <div className='w-full max-w-md'>
          <button
            className='flex items-center space-x-3 text-primary cursor-pointer mb-4'
            onClick={() => navigate('/')}
          >
            <ArrowLeftIcon className='w-4 h-4 text-primary' />
            <span>Back</span>
          </button>
          <h1 className='font-semibold text-2xl text-slate-800 mb-6'>Sign up or log in</h1>
        </div>
        <button className='flex items-center justify-center space-x-3 bg-blue-800/80 hover:bg-blue-800/70 font-semibold text-white px-4 py-3 rounded-md transition ease-in w-full max-w-md mb-4'>
          <FacebookIcon className='w-4 h-4 text-white' />
          <span>Continue with Facebook</span>
        </button>
        <a
          href={getGoogleOAuthURL()}
          className='flex items-center justify-center space-x-3 bg-white border border-slate-200 hover:border-slate-300 font-semibold text-slate-700 px-4 py-3 rounded-md transition ease-in w-full max-w-md mb-4'
        >
          <img className='w-4 h-4' src={googleLogo} alt='google icon' />
          <span>Continue with Google</span>
        </a>
        <div className='flex items-center space-x-3 w-full max-w-md mb-4'>
          <span className='border-t border-slate-200 w-full' />
          <p className='text-sm text-slate-600 text-center'>or</p>
          <span className='border-t border-slate-200 w-full' />
        </div>
        <button
          onClick={() => navigate('/login?provider=email')}
          className='flex items-center justify-center space-x-3 bg-primary hover:bg-primary/70 font-semibold text-white px-4 py-3 rounded-md transition ease-in w-full max-w-md mb-4'
        >
          <Mail className='w-4 h-4 text-white' />
          <span>Continue with email</span>
        </button>
        <p className='text-sm text-slate-500 max-w-md'>
          By continuing you agree to our{' '}
          <span className='text-primary underline cursor-pointer'>T&Cs</span>. Please also check out
          our <span className='text-primary underline cursor-pointer'>Privacy Policy</span>. We use
          your data to offer you a personalized experience and to better understand and improve our
          services.{' '}
          <span className='text-primary underline cursor-pointer'>
            For more information see here
          </span>
          .
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
