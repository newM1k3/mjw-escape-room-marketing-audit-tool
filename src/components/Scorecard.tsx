import { ArrowRight, RefreshCw, ShieldAlert, CheckCircle2, XCircle, MapPin, Globe, Share2, Star } from 'lucide-react';
import { AuditResult, AuditCategory } from '../types/audit';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { MapPin, Globe, Share2, Star };

const CategoryCard = ({ category }: { category: AuditCategory }) => {
  const Icon = iconMap[category.icon] || MapPin;
  const isGood = category.score >= 80;
  const isWarn = category.score >= 50 && category.score < 80;
  const colorClass = isGood ? 'text-emerald-400' : isWarn ? 'text-amber-400' : 'text-red-400';
  const borderClass = isGood ? 'border-emerald-500/30' : isWarn ? 'border-amber-500/30' : 'border-red-500/30';
  const bgClass = isGood ? 'bg-emerald-500/10' : isWarn ? 'bg-amber-500/10' : 'bg-red-500/10';

  return (
    <div className={`bg-slate-900 rounded-xl border ${borderClass} p-6 relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 ${bgClass} blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none`} />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-slate-950 border ${borderClass}`}>
            <Icon className={`w-5 h-5 ${colorClass}`} />
          </div>
          <h3 className="font-bold text-white text-lg">{category.name}</h3>
        </div>
        <div className={`text-3xl font-black ${colorClass}`}>{category.score}</div>
      </div>
      <div className="space-y-3 relative z-10">
        {category.checks.map((check, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            {check.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
            <span className={check.passed ? 'text-slate-300' : 'text-slate-500'}>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scorecard = ({ result, onReset }: { result: AuditResult; onReset: () => void }) => {
  const isGood = result.overallScore >= 80;
  const isWarn = result.overallScore >= 50 && result.overallScore < 80;
  const colorClass = isGood ? 'text-emerald-400' : isWarn ? 'text-amber-400' : 'text-red-400';
  const strokeClass = isGood ? 'text-emerald-500' : isWarn ? 'text-amber-500' : 'text-red-500';
  const label = isGood ? 'Secure' : isWarn ? 'Vulnerable' : 'Critical Risk';

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm font-mono mb-6 uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-emerald-500" /> Assessment Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">Threat Report</h1>
          <p className="text-xl text-emerald-400 font-mono">{result.businessName}</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="relative">
            <svg className="transform -rotate-90 w-48 h-48 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-900" />
              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${2 * Math.PI * 84}`} strokeDashoffset={`${2 * Math.PI * 84 * (1 - result.overallScore / 100)}`} className={strokeClass} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-5xl font-black ${colorClass}`}>{result.overallScore}</div>
              <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">{label}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <CategoryCard category={result.categories.googleListing} />
          <CategoryCard category={result.categories.websiteSeo} />
          <CategoryCard category={result.categories.socialPresence} />
          <CategoryCard category={result.categories.reviewVelocity} />
        </div>

        <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl p-8 md:p-10 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3">Your Escape Room is Leaking Revenue</h3>
              <p className="text-slate-400 max-w-xl">Get the exact blueprint to patch these vulnerabilities, dominate local search, and fill your empty slots. Download the full marketing playbook.</p>
            </div>
            <a href="#playbook-portal" className="flex-shrink-0 inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              Get The Playbook <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button onClick={onReset} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 font-mono text-sm uppercase tracking-widest transition-colors">
            <RefreshCw className="w-4 h-4" /> Run New Scan
          </button>
        </div>
      </div>
    </div>
  );
};
