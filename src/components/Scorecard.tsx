import { ArrowRight, RefreshCw, Shield } from 'lucide-react';
import { AuditResult } from '../types/audit';
import { CategoryCard } from './CategoryCard';

interface ScorecardProps {
  result: AuditResult;
  onReset: () => void;
}

export const Scorecard = ({ result, onReset }: ScorecardProps) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBorderColor = (score: number): string => {
    if (score >= 80) return 'border-emerald-600';
    if (score >= 50) return 'border-yellow-600';
    return 'border-red-600';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 50) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Audit Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Marketing Health Report
          </h1>
          <p className="text-lg text-slate-600">
            {result.businessName}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.overallScore / 100)}`}
                className={getScoreColor(result.overallScore)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold ${getScoreColor(result.overallScore)}`}>
                {result.overallScore}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {getScoreLabel(result.overallScore)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <CategoryCard category={result.categories.googleListing} />
          <CategoryCard category={result.categories.websiteSeo} />
          <CategoryCard category={result.categories.socialPresence} />
          <CategoryCard category={result.categories.reviewVelocity} />
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Want a Full Playbook to Fix These Issues?
              </h3>
              <p className="text-indigo-100">
                Get personalized strategies, templates, and step-by-step guidance to improve your score.
              </p>
            </div>
            <a
              href="#playbook-portal"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get the Playbook
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Analyze Another Business
          </button>
        </div>
      </div>
    </div>
  );
};
