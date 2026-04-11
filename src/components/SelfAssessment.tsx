import { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, ShieldAlert } from 'lucide-react';
import { SelfAssessmentAnswers } from '../utils/runAudit';

interface SelfAssessmentProps {
  websiteUrl: string;
  onComplete: (answers: SelfAssessmentAnswers) => void;
}

const QUESTIONS = [
  { key: 'hasGbpClaimed', label: 'Have you claimed and verified your Google Business Profile?', hint: 'Verified profiles appear in Google Maps.' },
  { key: 'hasBusinessDescription', label: 'Does your Google Profile have a written business description?', hint: 'Helps customers understand your rooms.' },
  { key: 'hasGbpPhotos', label: 'Have you uploaded high-quality photos to your Google Profile?', hint: 'Listings with photos receive more clicks.' },
  { key: 'hasFacebook', label: 'Do you have an active Facebook page?', hint: 'Active means posted within the last 30 days.' },
  { key: 'hasInstagram', label: 'Do you have an active Instagram profile?', hint: 'Active means posted within the last 30 days.' },
  { key: 'hasRecentReviews', label: 'Have you received new Google reviews in the last 30 days?', hint: 'Review velocity is a key ranking signal.' },
] as const;

export const SelfAssessment = ({ websiteUrl, onComplete }: SelfAssessmentProps) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const allAnswered = QUESTIONS.every(q => answers[q.key] !== undefined);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 relative">
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-3">Manual Input Required</h2>
          <p className="text-slate-400">Automated scan of <span className="text-emerald-400">{websiteUrl}</span> complete. We need 6 quick answers to finalize your threat assessment.</p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
            <span>DATA COLLECTION</span>
            <span>{Math.round((answeredCount / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1">
            <div className="bg-amber-500 h-1 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {QUESTIONS.map((q, i) => {
            const answered = answers[q.key];
            return (
              <div key={q.key} className={`bg-slate-900/50 border rounded-xl p-6 transition-all ${answered !== undefined ? 'border-emerald-500/30' : 'border-slate-800'}`}>
                <div className="flex items-start gap-4 mb-4">
                  {answered !== undefined ? <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" /> : <Circle className="w-6 h-6 text-slate-700 flex-shrink-0" />}
                  <div>
                    <p className="font-medium text-slate-200 text-lg leading-snug mb-1">{i + 1}. {q.label}</p>
                    <p className="text-sm text-slate-500">{q.hint}</p>
                  </div>
                </div>
                <div className="flex gap-4 pl-10">
                  <button onClick={() => setAnswers(p => ({ ...p, [q.key]: true }))} className={`flex-1 py-3 rounded-lg text-sm font-bold border transition-all uppercase tracking-wider ${answers[q.key] === true ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-emerald-500/50'}`}>Yes</button>
                  <button onClick={() => setAnswers(p => ({ ...p, [q.key]: false }))} className={`flex-1 py-3 rounded-lg text-sm font-bold border transition-all uppercase tracking-wider ${answers[q.key] === false ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-red-500/50'}`}>No</button>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => onComplete(answers as SelfAssessmentAnswers)} disabled={!allAnswered} className={`w-full py-5 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-wide ${allAnswered ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'}`}>
          Decrypt Final Report <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
