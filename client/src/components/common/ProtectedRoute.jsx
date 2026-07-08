import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated || !isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
