import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'google-blue' },
    { icon: FileText, label: 'Articles', path: '/articles', color: 'google-green' },
    { icon: PlusCircle, label: 'Create Article', path: '/articles/create', color: 'google-yellow' },
    { icon: User, label: 'Profile', path: '/profile', color: 'google-blue' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        className="fixed left-0 top-0 h-full w-70 bg-light-card dark:bg-dark-card border-r border-light-border dark:border-dark-border z-50 lg:translate-x-0 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-google-blue rounded-lg shadow-glow-blue group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">SmartContent</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-light-surface dark:hover:bg-dark-surface rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isItemActive = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isItemActive
                      ? 'bg-google-blue text-white shadow-glow-blue'
                      : 'hover:bg-light-surface dark:hover:bg-dark-surface text-light-text dark:text-dark-text'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isItemActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-light-border dark:border-dark-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-google-red transition-all duration-300 font-medium hover:shadow-glow-red"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
