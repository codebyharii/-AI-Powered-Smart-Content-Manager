import { Menu, Search, Bell } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useAuthStore } from '../../store/authStore';

const Navbar = ({ setSidebarOpen }) => {
  const { user } = useAuthStore();

  return (
    <nav className="h-16 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border px-6 flex items-center justify-between shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-light-surface dark:hover:bg-dark-surface rounded-lg transition-all duration-300 hover:shadow-glow-blue"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted" />
          <input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2 w-64 lg:w-96 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all duration-300 focus:shadow-glow-blue"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button className="relative p-2 hover:bg-light-surface dark:hover:bg-dark-surface rounded-lg transition-all duration-300 group">
          <Bell className="w-5 h-5 text-light-text dark:text-dark-text group-hover:text-google-blue transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-google-red rounded-full animate-pulse shadow-glow-red" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-3 border-l border-light-border dark:border-dark-border">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-light-text dark:text-dark-text">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-light-muted dark:text-dark-muted">
              {user?.email || ''}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-google-blue to-google-green flex items-center justify-center text-white font-semibold shadow-glow-blue cursor-pointer hover:scale-110 transition-transform">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
