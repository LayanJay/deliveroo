import Protected from './components/auth/protected';
import Layout from './components/layout';
import MenuList from './components/menu-list';
import MainHeader from './components/restaurant-details/main-header';

const App = () => {
  return (
    <Layout>
      <Protected>
        <MainHeader />
        <MenuList />
      </Protected>
    </Layout>
  );
};

export default App;
