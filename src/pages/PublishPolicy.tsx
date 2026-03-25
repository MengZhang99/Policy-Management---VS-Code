import { useState } from 'react';
import {
  Globe2, Check, Bell, Users,
  Eye, Download, Lock, Unlock, Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const AUDIENCES = [
  { id: 'all', label: 'All Employees', count: '4,200+', default: true },
  { id: 'mgmt', label: 'Management Only', count: '320', default: false },
  { id: 'hq', label: 'HQ + Regional Directors', count: '85', default: false },
  { id: 'select', label: 'Selected Departments', count: 'Custom', default: false },
];

const CHANNELS = [
  { id: 'email', label: 'Email notification', default: true },
  { id: 'intranet', label: 'Intranet / SharePoint post', default: true },
  { id: 'lrn', label: 'LRN learning platform announcement', default: true },
  { id: 'sms', label: 'SMS for high-risk roles', default: false },
];

export default function PublishPolicy() {
  const [audience, setAudience] = useState('all');
  const [channels, setChannels] = useState<string[]>(['email', 'intranet', 'lrn']);
  const [requireAck, setRequireAck] = useState(true);
  const [ackDeadline, setAckDeadline] = useState('2026-04-30');
  const [published, setPublished] = useState(false);

  const toggleChannel = (id: string) =>
    setChannels(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const publish = () => {
    setPublished(true);
    // fire confetti
    setTimeout(() => {
      (confetti as any)({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00a99d', '#1a2b4a', '#f5a623'],
      });
    }, 100);
  };

  if (published) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center gap-5 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-teal-100">
            <Globe2 size={36} className="text-teal-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Policy Published!</h2>
            <p className="text-gray-500 mt-2 text-sm">
              <strong>Code of Business Conduct & Ethics v3.2</strong> is now live and has been distributed to employees.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            {[
              { icon: Users, label: 'Employees notified', value: '4,200+' },
              { icon: Bell, label: 'Channels used', value: channels.length.toString() },
              { icon: Check, label: 'Ack deadline', value: 'Apr 30, 2026' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <Icon size={18} className="text-teal-500 mx-auto mb-1" />
                <p className="text-xs text-gray-400 text-center">{label}</p>
                <p className="text-base font-bold text-gray-800 text-center">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <Eye size={15} /> View published policy
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <Download size={15} /> Download audit log
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Policy summary */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400">Ready to publish</p>
            <p className="font-semibold text-gray-900 mt-0.5">Code of Business Conduct & Ethics · v3.2</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            <Check size={12} /> Approved
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
          {[
            ['AI suggestions', '5 applied'],
            ['Reviewers', '1/4 approved (demo)'],
            ['Last modified', 'Mar 25, 2026'],
          ].map(([k, v]) => (
            <div key={k} className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400">{k}</p>
              <p className="font-medium text-gray-800 mt-0.5">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Users size={16} className="text-gray-400" /> Target audience
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {AUDIENCES.map(a => (
            <label
              key={a.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                audience === a.id ? 'border-teal-400 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="audience"
                value={a.id}
                checked={audience === a.id}
                onChange={() => setAudience(a.id)}
                className="accent-teal-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{a.label}</p>
                <p className="text-xs text-gray-400">{a.count} people</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Bell size={16} className="text-gray-400" /> Notification channels
        </h3>
        <div className="space-y-2">
          {CHANNELS.map(c => (
            <label key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={channels.includes(c.id)}
                onChange={() => toggleChannel(c.id)}
                className="accent-teal-500"
              />
              <span className="text-sm text-gray-800">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Acknowledgment */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            {requireAck ? <Lock size={16} className="text-gray-400" /> : <Unlock size={16} className="text-gray-400" />}
            Employee acknowledgment
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-10 h-5 rounded-full transition-colors relative ${requireAck ? 'bg-teal-500' : 'bg-gray-300'}`}
              onClick={() => setRequireAck(!requireAck)}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${requireAck ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-gray-600">{requireAck ? 'Required' : 'Optional'}</span>
          </label>
        </div>

        {requireAck && (
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600 whitespace-nowrap">Acknowledgment deadline</label>
            <input
              type="date"
              value={ackDeadline}
              onChange={e => setAckDeadline(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
        )}
      </div>

      {/* LRN note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-800">
        <Sparkles size={16} className="shrink-0 mt-0.5" />
        <span>
          <strong>LRN Tip:</strong> Pairing policy publication with a short micro-learning module increases employee comprehension by 78%. Consider linking a bite-sized course in the notification.
        </span>
      </div>

      {/* Publish button */}
      <button
        onClick={publish}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-base shadow-lg transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #1a2b4a 0%, #00a99d 100%)' }}
      >
        <Globe2 size={20} /> Publish Policy to All Employees
      </button>
    </div>
  );
}
