import React from 'react';
import { useAuthStore } from '../../features/auth/store/authStore';
import { useUIStore } from '../store/uiStore';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const { user, role } = useAuthStore();
  const { toggleSidebar, sidebarOpen } = useUIStore();
  
  const displayName = user?.name || user?.adminDetails?.name || user?.studentData?.name || 'User';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className="h-20 border-b border-white/5 bg-surface/30 backdrop-blur-2xl sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 -ml-2 mr-5 rounded-xl md:flex hidden bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-300 transition-all duration-300 interactive focus:outline-none focus:ring-2 focus:ring-brand-violet/50 shadow-sm"
        >
          {sidebarOpen ? <X className="w-5 h-5 drop-shadow-md" /> : <Menu className="w-5 h-5 drop-shadow-md" />}
        </button>
        
        <div className="hidden lg:flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-light to-neutral-400">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-accent-blue">{displayName.split(' ')[0]}</span>
          </h2>
          <p className="text-xs text-neutral-400 font-medium tracking-wider uppercase mt-0.5 opacity-80">
            Welcome to Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <Link to={role ? `/${role}/profile` : '#'} className="flex items-center space-x-4 pl-5 hover:opacity-100 transition-all cursor-pointer group interactive bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-full pr-2 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-light group-hover:text-brand-violet transition-colors drop-shadow-sm">{displayName}</p>
            <p className="text-xs text-brand-violet/90 font-medium capitalize tracking-wide">{role || 'Role'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-violet via-indigo-500 to-accent-blue flex items-center justify-center border-2 border-surface shadow-glow group-hover:scale-105 transition-all duration-300 transform">
            <span className="font-bold text-light text-sm shadow-md">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
