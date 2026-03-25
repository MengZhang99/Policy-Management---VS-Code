import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, CheckCircle2, ArrowRight,
  Info, Sparkles, File,
} from 'lucide-react';
import clsx from 'clsx';

const STEPS = ['Upload', 'Classify', 'Scan', 'Review'];

export default function UploadPolicy() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [category, setCategory] = useState('Ethics & Compliance');
  const [owner, setOwner] = useState('Sarah Chen');
  const [title, setTitle] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) { setFile(dropped); setTitle(dropped.name.replace(/\.[^.]+$/, '')); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) { setFile(picked); setTitle(picked.name.replace(/\.[^.]+$/, '')); }
  };

  const startScan = () => {
    setStep(2);
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanDone(true); }, 2800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Stepper */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                  i < step ? 'text-white' : i === step ? 'text-white' : 'bg-gray-200 text-gray-500',
                )}
                style={i <= step ? { background: 'var(--lrn-teal)' } : {}}
              >
                {i < step ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className="text-xs mt-1 text-gray-500">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-4" style={{ background: i < step ? 'var(--lrn-teal)' : '#e5e7eb' }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0 – Drop zone */}
      {step === 0 && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={clsx(
            'bg-white rounded-xl border-2 border-dashed p-16 flex flex-col items-center gap-4 cursor-pointer transition-all',
            dragging ? 'border-teal-400 bg-teal-50' : 'border-gray-200 hover:border-teal-300',
          )}
        >
          <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#00a99d20' }}>
            <Upload size={28} style={{ color: 'var(--lrn-teal)' }} />
          </div>
          {file ? (
            <>
              <div className="flex items-center gap-2 text-teal-600 font-medium">
                <File size={18} /> {file.name}
              </div>
              <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(0)} KB · Click to change</p>
            </>
          ) : (
            <>
              <p className="text-base font-medium text-gray-700">Drop your policy document here</p>
              <p className="text-sm text-gray-400">Supports PDF, Word (.docx), and plain text files</p>
            </>
          )}
        </div>
      )}

      {/* Step 0 – after file selected */}
      {step === 0 && file && (
        <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800">Document details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Policy title</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {['Ethics & Compliance', 'Data & Privacy', 'Financial', 'HR & Workplace', 'IT & Security'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Policy owner</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                value={owner}
                onChange={e => setOwner(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ background: 'var(--lrn-teal)' }}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 1 – Classify / confirm */}
      {step === 1 && (
        <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800">Confirm classification</h3>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-700">
            <Info size={16} className="mt-0.5 shrink-0" />
            <span>AI has auto-classified this policy. Please confirm or adjust before scanning.</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['File', file?.name ?? '—'],
              ['Category', category],
              ['Owner', owner],
              ['Risk Level', 'High (auto-detected)'],
              ['Jurisdiction', 'Global + EU + US'],
              ['Frameworks', 'FCPA · UK Bribery Act · ISO 37001'],
            ].map(([k, v]) => (
              <div key={k} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">{k}</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={startScan}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium"
              style={{ background: 'var(--lrn-teal)' }}
            >
              <Sparkles size={16} /> Start AI Scan
            </button>
          </div>
        </div>
      )}

      {/* Step 2 – Scanning */}
      {step === 2 && (
        <div className="bg-white rounded-xl p-10 flex flex-col items-center gap-6 shadow-sm border border-gray-100">
          {!scanDone ? (
            <>
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-teal-100" />
                <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                <Sparkles size={24} className="absolute inset-0 m-auto text-teal-500" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">AI is scanning your policy</p>
                <p className="text-sm text-gray-400 mt-1">Checking against FCPA, UK Bribery Act, EU Directives, ISO 37001 and LRN expertise…</p>
              </div>
              <div className="w-full max-w-xs space-y-2 text-sm">
                {['Parsing document structure…', 'Matching regulatory frameworks…', 'Generating suggestions…'].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
                    {t}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">Scan complete!</p>
                <p className="text-sm text-gray-400 mt-1">Found <strong>5 suggestions</strong> across 4 sections.</p>
              </div>
              <button
                onClick={() => navigate('/review')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium"
                style={{ background: 'var(--lrn-teal)' }}
              >
                View AI Suggestions <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
