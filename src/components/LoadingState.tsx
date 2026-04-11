import { useEffect, useState } from 'react';

const STEPS = [
  'Connecting to Google PageSpeed Insights...',
  'Analyzing mobile performance...',
  'Checking SSL and security headers...',
  'Auditing SEO meta tags...',
  'Calculating your scores...',
];

export const LoadingState = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-slate-800" />
          <div className="absolute w-20 h-20 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin" />
          <div className="absolute w-12 h-12 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Scanning your website...
        </h2>
        <p className="text-slate-400 text-sm mb-10">
          Running a live audit via Google PageSpeed Insights. This takes 5–10 seconds.
        </p>

        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                i < stepIndex
                  ? 'text-emerald-400'
                  : i === stepIndex
                  ? 'text-white'
                  : 'text-slate-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all ${
                i < stepIndex
                  ? 'bg-emerald-400'
                  : i === stepIndex
                  ? 'bg-white animate-pulse'
                  : 'bg-slate-700'
              }`} />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
