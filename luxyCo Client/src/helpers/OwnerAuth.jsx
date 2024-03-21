import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export const OwnerAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.userInfo.department === 1) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};
