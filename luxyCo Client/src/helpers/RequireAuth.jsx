import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};
