import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, ChevronDown, ChevronUp, Check, X,
  ExternalLink, ArrowRight, Info, Minus,
} from 'lucide-react';
import { mockSuggestions, type Suggestion } from '../data/mockData';
import clsx from 'clsx';

const priorityBadge: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-600',
};

const typeIcon: Record<string, React.ReactNode> = {
  add: <span className="text-green-600 text-xs font-bold">+ ADD</span>,
  modify: <span className="text-blue-600 text-xs font-bold">~ MODIFY</span>,
  remove: <span className="text-red-600 text-xs font-bold">− REMOVE</span>,
};

export default function ReviewSuggestions() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [expanded, setExpanded] = useState<string | null>('sug-001');
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const toggle = (id: string) => setExpanded(prev => (prev === id ? null : id));

  const accept = (id: string) =>
    setSuggestions(s => s.map(x => (x.id === id ? { ...x, accepted: true } : x)));

  const reject = (id: string) =>
    setSuggestions(s => s.map(x => (x.id === id ? { ...x, accepted: false } : x)));

  const filtered = suggestions.filter(s => filter === 'all' || s.priority === filter);
  const accepted = suggestions.filter(s => s.accepted === true).length;
  const pending  = suggestions.filter(s => s.accepted === undefined).length;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Policy context */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Reviewing</p>
          <p className="font-semibold text-gray-900 mt-0.5">Code of Business Conduct & Ethics · v3.2</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-green-600"><Check size={14} />{accepted} accepted</span>
          <span className="flex items-center gap-1.5 text-gray-500"><Minus size={14} />{pending} pending</span>
          <span className="flex items-center gap-1.5 text-red-500"><X size={14} />{suggestions.filter(s => s.accepted === false).length} rejected</span>
        </div>
      </div>

      {/* AI summary banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-teal-200 bg-teal-50 text-sm text-teal-800">
        <Sparkles size={18} className="shrink-0 mt-0.5" />
        <span>
          AI scanned this policy against <strong>FCPA, UK Bribery Act 2010, EU Whistleblower Directive 2019/1937, ISO 37001:2016</strong>, and <strong>LRN's 2025 Ethics & Compliance Benchmark</strong>. Found <strong>5 suggestions</strong> — 2 high priority, 2 medium, 1 low.
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'high', 'medium', 'low'] as const).map(f => (
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

      {/* Suggestion cards */}
      <div className="space-y-3">
        {filtered.map(s => (
          <div
            key={s.id}
            className={clsx(
              'bg-white rounded-xl shadow-sm border transition-all',
              s.accepted === true ? 'border-green-200' : s.accepted === false ? 'border-red-200 opacity-60' : 'border-gray-100',
            )}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer"
              onClick={() => toggle(s.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {typeIcon[s.type]}
                  <span className="text-sm font-medium text-gray-800">{s.section}</span>
                  <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', priorityBadge[s.priority])}>
                    {s.priority} priority
                  </span>
                  {s.accepted === true && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><Check size={12} />Accepted</span>
                  )}
                  {s.accepted === false && (
                    <span className="flex items-center gap-1 text-xs text-red-500 font-medium"><X size={12} />Rejected</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Based on: <span className="font-medium text-gray-600">{s.regulation}</span> ·{' '}
                  <a
                    href="#"
                    className="text-teal-600 hover:underline inline-flex items-center gap-0.5"
                    onClick={e => e.stopPropagation()}
                  >
                    {s.source} <ExternalLink size={10} />
                  </a>
                </p>
              </div>
              {expanded === s.id ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
            </div>

            {/* Expanded body */}
            {expanded === s.id && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                {s.original && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1.5">Current text</p>
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-800 line-through">
                      {s.original}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1.5">Suggested text</p>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-900">
                    {s.suggested}
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                  <Info size={14} className="shrink-0 mt-0.5 text-gray-400" />
                  <span><strong>Rationale:</strong> {s.rationale}</span>
                </div>

                {s.accepted === undefined && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => accept(s.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
                    >
                      <Check size={14} /> Accept
                    </button>
                    <button
                      onClick={() => reject(s.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <X size={14} /> Reject
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">
                      Edit suggestion…
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action footer */}
      {pending === 0 && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600">
            <Check size={18} />
            <span className="font-medium text-sm">All suggestions resolved · {accepted} accepted, {suggestions.filter(s => s.accepted === false).length} rejected</span>
          </div>
          <button
            onClick={() => navigate('/stakeholders')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium"
            style={{ background: 'var(--lrn-teal)' }}
          >
            Send for Stakeholder Review <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
