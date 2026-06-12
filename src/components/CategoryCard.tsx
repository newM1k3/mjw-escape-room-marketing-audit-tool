/**
 * CategoryCard.tsx
 *
 * Displays a single audit category (e.g. Google Listing, Website SEO)
 * with its score, colour-coded status, and a checklist of individual checks.
 * Used by Scorecard.tsx to render the 2×2 results grid.
 */

import { CheckCircle2, XCircle, MapPin, Globe, Share2, Star } from 'lucide-react';
import { AuditCategory } from '../types/audit';

interface CategoryCardProps {
  category: AuditCategory;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MapPin:  <MapPin  className="w-5 h-5" />,
  Globe:   <Globe   className="w-5 h-5" />,
  Share2:  <Share2  className="w-5 h-5" />,
  Star:    <Star    className="w-5 h-5" />,
};

function getScoreColour(score: number) {
  if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' };
  if (score >= 50) return { text: 'text-yellow-600',  bg: 'bg-yellow-50',  border: 'border-yellow-200',  badge: 'bg-yellow-100 text-yellow-700'  };
  return              { text: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200',     badge: 'bg-red-100 text-red-700'     };
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 50) return 'Needs Work';
  return 'Critical';
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const colours = getScoreColour(category.score);

  return (
    <div className={`rounded-xl border-2 ${colours.border} bg-white p-6 shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`${colours.text}`}>
            {ICON_MAP[category.icon] ?? <Globe className="w-5 h-5" />}
          </span>
          <h3 className="font-semibold text-slate-800 text-base">{category.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${colours.text}`}>{category.score}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colours.badge}`}>
            {getScoreLabel(category.score)}
          </span>
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${colours.text.replace('text-', 'bg-')}`}
          style={{ width: `${category.score}%` }}
        />
      </div>

      {/* Check list */}
      <ul className="space-y-2">
        {category.checks.map((check, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            {check.passed
              ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              : <XCircle      className="w-4 h-4 text-red-400     mt-0.5 flex-shrink-0" />
            }
            <span className={check.passed ? 'text-slate-700' : 'text-slate-500'}>
              {check.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
