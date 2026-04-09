import { AuditResult } from '../types/audit';

const businessNames = [
  'Mystery Escape Adventures',
  'The Puzzle Room',
  'Breakout Zone',
  'Enigma Escape',
  'Lock & Key Entertainment',
];

const getRandomScore = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const simulateAudit = async (url: string): Promise<AuditResult> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const urlHash = url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = urlHash % 100;

  const googleScore = getRandomScore(45, 95);
  const seoScore = getRandomScore(40, 90);
  const socialScore = getRandomScore(30, 85);
  const reviewScore = getRandomScore(50, 100);

  const overallScore = Math.round((googleScore + seoScore + socialScore + reviewScore) / 4);

  const businessName = getRandomElement(businessNames);

  const photoCount = getRandomScore(5, 25);
  const hasDescription = seed > 30;
  const hasHours = seed > 20;
  const hasAttributes = seed > 40;

  const hasTitleTags = seed > 35;
  const isMobileFriendly = seed > 25;
  const hasSSL = seed > 15;

  const hasFacebook = seed > 30;
  const hasInstagram = seed > 40;
  const hasLinkedAccounts = seed > 50;

  const reviewCount = getRandomScore(20, 150);
  const recentReviews = seed > 35;
  const avgRating = (getRandomScore(35, 50) / 10).toFixed(1);

  return {
    overallScore,
    businessName,
    categories: {
      googleListing: {
        name: 'Google Listing Completeness',
        score: googleScore,
        icon: 'MapPin',
        checks: [
          { label: `Has ${photoCount} photos`, passed: photoCount >= 10 },
          { label: 'Business description optimized', passed: hasDescription },
          { label: 'Operating hours listed', passed: hasHours },
          { label: 'Business attributes configured', passed: hasAttributes },
        ],
      },
      websiteSeo: {
        name: 'Website SEO Basics',
        score: seoScore,
        icon: 'Globe',
        checks: [
          { label: 'Title tags optimized', passed: hasTitleTags },
          { label: 'Mobile-friendly design', passed: isMobileFriendly },
          { label: 'SSL certificate active', passed: hasSSL },
        ],
      },
      socialPresence: {
        name: 'Social Presence',
        score: socialScore,
        icon: 'Share2',
        checks: [
          { label: 'Active Facebook page', passed: hasFacebook },
          { label: 'Instagram profile linked', passed: hasInstagram },
          { label: 'Social accounts connected to GBP', passed: hasLinkedAccounts },
        ],
      },
      reviewVelocity: {
        name: 'Review Velocity',
        score: reviewScore,
        icon: 'Star',
        checks: [
          { label: `${reviewCount} total reviews`, passed: reviewCount >= 50 },
          { label: 'Recent reviews (last 30 days)', passed: recentReviews },
          { label: `Average ${avgRating} star rating`, passed: parseFloat(avgRating) >= 4.0 },
        ],
      },
    },
  };
};
