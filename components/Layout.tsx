
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Permission } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronRight,
  ShieldCheck,
  Bell
} from 'lucide-react';

const SidebarItem: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  onClick: () => void,
  permission?: Permission
}> = ({ icon, label, active, onClick, permission }) => {
  const { can } = useAuth();
  
  if (permission && !can(permission)) return null;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {active && <ChevronRight className="ml-auto w-4 h-4" />}
    </button>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold dark:text-white">SecureDash</span>
        </div>

        <nav className="px-4 mt-6 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={activePage === 'dashboard'}
            onClick={() => { setActivePage('dashboard'); setSidebarOpen(false); }}
            permission={Permission.VIEW_DASHBOARD}
          />
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="Users" 
            active={activePage === 'users'}
            onClick={() => { setActivePage('users'); setSidebarOpen(false); }}
            permission={Permission.VIEW_USERS}
          />
          <SidebarItem 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings" 
            active={activePage === 'settings'}
            onClick={() => { setActivePage('settings'); setSidebarOpen(false); }}
            permission={Permission.VIEW_SETTINGS}
          />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 flex-1 min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between z-30">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-400"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-end items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
