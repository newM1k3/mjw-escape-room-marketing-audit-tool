import { useState, FormEvent } from 'react';
import { Search, AlertCircle, Zap, Shield, BarChart3 } from 'lucide-react';

interface HeroInputProps {
  onSubmit: (url: string) => void;
  error?: string | null;
}

export const HeroInput = ({ onSubmit, error }: HeroInputProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">Free Marketing Audit</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Is Your Escape Room
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Invisible Online?
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Get a real-time marketing scorecard powered by Google PageSpeed Insights. See exactly where you're losing bookings.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL (e.g. escapemaze.ca)"
                className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
              />
            </div>
            <button
              type="submit"
              disabled={!url.trim()}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
            >
              Run Free Audit
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: Zap, title: 'Real-Time Scan', desc: 'Live data from Google PageSpeed Insights — not guesswork.' },
              { icon: Shield, title: 'SEO Health Check', desc: 'SSL, mobile, meta tags, and page speed scored instantly.' },
              { icon: BarChart3, title: 'Full Scorecard', desc: 'Website + GBP + social + reviews in one report.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <Icon className="w-5 h-5 text-emerald-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">{title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center pb-6 text-slate-700 text-xs">
        Powered by Google PageSpeed Insights API
      </footer>
    </div>
  );
};
