import { ArrowLeftIcon, HomeIcon, LogOutIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button';
import Input from '../components/input';
import Layout from '../components/layout';
import { RegisterFormValues } from '../definitions/interfaces/form-values';
import { useAuthenticationStore } from '../store/authentication-store';

const RegisterPage = () => {
  const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);
  const signUpWithEmail = useAuthenticationStore((state) => state.signUpWithEmail);
  const signOut = useAuthenticationStore((state) => state.signOut);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<RegisterFormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUpWithEmail(data);
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

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center max-w-2xl mx-auto mt-4'>
        <div className='w-full max-w-md'>
          <button
            className='flex items-center space-x-3 text-primary cursor-pointer mb-4'
            onClick={() => navigate('/login?provider=email')}
          >
            <ArrowLeftIcon className='w-4 h-4 text-primary' />
            <span>Back</span>
          </button>
          <h1 className='font-semibold text-2xl text-slate-800 mb-6'>Sign up or log in</h1>
        </div>
        <form onSubmit={onSubmit} className='w-full max-w-md'>
          <div className='flex items-center space-x-3 mb-4'>
            <Input
              label='First name'
              name='firstName'
              type='text'
              register={register}
              placeholder='e.g. John'
              error={errors.firstName?.message}
            />
            <Input
              label='Last name'
              name='lastName'
              type='text'
              register={register}
              placeholder='e.g. Doe'
              error={errors.lastName?.message}
            />
          </div>
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
            error={errors.password?.message}
            wrapperClassName='mb-6'
          />
          <Button type='submit' className='w-full mb-4' disabled={isSubmitting || !isDirty}>
            Continue
          </Button>
          <p className='text-sm text-slate-500 max-w-md'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-primary underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
