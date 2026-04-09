import { CheckCircle2, XCircle, MapPin, Globe, Share2, Star, Video as LucideIcon } from 'lucide-react';
import { AuditCategory } from '../types/audit';

interface CategoryCardProps {
  category: AuditCategory;
}

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Globe,
  Share2,
  Star,
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = iconMap[category.icon] || MapPin;

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 50) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getScoreBg(category.score)}`}>
            <Icon className={`w-5 h-5 ${getScoreColor(category.score)}`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{category.name}</h3>
          </div>
        </div>
        <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
          {category.score}
        </div>
      </div>

      <div className="space-y-2">
        {category.checks.map((check, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            {check.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            )}
            <span className={check.passed ? 'text-slate-700' : 'text-slate-600'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
