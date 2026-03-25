import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Upload, Sparkles, GitCompare,
  Users, Send, ChevronRight, ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/upload', label: 'Upload Policy', icon: Upload },
  { to: '/review', label: 'AI Review & Suggestions', icon: Sparkles },
  { to: '/changes', label: 'Change Tracking', icon: GitCompare },
  { to: '/stakeholders', label: 'Stakeholder Review', icon: Users },
  { to: '/publish', label: 'Publish Policy', icon: Send },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col w-64 min-h-screen shrink-0" style={{ background: 'var(--lrn-navy)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <ShieldCheck size={28} className="text-teal-400" />
        <div>
          <div className="text-white font-bold text-sm leading-tight">LRN PolicyHub</div>
          <div className="text-white/50 text-xs">Policy Management</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                isActive
                  ? 'bg-teal-500/20 text-teal-300 font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5',
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Quick-start wizard button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => navigate('/upload')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
        >
          <span>Start New Policy</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </aside>
  );
}
