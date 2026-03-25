import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/upload': 'Upload Policy',
  '/review': 'AI Review & Suggestions',
  '/changes': 'Change Tracking',
  '/stakeholders': 'Stakeholder Review',
  '/publish': 'Publish Policy',
};

export default function Header() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? 'Policy Management';

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-400 mt-0.5">LRN PolicyHub · March 25, 2026</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 text-sm w-48">
          <Search size={14} />
          <span>Search policies…</span>
        </div>
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: 'var(--lrn-teal)' }}
          >
            SC
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-gray-800 leading-tight">Sarah Chen</div>
            <div className="text-xs text-gray-400">Policy Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}
