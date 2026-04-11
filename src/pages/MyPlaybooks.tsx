import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { pb } from '../lib/pocketbase';
import { Playbook } from '../lib/database.types';

export function MyPlaybooks() {
  const { user } = useAuth();
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyPlaybooks() {
      if (!user) return;

      try {
        setLoading(true);
        const purchases = await pb.collection('playbook_purchases').getFullList({
          filter: `user_id = "${user.id}"`,
        });

        if (purchases && purchases.length > 0) {
          const playbookIds = purchases.map((p) => `id="${p.playbook_id}"`).join(' || ');

          const playbooksData = await pb.collection('playbooks').getFullList<Playbook>({
            filter: playbookIds,
          });

          setPlaybooks(playbooksData);
        } else {
          setPlaybooks([]);
        }
      } catch (error) {
        console.error('Error fetching playbooks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyPlaybooks();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading your playbooks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Playbooks</h1>
          <p className="text-slate-600">Your purchased playbooks and saved SOPs</p>
        </div>

        {playbooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No playbooks yet
            </h2>
            <p className="text-slate-600 mb-6">
              Browse the library to find and unlock playbooks
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Browse Library
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playbooks.map((playbook) => (
              <Link
                key={playbook.id}
                to={`/playbook/${playbook.id}`}
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
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
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    Open Playbook
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
