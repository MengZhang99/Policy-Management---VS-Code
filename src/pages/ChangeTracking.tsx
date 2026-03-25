import { useState } from 'react';
import {
  GitCompare, ChevronDown, ChevronUp,
  EditIcon, ShieldCheck, Globe2, Upload,
} from 'lucide-react';
import { mockChanges, type ChangeRecord } from '../data/mockData';
import clsx from 'clsx';

const typeConfig: Record<ChangeRecord['type'], { icon: React.ReactNode; color: string; bg: string }> = {
  created:   { icon: <Upload size={14} />,    color: 'text-blue-600',  bg: 'bg-blue-100' },
  edited:    { icon: <EditIcon size={14} />,  color: 'text-yellow-600', bg: 'bg-yellow-100' },
  reviewed:  { icon: <GitCompare size={14} />,color: 'text-purple-600', bg: 'bg-purple-100' },
  approved:  { icon: <ShieldCheck size={14} />,color:'text-green-600',  bg: 'bg-green-100' },
  published: { icon: <Globe2 size={14} />,    color: 'text-teal-600',  bg: 'bg-teal-100' },
};

export default function ChangeTracking() {
  const [expanded, setExpanded] = useState<string | null>('chg-001');
  const [filter, setFilter] = useState<'all' | ChangeRecord['type']>('all');

  const filtered = mockChanges.filter(c => filter === 'all' || c.type === filter);

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Policy</p>
          <p className="font-semibold text-gray-900 mt-0.5">Code of Business Conduct & Ethics · v3.2</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <GitCompare size={16} /> {mockChanges.length} changes across 2 versions
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'created', 'edited', 'reviewed', 'approved', 'published'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors',
              filter === f ? 'bg-gray-800 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-0">
          {filtered.map((c) => {
            const cfg = typeConfig[c.type];
            return (
              <div key={c.id} className="relative flex gap-4 pb-6">
                {/* Dot */}
                <div className={clsx('relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white', cfg.bg, cfg.color)}>
                  {cfg.icon}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setExpanded(prev => (prev === c.id ? null : c.id))}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={clsx('text-xs font-semibold uppercase', cfg.color)}>{c.type}</span>
                        <span className="text-xs text-gray-400">v{c.version}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{c.summary}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.date} · by <strong>{c.author}</strong></p>
                    </div>
                    {c.diff
                      ? (expanded === c.id ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />)
                      : null
                    }
                  </div>

                  {/* Diff view */}
                  {c.diff && expanded === c.id && (
                    <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                      <p className="text-xs font-medium text-gray-400 uppercase">Change diff</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-red-500 font-medium mb-1">Before</p>
                          <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-800 leading-relaxed">
                            {c.diff.before}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium mb-1">After</p>
                          <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 text-xs text-green-900 leading-relaxed">
                            {c.diff.after}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Version compare */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <GitCompare size={16} className="text-gray-400" /> Compare versions
        </h3>
        <div className="flex items-center gap-3">
          <select className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>v3.2 (current)</option>
            <option>v3.1</option>
            <option>v3.0</option>
          </select>
          <span className="text-gray-400 text-sm">vs</span>
          <select className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option>v3.0</option>
            <option>v3.1</option>
            <option>v3.2 (current)</option>
          </select>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ background: 'var(--lrn-teal)' }}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}
