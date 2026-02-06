import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/core/store/auth.store';
import { ROUTES } from './paths';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Wraps routes that require authentication
 * Redirects unauthenticated users to login page
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the attempted location
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * PublicRoute - Wraps routes that should only be accessible when NOT authenticated
 * Redirects authenticated users to dashboard
 */
export const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // Redirect authenticated users to dashboard
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
