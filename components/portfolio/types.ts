/* ────────────────────────── Types ────────────────────────── */

export interface Capability {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
  /** Optional project screenshot or render image URL */
  image?: string;
  /** CSS gradient used when no image is provided or as thumbnail backdrop */
  gradient?: string;
}

export interface Stat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  /** Optional one-line context, revealed on hover/focus — what the number actually means */
  note?: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutContent {
  paragraphs: string[];
  facts: AboutFact[];
  currently: string;
  initials: string;
  /** Optional photo URL — omit to show the initials monogram as a fallback */
  photoSrc?: string;
  /** Text that repeats around the curved ring — include your own separators/spacing, it loops as-is */
  ringText: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  email: string;
  location: string;
  heroLines: string[];
  heroSub: string;
  navLinks: { label: string; href: string }[];
  disciplines: string[];
  marqueeWords: string[];
  about: AboutContent;
  capabilities: Capability[];
  work: WorkItem[];
  stats: Stat[];
  socials: { label: string; href: string }[];
}

export interface PortfolioProps {
  data?: Partial<PortfolioData>;
}

export interface CurvedTextProps {
  /** The string to lay along the circle — repeat it yourself with separators so it fills the loop */
  text: string;
  /** Unique id — required whenever more than one CurvedText renders on the same page (SVG <path> ids must be unique) */
  id: string;
  /** Outer diameter used for the path math. The SVG itself scales to fill its container via CSS, so this mainly controls text curvature, not rendered size. */
  size?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  fontFamily?: string;
  /** Fraction (0–1) of the radius the text sits on — 1 = right at the edge, lower pulls it inward */
  textRadiusRatio?: number;
  className?: string;
}
