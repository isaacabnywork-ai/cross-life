import React, { useState } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { isSupabaseConfigured } from '../../services/supabase';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Menu,
  Image,
  HelpCircle,
  Users,
  Settings,
  History,
  ExternalLink,
  LogOut,
  RotateCcw,
  Database,
  Menu as MenuIcon,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, resetToDefaults } = useCMS();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Protected route check
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Pages', href: '/admin/pages', icon: FileText },
    { label: 'Section Builder', href: '/admin/builder', icon: Layers },
    { label: 'Navigation & Menus', href: '/admin/navigation', icon: Menu },
    { label: 'Media Library', href: '/admin/media', icon: Image },
    { label: 'FAQ Manager', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Speakers & Partners', href: '/admin/speakers-partners', icon: Users },
    { label: 'Global Settings', href: '/admin/settings', icon: Settings },
    { label: 'Activity Logs', href: '/admin/activity', icon: History }
  ];

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all CMS content to factory defaults? Any custom edits will be restored.')) {
      resetToDefaults();
      alert('Content reset to factory defaults.');
    }
  };

  const isConfigured = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased text-slate-800">
      {/* Top Navbar */}
      <header className="h-14 bg-navy-950 text-white flex items-center justify-between px-4 sm:px-6 border-b border-navy-850 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-900 transition-colors"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-white">
              Cross<span className="text-gold-400">Life</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-navy-800 text-[10px] font-mono uppercase text-gold-300 border border-navy-700">
              CMS
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Supabase status badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-900 border border-navy-800 text-slate-300 text-[11px]">
            <Database className="w-3.5 h-3.5 text-gold-400" />
            <span>{isConfigured ? 'Supabase Connected' : 'Local / Offline Store'}</span>
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            title="Reset to Factory Content"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-navy-850 border border-navy-800 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span>Reset Defaults</span>
          </button>

          {/* View Website Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-400 hover:bg-gold-500 text-navy-950 font-bold transition-colors"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* User profile / Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-navy-800">
            <span className="hidden md:inline font-semibold text-slate-300 text-xs">
              {user.name}
            </span>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-lg hover:bg-navy-900 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`w-64 bg-navy-900 text-slate-300 flex flex-col border-r border-navy-850 absolute md:static inset-y-0 left-0 z-30 transition-transform duration-200 ease-in-out ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4 border-b border-navy-850">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              CrossLife Admin
            </span>
            <div className="text-xs text-slate-300">
              Content & Layout Management
            </div>
          </div>

          <nav className="p-3 space-y-1 flex-1 overflow-y-auto" aria-label="CMS Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-400 text-navy-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-navy-850 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-navy-850 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Role: {user.role}</span>
            <span className="text-emerald-400 font-mono">● active</span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
