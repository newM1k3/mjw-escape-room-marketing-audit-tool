/**
 * simulateAudit.ts
 *
 * Thin orchestration wrapper called by App.tsx.
 * Fetches live PageSpeed data for the supplied URL, then combines it with
 * a set of default self-assessment answers to produce a full AuditResult.
 *
 * Self-assessment answers default to false so the audit is conservative
 * when the user has only supplied a URL (no manual checklist step).
 * These can be extended later if a self-assessment UI step is added.
 */

import { AuditResult } from '../types/audit';
import { fetchPageSpeedData, buildAuditResult, SelfAssessmentAnswers } from './runAudit';

const DEFAULT_SELF_ASSESSMENT: SelfAssessmentAnswers = {
  hasGbpClaimed: false,
  hasBusinessDescription: false,
  hasGbpPhotos: false,
  hasFacebook: false,
  hasInstagram: false,
  hasRecentReviews: false,
};

/**
 * Runs a full marketing audit for the given URL.
 *
 * @param url - The venue website or Google Business Profile URL entered by the user.
 * @returns    A resolved AuditResult containing scores and check details.
 */
export async function simulateAudit(url: string): Promise<AuditResult> {
  const pageSpeed = await fetchPageSpeedData(url);
  return buildAuditResult(pageSpeed, DEFAULT_SELF_ASSESSMENT);
}
