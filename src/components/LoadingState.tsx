import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const statusMessages = [
  'Scanning Google Listing...',
  'Checking Website SEO...',
  'Analyzing Review Velocity...',
  'Evaluating Social Presence...',
  'Generating Your Score...',
];

export const LoadingState = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % statusMessages.length);
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Analyzing Your Marketing...
          </h2>
          <p className="text-slate-600 text-lg min-h-[28px] transition-all">
            {statusMessages[currentMessage]}
          </p>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-slate-500">
          {progress}% Complete
        </div>
      </div>
    </div>
  );
};
