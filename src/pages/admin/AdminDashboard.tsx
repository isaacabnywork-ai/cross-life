import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { isSupabaseConfigured } from '../../services/supabase';
import {
  FileText,
  Layers,
  Image,
  HelpCircle,
  Menu,
  Settings,
  ArrowRight,
  Database,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { pages, sections, media, faqs, activityLogs, globalSettings } = useCMS();

  const totalSections = Object.values(sections).reduce((acc, list) => acc + list.length, 0);
  const isConfigured = isSupabaseConfigured();

  const statCards = [
    {
      title: 'Managed Pages',
      value: pages.length,
      desc: 'Home, About, Conference, etc.',
      icon: FileText,
      link: '/admin/pages',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      title: 'Content Sections',
      value: totalSections,
      desc: 'Dynamic modular sections',
      icon: Layers,
      link: '/admin/builder',
      color: 'bg-indigo-500/10 text-indigo-600'
    },
    {
      title: 'Media Assets',
      value: media.length,
      desc: 'Images & brand graphics',
      icon: Image,
      link: '/admin/media',
      color: 'bg-emerald-500/10 text-emerald-600'
    },
    {
      title: 'Active FAQs',
      value: faqs.length,
      desc: 'Categorized conference questions',
      icon: HelpCircle,
      link: '/admin/faqs',
      color: 'bg-amber-500/10 text-amber-600'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
            <span>CrossLife 2027 Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to CrossLife CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            You can modify text, reorder sections, update conference dates, edit mega menus, and configure registration settings without touching code.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
          <Link
            to="/admin/builder?pageId=page-home"
            className="px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wide transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Edit Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wide border border-white/20 transition-colors text-center"
          >
            View Live Site
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle hover:shadow-card transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-950 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-2xl font-black text-navy-950">{card.value}</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">{card.title}</div>
              <div className="text-[11px] text-slate-400 mt-1">{card.desc}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Actions (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/admin/builder?pageId=page-home"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-navy-900 shadow-subtle transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 text-xs sm:text-sm">Reorder Homepage Sections</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Drag, reorder, show/hide Hero, Pillars, Distinctives, Venue.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/navigation"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-navy-900 shadow-subtle transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                <Menu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 text-xs sm:text-sm">Mega Menu & Top Banner</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Edit early bird notice, promo codes, and navigation columns.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/settings"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-navy-900 shadow-subtle transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 text-xs sm:text-sm">Global Contact & Rates</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Update conference ticket pricing, email, phone numbers, venue.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/media"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-navy-900 shadow-subtle transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                <Image className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 text-xs sm:text-sm">Media Library</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Upload new images, posters, book covers, and campus photos.
                </p>
              </div>
            </Link>
          </div>

          {/* Current Event Highlights */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Current Conference Status
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Registrations Open</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Dates</span>
                <span className="font-bold text-navy-950">{globalSettings.registration.dates}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Early Bird Rate</span>
                <span className="font-bold text-navy-950">₹{globalSettings.registration.earlyBirdPrice.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Promo Code</span>
                <span className="font-mono font-bold text-gold-600">{globalSettings.registration.promoCode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Discount</span>
                <span className="font-bold text-emerald-600">Save ₹{globalSettings.registration.discount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* System & Recent Activity (1 col) */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center justify-between">
            <span>Recent Activity</span>
            <Link to="/admin/activity" className="text-xs text-navy-700 hover:underline">
              View all
            </Link>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-navy-900">{log.action}</span>
                  <span className="text-slate-400 text-[10px]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {log.details}
                </p>
                <span className="text-[10px] text-slate-400">By {log.user}</span>
              </div>
            ))}
          </div>

          {/* Database System Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-navy-950">
              <Database className="w-4 h-4 text-navy-700" />
              <span>Storage Provider</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isConfigured
                ? 'Connected to live Supabase PostgreSQL database.'
                : 'Running in Local Offline Mode with instant reactive persistence. All changes persist across reloads. You can connect Supabase by setting VITE_SUPABASE_URL.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
