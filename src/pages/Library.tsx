import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { PlaybookCard } from '../components/PlaybookCard';
import { usePlaybooks } from '../hooks/usePlaybooks';

const CATEGORIES = ['All', 'Marketing', 'Operations', 'HR'];

export function Library() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { playbooks, loading, error } = usePlaybooks(selectedCategory);

  const filteredPlaybooks = playbooks.filter((playbook) =>
    playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playbook.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Playbook Library
          </h1>
          <p className="text-slate-600">
            Browse and unlock professional SOPs to streamline your operations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search playbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading playbooks...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && filteredPlaybooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No playbooks found matching your criteria.</p>
          </div>
        )}

        {!loading && !error && filteredPlaybooks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaybooks.map((playbook) => (
              <PlaybookCard key={playbook.id} playbook={playbook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
