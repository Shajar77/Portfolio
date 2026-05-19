'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AboutWidget() {
    const pathname = usePathname();
    const isAboutPage = pathname === '/about';

    return (
        <Link href={isAboutPage ? '/' : '/about'} className="about-widget">
            <span className="about-widget-text">{isAboutPage ? 'Back to Home' : 'About Me'}</span>
        </Link>
    );
}
