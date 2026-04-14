import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface HeroInputProps {
  onSubmit: (url: string) => void;
}

export const HeroInput = ({ onSubmit }: HeroInputProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (input: string): boolean => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return urlPattern.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    onSubmit(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <Search className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How Healthy Is Your Escape Room's Marketing?
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Get a comprehensive audit of your Google Business Profile, website SEO, social presence, and review strategy in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="Enter your Google Business Profile URL"
              className={`w-full px-6 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
              }`}
            />
            {error && (
              <div className="absolute left-0 right-0 top-full mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Run Free Audit
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>100% Free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>No Credit Card</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};
