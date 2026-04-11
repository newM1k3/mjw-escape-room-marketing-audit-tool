import { Globe, MapPin, Share2, Star, CheckCircle2, XCircle, RotateCcw, TrendingUp } from 'lucide-react';
import { AuditResult, AuditCategory } from '../types/audit';

interface ScorecardProps {
  result: AuditResult;
  onReset: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  MapPin,
  Share2,
  Star,
};

function scoreColor(score: number) {
  if (score >= 75) return 'text-emerald-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}

function scoreBg(score: number) {
  if (score >= 75) return 'bg-emerald-500/10 border-emerald-500/20';
  if (score >= 50) return 'bg-amber-500/10 border-amber-500/20';
  return 'bg-red-500/10 border-red-500/20';
}

function scoreLabel(score: number) {
  if (score >= 75) return 'Strong';
  if (score >= 50) return 'Needs Work';
  return 'Critical';
}

function OverallRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} stroke="#1e293b" strokeWidth="10" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className={`text-4xl font-extrabold ${scoreColor(score)}`}>{score}</div>
        <div className="text-slate-500 text-xs">/ 100</div>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: AuditCategory }) {
  const Icon = ICON_MAP[category.icon] ?? Globe;

  return (
    <div className={`bg-slate-900 border rounded-xl p-5 ${scoreBg(category.score)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-white font-semibold text-sm">{category.name}</span>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${scoreColor(category.score)}`}>{category.score}</div>
          <div className={`text-xs font-medium ${scoreColor(category.score)}`}>{scoreLabel(category.score)}</div>
        </div>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4">
        <div
          className={`h-1.5 rounded-full transition-all duration-700 ${
            category.score >= 75 ? 'bg-emerald-500' : category.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
          }`}
          style={{ width: `${category.score}%` }}
        />
      </div>

      <ul className="space-y-2">
        {category.checks.map((check, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            {check.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <span className={check.passed ? 'text-slate-300' : 'text-slate-500'}>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Scorecard = ({ result, onReset }: ScorecardProps) => {
  const categories = Object.values(result.categories);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">Audit Complete</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-1">
            {result.businessName}
          </h2>
          <p className="text-slate-400 mb-8">Marketing Visibility Report</p>

          <OverallRing score={result.overallScore} />

          <div className="mt-4">
            <div className={`text-lg font-bold ${scoreColor(result.overallScore)}`}>
              Overall Score: {scoreLabel(result.overallScore)}
            </div>
            <p className="text-slate-500 text-sm mt-1">
              {result.overallScore >= 75
                ? 'Your online presence is strong. A few tweaks could push you to the top.'
                : result.overallScore >= 50
                ? 'You have a foundation, but key gaps are costing you bookings.'
                : 'Critical issues detected. Fixing these could significantly increase revenue.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 text-center">
          <h3 className="text-white font-bold text-lg mb-2">Want a Full Action Plan?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Book a free 15-minute strategy call and we'll walk through exactly how to fix your weak spots.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20">
            Book Free Strategy Call
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Audit another website
          </button>
        </div>
      </div>
    </div>
  );
};
