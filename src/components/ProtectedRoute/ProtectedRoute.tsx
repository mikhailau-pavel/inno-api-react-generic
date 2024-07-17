import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../../types/types';

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
