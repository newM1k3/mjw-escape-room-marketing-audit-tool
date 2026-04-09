import { useState } from 'react';
import { HeroInput } from './components/HeroInput';
import { LoadingState } from './components/LoadingState';
import { Scorecard } from './components/Scorecard';
import { simulateAudit } from './utils/simulateAudit';
import { AuditResult } from './types/audit';

type AppState = 'input' | 'loading' | 'results';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const handleSubmit = async (url: string) => {
    setState('loading');

    try {
      const result = await simulateAudit(url);
      setAuditResult(result);
      setState('results');
    } catch (error) {
      console.error('Audit failed:', error);
      setState('input');
    }
  };

  const handleReset = () => {
    setState('input');
    setAuditResult(null);
  };

  return (
    <>
      {state === 'input' && <HeroInput onSubmit={handleSubmit} />}
      {state === 'loading' && <LoadingState />}
      {state === 'results' && auditResult && (
        <Scorecard result={auditResult} onReset={handleReset} />
      )}
    </>
  );
}

export default App;
