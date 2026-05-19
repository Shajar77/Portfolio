'use client';

import dynamic from 'next/dynamic';

// SmoothScroll uses browser APIs — must be client-side only
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });

/**
 * ClientProviders
 * A 'use client' wrapper that lives in layout.jsx so that
 * client-only utilities like SmoothScroll are active on every page
 * without turning layout.jsx into a Client Component.
 */
export default function ClientProviders({ children }) {
    return <SmoothScroll>{children}</SmoothScroll>;
}
