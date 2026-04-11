import { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, MapPin } from 'lucide-react';
import { SelfAssessmentAnswers } from '../utils/runAudit';

interface SelfAssessmentProps {
  websiteUrl: string;
  onComplete: (answers: SelfAssessmentAnswers) => void;
}

interface Question {
  key: keyof SelfAssessmentAnswers;
  label: string;
  hint: string;
}

const QUESTIONS: Question[] = [
  {
    key: 'hasGbpClaimed',
    label: 'Have you claimed and verified your Google Business Profile?',
    hint: 'Verified profiles appear in Google Maps and local search results.',
  },
  {
    key: 'hasBusinessDescription',
    label: 'Does your Google Business Profile have a written business description?',
    hint: 'A description helps customers understand what makes your experience unique.',
  },
  {
    key: 'hasGbpPhotos',
    label: 'Have you uploaded photos to your Google Business Profile?',
    hint: 'Listings with photos receive significantly more clicks and calls.',
  },
  {
    key: 'hasFacebook',
    label: 'Do you have an active Facebook page for your business?',
    hint: 'Active means posted within the last 30 days.',
  },
  {
    key: 'hasInstagram',
    label: 'Do you have an active Instagram profile?',
    hint: 'Active means posted within the last 30 days.',
  },
  {
    key: 'hasRecentReviews',
    label: 'Have you received new Google reviews in the last 30 days?',
    hint: 'Review velocity is a key local ranking signal.',
  },
];

export const SelfAssessment = ({ websiteUrl, onComplete }: SelfAssessmentProps) => {
  const [answers, setAnswers] = useState<Partial<SelfAssessmentAnswers>>({});

  const allAnswered = QUESTIONS.every(q => answers[q.key] !== undefined);

  const handleAnswer = (key: keyof SelfAssessmentAnswers, value: boolean) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    onComplete(answers as SelfAssessmentAnswers);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <MapPin className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Almost there — 6 quick questions
          </h2>
          <p className="text-slate-400">
            Website scan complete for{' '}
            <span className="font-medium text-slate-200">{websiteUrl}</span>.
            {' '}Now tell us about your Google presence.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>{answeredCount} of {QUESTIONS.length} answered</span>
            <span>{Math.round((answeredCount / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {QUESTIONS.map((q, index) => {
            const answered = answers[q.key];
            return (
              <div
                key={q.key}
                className={`bg-slate-900 rounded-xl border-2 p-5 transition-all ${
                  answered !== undefined ? 'border-emerald-500/40' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {answered !== undefined ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-white text-sm leading-snug">
                      {index + 1}. {q.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{q.hint}</p>
                  </div>
                </div>
                <div className="flex gap-3 pl-8">
                  <button
                    onClick={() => handleAnswer(q.key, true)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                      answers[q.key] === true
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-transparent border-slate-700 text-slate-400 hover:border-emerald-500/50 hover:text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(q.key, false)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                      answers[q.key] === false
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-transparent border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all ${
            allAnswered
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          Generate My Full Report
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
