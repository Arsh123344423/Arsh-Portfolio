'use client';

import Loader from '@/components/Loader';

/**
 * Root landing page — renders the anime.js powered Loader.
 * The Loader itself navigates to /home once the user clicks "Enter".
 */
export default function LandingPage() {
  return <Loader />;
}
