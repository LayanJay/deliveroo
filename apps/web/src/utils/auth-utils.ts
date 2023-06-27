import axios from 'axios';
import Cookies from 'js-cookie';

export const checkCurrentAccessToken = () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    return false;
  }
  return true;
};

export const fetchNewAccessToken = async () => {
  try {
    const response = await axios.post(
      'http://localhost:4000/auth/refresh-token',
      { token: Cookies.get('refreshToken') },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data) {
      Cookies.set('accessToken', response.data.accessToken, { expires: 108000000, path: '/' });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error refreshing access token');
  }
};
