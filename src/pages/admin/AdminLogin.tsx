import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { user, login } = useCMS();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@crosslife.in');
  const [password, setPassword] = useState('crosslife2027');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Login failed. Please check credentials.');
    }
  };

  const handleDemoLogin = async () => {
    setEmail('admin@crosslife.in');
    setPassword('crosslife2027');
    setLoading(true);
    const res = await login('admin@crosslife.in', 'crosslife2027');
    setLoading(false);
    if (res.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-200 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold uppercase tracking-wider mb-4 border border-navy-100">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>CrossLife CMS Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Administrator Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Manage CrossLife website content, sections, and conference data.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@crosslife.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 text-xs sm:text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 text-xs sm:text-sm outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Trigger */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gold-400/20 hover:bg-gold-400/30 text-navy-950 font-bold text-xs uppercase tracking-wide border border-gold-400/40 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>One-Click Demo Admin Login</span>
          </button>
          <p className="text-[11px] text-slate-400 mt-2">
            Auto-fills: <code>admin@crosslife.in</code> / <code>crosslife2027</code>
          </p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-navy-950 font-medium transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
