import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../../types/types';

const ProtectedRoute = ({ authorizedUser, children }: ProtectedRouteProps) => {
  if (!authorizedUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
