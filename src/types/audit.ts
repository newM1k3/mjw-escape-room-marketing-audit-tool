export interface AuditCheck {
  label: string;
  passed: boolean;
}

export interface AuditCategory {
  name: string;
  score: number;
  checks: AuditCheck[];
  icon: string;
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
