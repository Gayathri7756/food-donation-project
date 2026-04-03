import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, X, LogOut, User, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    return user.role === 'donor' ? '/donor-dashboard' : '/receiver-dashboard';
  };

  return (
    <nav className="glass sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
            <span className="font-bold text-xl text-dark-900 hidden sm:inline">FoodShare</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/donations" className="text-dark-700 hover:text-primary-600 transition">
              Browse
            </Link>
            {token && (
              <>
                <Link to="/my-requests" className="text-dark-700 hover:text-primary-600 transition">
                  Requests
                </Link>
                <Link to="/analytics" className="text-dark-700 hover:text-primary-600 transition flex items-center gap-1">
                  <BarChart3 size={18} />
                  Analytics
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <Link to={getDashboardLink()} className="btn-primary">
                  Dashboard
                </Link>
                <Link to="/profile" className="p-2 hover:bg-primary-100 rounded-lg transition">
                  <User size={20} className="text-primary-600" />
                </Link>
                <button onClick={handleLogout} className="p-2 hover:bg-red-100 rounded-lg transition">
                  <LogOut size={20} className="text-red-600" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/donations" className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
              Browse Donations
            </Link>
            {token && (
              <>
                <Link to="/my-requests" className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
                  My Requests
                </Link>
                <Link to="/analytics" className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
                  Analytics
                </Link>
                <Link to={getDashboardLink()} className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
                  Dashboard
                </Link>
                <Link to="/profile" className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 rounded-lg text-red-600"
                >
                  Logout
                </button>
              </>
            )}
            {!token && (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-primary-100 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
