import { useEffect, useState } from 'react';
import { Radar } from 'lucide-react';

const statusMessages = [
  'Establishing connection to server...',
  'Scanning website via Google PageSpeed Insights...',
  'Analyzing mobile responsiveness...',
  'Extracting SEO metadata...',
  'Compiling performance metrics...',
];

export const LoadingState = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => setCurrentMessage(p => (p + 1) % statusMessages.length), 1500);
    const progressInterval = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 60);
    return () => { clearInterval(messageInterval); clearInterval(progressInterval); };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-10 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 border border-emerald-900/50 rounded-full mb-6 relative">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
            <Radar className="w-12 h-12 text-emerald-500 animate-[spin_3s_linear_infinite]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-widest uppercase">System Audit Active</h2>
          <p className="text-emerald-400/80 font-mono text-sm h-6">{statusMessages[currentMessage]}</p>
        </div>

        <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2 mb-3 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs font-mono text-slate-500 text-right">{progress}%</div>
      </div>
    </div>
  );
};
