import getGoogleOAuthURL from './utils/getGoogleUrl';

const App = () => {
  return (
    <>
      <div>
        <a href={getGoogleOAuthURL()}>Login with Google</a>
        <p className='text-3xl font-bold underline'>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
};

export default App;
