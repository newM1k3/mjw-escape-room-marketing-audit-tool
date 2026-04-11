import { useState } from 'react';
import { HeroInput } from './components/HeroInput';
import { LoadingState } from './components/LoadingState';
import { SelfAssessment } from './components/SelfAssessment';
import { Scorecard } from './components/Scorecard';
import { fetchPageSpeedData, buildAuditResult, PageSpeedData, SelfAssessmentAnswers } from './utils/runAudit';
import { AuditResult } from './types/audit';

type AppState = 'input' | 'loading' | 'self-assessment' | 'results';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [pageSpeedData, setPageSpeedData] = useState<PageSpeedData | null>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setSubmittedUrl(url);
    setError(null);
    setState('loading');

    try {
      const data = await fetchPageSpeedData(url);
      setPageSpeedData(data);
      setState('self-assessment');
    } catch (err) {
      console.error('PageSpeed fetch failed:', err);
      setError(err instanceof Error ? err.message : 'Audit failed. Please check the URL and try again.');
      setState('input');
    }
  };

  const handleSelfAssessmentComplete = (answers: SelfAssessmentAnswers) => {
    if (!pageSpeedData) return;
    const result = buildAuditResult(pageSpeedData, answers);
    setAuditResult(result);
    setState('results');
  };

  const handleReset = () => {
    setState('input');
    setAuditResult(null);
    setPageSpeedData(null);
    setSubmittedUrl('');
    setError(null);
  };

  return (
    <>
      {state === 'input' && (
        <HeroInput onSubmit={handleUrlSubmit} error={error} />
      )}
      {state === 'loading' && <LoadingState />}
      {state === 'self-assessment' && (
        <SelfAssessment
          websiteUrl={submittedUrl}
          onComplete={handleSelfAssessmentComplete}
        />
      )}
      {state === 'results' && auditResult && (
        <Scorecard result={auditResult} onReset={handleReset} />
      )}
    </>
  );
}

export default App;
