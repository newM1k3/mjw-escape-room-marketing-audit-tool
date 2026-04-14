import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { usePlaybook, usePlaybookAccess } from '../hooks/usePlaybooks';
import { useAuth } from '../contexts/AuthContext';
import { LockScreen } from '../components/LockScreen';

export function PlaybookReader() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { playbook, loading: playbookLoading } = usePlaybook(id!);
  const { hasAccess, loading: accessLoading } = usePlaybookAccess(id!, user?.id);
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const loading = playbookLoading || accessLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading playbook...</p>
        </div>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Playbook not found</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Return to Library
          </Link>
        </div>
      </div>
    );
  }

  const isFree = playbook.price === 0;
  const canAccess = isFree || hasAccess;

  if (!canAccess) {
    return <LockScreen playbook={playbook} />;
  }

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const contentSections = playbook.content.split('\n## ').filter(Boolean);
  const firstSection = contentSections[0];
  const steps = contentSections.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-sm font-medium bg-slate-100 text-slate-700 rounded-md">
                {playbook.category}
              </span>
              {isFree ? (
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-md">
                  Free
                </span>
              ) : (
                <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-md">
                  Premium
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {playbook.title}
            </h1>
            <p className="text-slate-600">
              {playbook.description}
            </p>
          </div>

          <div className="p-8">
            <div className="prose prose-slate max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: firstSection.replace(/^# .*\n\n/, '') }} />
            </div>

            {steps.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Steps</h2>
                {steps.map((step, index) => {
                  const [title, ...content] = step.split('\n');
                  const isChecked = checkedSteps.has(index);

                  return (
                    <div
                      key={index}
                      className={`border border-slate-200 rounded-lg p-6 transition-all ${
                        isChecked ? 'bg-green-50 border-green-300' : 'bg-white'
                      }`}
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className="flex items-start gap-3 w-full text-left group"
                      >
                        <div className="mt-1 flex-shrink-0">
                          {isChecked ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-2 ${
                            isChecked ? 'text-green-900' : 'text-slate-900'
                          }`}>
                            {title}
                          </h3>
                          <div className={`text-sm ${
                            isChecked ? 'text-green-800' : 'text-slate-600'
                          }`}>
                            {content.join('\n')}
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
