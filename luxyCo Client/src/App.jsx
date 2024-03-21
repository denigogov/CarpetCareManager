import React, { useEffect, useState } from 'react';
import { useAuth } from './helpers/Auth';
import RootRouter from './RootRouter';
import { fetchTokenValidation } from './api';
import LoadingRing from './components/reusableComponent/LoadingRing';

const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (typeof auth.token === 'string' && auth.token.length) {
          const userData = await fetchTokenValidation(auth?.token);

          if (userData) {
            auth.info(userData);
          } else {
            auth.logout();
          }
        } else {
          auth.logout();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, [auth.token]);

  return <div>{loading ? <LoadingRing /> : <RootRouter />}</div>;
};

export default App;
