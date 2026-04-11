export interface AuditCheck {
  label: string;
  passed: boolean;
}

export interface AuditCategory {
  name: string;
  score: number;
  icon: string;
  checks: AuditCheck[];
}

export interface AuditResult {
  overallScore: number;
  businessName: string;
  categories: {
    googleListing: AuditCategory;
    websiteSeo: AuditCategory;
    socialPresence: AuditCategory;
    reviewVelocity: AuditCategory;
  };
}
