import { useState } from 'react';
import { Search, AlertCircle, Crosshair } from 'lucide-react';

interface HeroInputProps {
  onSubmit: (url: string) => void;
  error?: string | null;
}

export const HeroInput = ({ onSubmit, error: apiError }: HeroInputProps) => {
  const [url, setUrl] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!url.trim()) return setLocalError('Please enter a URL');
    if (!/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(url)) {
      return setLocalError('Please enter a valid URL');
    }
    onSubmit(url);
  };

  const error = localError || apiError;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <Crosshair className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Is Your Escape Room <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Losing Players?</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Run a deep-scan audit on your website SEO, Google Profile, and review strategy to uncover the hidden leaks in your marketing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          {error && (
            <div className="p-4 bg-red-950/50 border border-red-900/50 rounded-xl text-red-400 text-sm flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setLocalError(''); }}
              placeholder="Enter your website URL (e.g. escapemaze.ca)"
              className="w-full pl-12 pr-6 py-5 text-lg bg-slate-900 border-2 border-slate-800 text-white rounded-xl focus:outline-none focus:ring-0 focus:border-emerald-500 transition-all placeholder-slate-600 shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1 uppercase tracking-wide"
          >
            Initiate Scan
          </button>
        </form>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Data Scan</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> 100% Free</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Instant Results</div>
        </div>
      </div>
    </div>
  );
};
