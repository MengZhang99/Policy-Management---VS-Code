import { useNavigate } from 'react-router-dom';
import {
  FileText, Clock, Globe2,
  AlertTriangle, ArrowRight, Zap,
} from 'lucide-react';
import { mockPolicies, stats } from '../data/mockData';
import clsx from 'clsx';

const statusColor: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  'in-review': 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
};

const riskColor: Record<string, string> = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Total Policies', value: stats.total, color: '#1a2b4a', sub: '↑ 3 this quarter' },
          { icon: Clock, label: 'In Review', value: stats.inReview, color: '#f5a623', sub: `${stats.dueThisMonth} due this month` },
          { icon: AlertTriangle, label: 'Pending Approval', value: stats.pendingApproval, color: '#ef4444', sub: 'Action required' },
          { icon: Globe2, label: 'Published', value: stats.published, color: '#00a99d', sub: 'Live for employees' },
        ].map(({ icon: Icon, label, value, color, sub }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
              </div>
              <div className="p-2.5 rounded-lg" style={{ background: color + '15' }}>
                <Icon size={20} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI highlight banner */}
      <div
        className="flex items-center justify-between p-4 rounded-xl text-white"
        style={{ background: 'linear-gradient(135deg, #1a2b4a 0%, #00a99d 100%)' }}
      >
        <div className="flex items-center gap-3">
          <Zap size={20} className="text-yellow-300" />
          <div>
            <p className="font-semibold text-sm">AI Review Alert</p>
            <p className="text-white/80 text-xs">
              Code of Business Conduct & Ethics has 5 new AI suggestions based on updated EU Directives & FCPA guidance.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/review')}
          className="flex items-center gap-1 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        >
          Review now <ArrowRight size={14} />
        </button>
      </div>

      {/* Policy table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Policies</h2>
          <div className="flex gap-2">
            {['All', 'Ethics', 'Data & Privacy', 'Financial', 'HR'].map(f => (
              <button
                key={f}
                className={clsx(
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  f === 'All'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {mockPolicies.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate('/review')}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#1a2b4a15' }}>
                <FileText size={16} style={{ color: '#1a2b4a' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                <p className="text-xs text-gray-400">{p.owner} · v{p.version} · {p.lastModified}</p>
              </div>
              <span className={clsx('px-2.5 py-1 rounded-full text-xs font-medium capitalize', statusColor[p.status])}>
                {p.status.replace('-', ' ')}
              </span>
              <span className={clsx('text-xs font-medium', riskColor[p.riskLevel])}>
                {p.riskLevel.toUpperCase()} RISK
              </span>
              <span className="text-xs text-gray-400">{p.dueDate}</span>
              <ArrowRight size={14} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
