import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Check, Clock, MessageSquare, AlertCircle,
  Send, Plus, ArrowRight, ChevronDown,
} from 'lucide-react';
import { mockReviewers, type Reviewer } from '../data/mockData';
import clsx from 'clsx';

const statusConfig: Record<Reviewer['status'], { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  approved:          { label: 'Approved', color: 'text-green-700', bg: 'bg-green-100', icon: <Check size={13} /> },
  'changes-requested': { label: 'Changes Requested', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: <AlertCircle size={13} /> },
  pending:           { label: 'Pending', color: 'text-gray-500', bg: 'bg-gray-100', icon: <Clock size={13} /> },
};

export default function StakeholderReview() {
  const navigate = useNavigate();
  const reviewers = mockReviewers;
  const [message, setMessage] = useState(
    "Hi team,\n\nPlease review the updated Code of Business Conduct & Ethics (v3.2). Key changes include revised gift thresholds, enhanced third-party due diligence requirements, and a new anonymous reporting section per EU Directive 2019/1937.\n\nDeadline: April 10, 2026.\n\nThank you,\nSarah"
  );
  const [sent, setSent] = useState(true);
  const [expanded, setExpanded] = useState<string | null>('rev-002');

  const approved = reviewers.filter(r => r.status === 'approved').length;
  const changes  = reviewers.filter(r => r.status === 'changes-requested').length;
  const pending  = reviewers.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Policy context */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Review cycle</p>
          <p className="font-semibold text-gray-900 mt-0.5">Code of Business Conduct & Ethics · v3.2</p>
          <p className="text-xs text-gray-400 mt-0.5">Due: April 10, 2026</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-green-600 font-medium"><Check size={14} />{approved} approved</span>
          <span className="flex items-center gap-1.5 text-yellow-600 font-medium"><AlertCircle size={14} />{changes} changes</span>
          <span className="flex items-center gap-1.5 text-gray-400"><Clock size={14} />{pending} pending</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Reviewer list */}
        <div className="col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Users size={16} />Reviewers</h2>
            <button className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 font-medium">
              <Plus size={14} /> Add reviewer
            </button>
          </div>

          {reviewers.map(r => {
            const sc = statusConfig[r.status];
            return (
              <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => setExpanded(prev => (prev === r.id ? null : r.id))}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: 'var(--lrn-navy)' }}
                  >
                    {r.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role}</p>
                  </div>
                  <span className={clsx('flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', sc.bg, sc.color)}>
                    {sc.icon}{sc.label}
                  </span>
                  {r.comment && (
                    <ChevronDown size={14} className={clsx('text-gray-400 transition-transform', expanded === r.id && 'rotate-180')} />
                  )}
                </div>

                {r.comment && expanded === r.id && (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <div className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 rounded-lg p-3">
                      <MessageSquare size={13} className="text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-400 mb-1">Reviewed {r.reviewedAt}</p>
                        <p>{r.comment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Notification panel */}
        <div className="col-span-2 space-y-3">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Send size={16} />Notification</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
            {sent && (
              <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2">
                <Check size={13} /> Review request sent on Mar 23, 2026
              </div>
            )}
            <div>
              <label className="text-xs text-gray-400 block mb-1">Message to reviewers</label>
              <textarea
                rows={9}
                className="w-full text-xs border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-teal-400 resize-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <button
              onClick={() => setSent(true)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium transition-colors"
              style={{ background: 'var(--lrn-teal)' }}
            >
              <Send size={14} /> Resend reminder
            </button>
          </div>

          {/* Progress to approval */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Approval progress</p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full"
                style={{ width: `${(approved / reviewers.length) * 100}%`, background: 'var(--lrn-teal)' }}
              />
            </div>
            <p className="text-xs text-gray-400">{approved} of {reviewers.length} reviewers approved</p>

            {pending === 0 && changes === 0 && (
              <button
                onClick={() => navigate('/publish')}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium"
                style={{ background: 'var(--lrn-navy)' }}
              >
                Proceed to publish <ArrowRight size={14} />
              </button>
            )}
            {(pending > 0 || changes > 0) && (
              <button
                onClick={() => navigate('/publish')}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Skip to publish (demo) <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
