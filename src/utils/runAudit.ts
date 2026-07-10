import { AuditResult } from '../types/audit';

export interface SelfAssessmentAnswers {
  hasGbpClaimed: boolean;
  hasBusinessDescription: boolean;
  hasGbpPhotos: boolean;
  hasFacebook: boolean;
  hasInstagram: boolean;
  hasRecentReviews: boolean;
}

export interface PageSpeedData {
  url: string;
  hasSSL: boolean;
  isMobileFriendly: boolean;
  hasTitleTag: boolean;
  hasMetaDescription: boolean;
  performanceScore: number;
  seoScore: number;
  firstContentfulPaint: string;
  speedIndex: string;
}

export async function fetchPageSpeedData(url: string): Promise<PageSpeedData> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
  const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&strategy=mobile&category=performance&category=seo${apiKey ? `&key=${apiKey}` : ''}`;

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error(`PageSpeed API error: ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'PageSpeed API returned an error');

  const audits = data.lighthouseResult?.audits ?? {};
  const categories = data.lighthouseResult?.categories ?? {};

  return {
    url: normalizedUrl,
    hasSSL: audits['is-on-https']?.score === 1,
    isMobileFriendly: audits['viewport']?.score === 1,
    hasTitleTag: audits['document-title']?.score === 1,
    hasMetaDescription: audits['meta-description']?.score === 1,
    performanceScore: Math.round((categories['performance']?.score ?? 0) * 100),
    seoScore: Math.round((categories['seo']?.score ?? 0) * 100),
    firstContentfulPaint: audits['first-contentful-paint']?.displayValue ?? 'N/A',
    speedIndex: audits['speed-index']?.displayValue ?? 'N/A',
  };
}

export function buildAuditResult(pageSpeed: PageSpeedData, selfAssessment: SelfAssessmentAnswers): AuditResult {
  const seoChecks = [
    { label: 'SSL certificate active (HTTPS)', passed: pageSpeed.hasSSL },
    { label: 'Mobile-friendly design', passed: pageSpeed.isMobileFriendly },
    { label: 'Page title tag optimized', passed: pageSpeed.hasTitleTag },
    { label: 'Meta description present', passed: pageSpeed.hasMetaDescription },
    { label: `Page speed score: ${pageSpeed.performanceScore}/100`, passed: pageSpeed.performanceScore >= 50 },
  ];
  const seoScore = Math.round((seoChecks.filter(c => c.passed).length / seoChecks.length) * 100);

  const gbpChecks = [
    { label: 'Google Business Profile claimed & verified', passed: selfAssessment.hasGbpClaimed },
    { label: 'Business description written', passed: selfAssessment.hasBusinessDescription },
    { label: 'Photos uploaded to GBP', passed: selfAssessment.hasGbpPhotos },
  ];
  const gbpScore = Math.round((gbpChecks.filter(c => c.passed).length / gbpChecks.length) * 100);

  const socialChecks = [
    { label: 'Active Facebook page', passed: selfAssessment.hasFacebook },
    { label: 'Instagram profile active', passed: selfAssessment.hasInstagram },
  ];
  const socialScore = Math.round((socialChecks.filter(c => c.passed).length / socialChecks.length) * 100);

  const reviewChecks = [
    { label: 'Actively receiving Google reviews', passed: selfAssessment.hasRecentReviews },
    { label: 'Review response strategy in place', passed: selfAssessment.hasGbpClaimed },
  ];
  const reviewScore = Math.round((reviewChecks.filter(c => c.passed).length / reviewChecks.length) * 100);

  const businessName = pageSpeed.url
    .replace(/^https?:\/\/(www\.)?/, '')
    .split('/')[0]
    .split('.')[0]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return {
    overallScore: Math.round((seoScore + gbpScore + socialScore + reviewScore) / 4),
    businessName,
    categories: {
      googleListing: { name: 'Google Listing', score: gbpScore, icon: 'MapPin', checks: gbpChecks },
      websiteSeo: { name: 'Website SEO', score: seoScore, icon: 'Globe', checks: seoChecks },
      socialPresence: { name: 'Social Presence', score: socialScore, icon: 'Share2', checks: socialChecks },
      reviewVelocity: { name: 'Review Velocity', score: reviewScore, icon: 'Star', checks: reviewChecks },
    },
  };
}
