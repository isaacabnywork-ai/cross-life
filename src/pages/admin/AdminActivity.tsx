import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  History,
  Search,
  Filter,
  Layers,
  FileText,
  Settings,
  Image,
  Users,
  Building,
  HelpCircle,
  Menu,
  Clock,
  UserCheck
} from 'lucide-react';
import type { ActivityLog } from '../../types/cms';

export const AdminActivity: React.FC = () => {
  const { activityLogs } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      const matchesSearch =
        searchQuery === '' ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.entityId && log.entityId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesEntity = selectedEntity === 'all' || log.entityType === selectedEntity;

      return matchesSearch && matchesEntity;
    });
  }, [activityLogs, searchQuery, selectedEntity]);

  const getEntityIcon = (type: ActivityLog['entityType']) => {
    switch (type) {
      case 'page':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'section':
        return <Layers className="w-4 h-4 text-purple-600" />;
      case 'navigation':
        return <Menu className="w-4 h-4 text-emerald-600" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-amber-600" />;
      case 'media':
        return <Image className="w-4 h-4 text-cyan-600" />;
      case 'speaker':
        return <Users className="w-4 h-4 text-indigo-600" />;
      case 'partner':
        return <Building className="w-4 h-4 text-orange-600" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-teal-600" />;
      default:
        return <History className="w-4 h-4 text-slate-500" />;
    }
  };

  const getActionBadgeColor = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes('create') || act.includes('add') || act.includes('upload')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (act.includes('delete') || act.includes('remove')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (act.includes('reorder') || act.includes('toggle')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-navy-800" />
            Audit & Activity Logs
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Complete real-time trail of content updates, layout adjustments, media uploads, and configuration changes.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-navy-50 flex items-center justify-center text-navy-800 shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{activityLogs.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Events Recorded</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 truncate">
              {activityLogs[0]?.user || 'admin@crosslife.in'}
            </div>
            <div className="text-xs text-slate-500 font-medium">Last Active Administrator</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 truncate">
              {activityLogs[0] ? formatDate(activityLogs[0].timestamp) : 'Just now'}
            </div>
            <div className="text-xs text-slate-500 font-medium">Latest Timestamp</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action, details, user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Entity:</span>
          <select
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-navy-800"
          >
            <option value="all">All Entities</option>
            <option value="page">Pages</option>
            <option value="section">Sections</option>
            <option value="navigation">Navigation</option>
            <option value="settings">Settings</option>
            <option value="media">Media</option>
            <option value="speaker">Speakers</option>
            <option value="partner">Partners</option>
            <option value="faq">FAQs</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-subtle overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 px-4">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No activity logs found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery || selectedEntity !== 'all'
                ? 'Try clearing your search query or entity filter.'
                : 'Activity events will appear here automatically when actions are performed.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-normal">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${getActionBadgeColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-slate-100">{getEntityIcon(log.entityType)}</span>
                        <span className="font-semibold text-xs text-slate-900 capitalize">
                          {log.entityType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs sm:text-sm text-slate-800 max-w-md break-words">
                      {log.details}
                      {log.entityId && (
                        <span className="ml-2 font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {log.entityId}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <div className="w-5 h-5 rounded-full bg-navy-800 text-white text-[10px] flex items-center justify-center font-bold">
                          {log.user.charAt(0).toUpperCase()}
                        </div>
                        <span>{log.user}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-xs text-slate-600 text-right font-mono">
                      {formatDate(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivity;
