export interface Playbook {
  id: string;
  title: string;
  description: string;
  content: string;
  price: number;
  category: string;
  is_published: boolean;
  created: string;
  updated: string;
}

export interface PlaybookPurchase {
  id: string;
  user_id: string;
  playbook_id: string;
  purchase_date: string;
  created: string;
  updated: string;
}
