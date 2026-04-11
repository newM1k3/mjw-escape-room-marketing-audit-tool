import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { Playbook } from '../lib/database.types';

export function usePlaybooks(category?: string) {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaybooks() {
      try {
        setLoading(true);
        let filter = 'is_published = true';

        if (category && category !== 'All') {
          filter += ` && category = "${category}"`;
        }

        const records = await pb.collection('playbooks').getFullList<Playbook>({
          filter,
          sort: '-created',
        });

        setPlaybooks(records);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch playbooks');
      } finally {
        setLoading(false);
      }
    }

    fetchPlaybooks();
  }, [category]);

  return { playbooks, loading, error };
}

export function usePlaybook(id: string) {
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaybook() {
      if (!id) return;
      try {
        setLoading(true);
        const record = await pb.collection('playbooks').getOne<Playbook>(id);
        setPlaybook(record);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch playbook');
      } finally {
        setLoading(false);
      }
    }

    fetchPlaybook();
  }, [id]);

  return { playbook, loading, error };
}

export function usePlaybookAccess(playbookId: string, userId: string | undefined) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      if (!userId || !playbookId) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const records = await pb.collection('playbook_purchases').getList(1, 1, {
          filter: `user_id = "${userId}" && playbook_id = "${playbookId}"`,
        });

        setHasAccess(records.items.length > 0);
      } catch (err) {
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [playbookId, userId]);

  return { hasAccess, loading };
}
