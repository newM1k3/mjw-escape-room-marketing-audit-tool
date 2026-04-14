import { Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Playbook } from '../lib/database.types';
import { useAuth } from '../contexts/AuthContext';
import { usePlaybookAccess } from '../hooks/usePlaybooks';

interface PlaybookCardProps {
  playbook: Playbook;
}

export function PlaybookCard({ playbook }: PlaybookCardProps) {
  const { user } = useAuth();
  const { hasAccess } = usePlaybookAccess(playbook.id, user?.id);

  const isFree = playbook.price === 0;
  const isPurchased = hasAccess;

  const getButtonConfig = () => {
    if (isFree) {
      return {
        text: 'View',
        className: 'bg-green-600 hover:bg-green-700 text-white',
        icon: null,
      };
    }
    if (isPurchased) {
      return {
        text: 'Open',
        className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300',
        icon: <CheckCircle className="w-4 h-4" />,
      };
    }
    return {
      text: `Unlock $${playbook.price.toFixed(2)}`,
      className: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: <Lock className="w-4 h-4" />,
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">
            {playbook.title}
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md">
            {playbook.category}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {playbook.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-slate-900">
            {isFree ? 'Free' : `$${playbook.price.toFixed(2)}`}
          </div>

          <Link
            to={`/playbook/${playbook.id}`}
            className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${buttonConfig.className}`}
          >
            {buttonConfig.icon}
            {buttonConfig.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
