import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-medium">
            <Home className="w-5 h-5" />
            Home
          </Link>

          {isAuthenticated && (
            <Button
              variant="secondary"
              icon={LogOut}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;