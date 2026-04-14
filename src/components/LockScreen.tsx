import { useState } from 'react';
import { Lock, Shield, CheckCircle } from 'lucide-react';
import { Playbook } from '../lib/database.types';
import { useAuth } from '../contexts/AuthContext';
import { stripePromise } from '../lib/stripe';

interface LockScreenProps {
  playbook: Playbook;
}

export function LockScreen({ playbook }: LockScreenProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!user) {
      setError('You must be logged in to purchase.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('YOUR_BACKEND_API_URL/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playbookId: playbook.id,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Full access to all SOP steps and procedures',
    'Downloadable templates and checklists',
    'Lifetime updates to this playbook',
    'Direct support from the MJW team',
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm border border-white/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Premium Playbook</h2>
            <p className="text-slate-300 text-sm">
              Unlock this playbook to access the complete standard operating procedure.
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-slate-900 mb-2">
              ${playbook.price.toFixed(2)}
            </div>
            <p className="text-slate-500 text-sm">One-time payment, lifetime access</p>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Unlock Now for ${playbook.price.toFixed(2)}
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
