import { PropsWithChildren } from 'react';
import Navbar from './navbar';

type Props = PropsWithChildren<{}>;

const Layout = (props: Props) => {
  return (
    <main className='relative min-h-screen'>
      <Navbar />
      <section className='min-h-[85vh] px-4 py-3 sm:px-6 sm:py-5 md:px-14 md:py-4'>
        {props.children}
      </section>
    </main>
  );
};

export default Layout;
