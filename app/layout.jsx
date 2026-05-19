import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import AboutWidget from '@/components/AboutWidget';

export const metadata = {
    metadataBase: new URL('https://shajar-portfolio.vercel.app'),
    title: 'Shajar Ali — Creative Frontend & Blockchain Developer',
    description: 'Portfolio of Shajar Ali — a Creative Frontend and Blockchain Developer with 6+ years of experience building high-end, interactive digital experiences and Web3 applications.',
    keywords: ['frontend developer', 'blockchain developer', 'web3', 'Next.js', 'GSAP', 'Solidity', 'portfolio'],
    authors: [{ name: 'Shajar Ali' }],
    openGraph: {
        title: 'Shajar Ali — Creative Frontend & Blockchain Developer',
        description: 'Building pixel-perfect interfaces and complex Web3 applications.',
        url: 'https://shajar-portfolio.vercel.app',
        siteName: 'Shajar Ali Portfolio',
        images: [
            {
                url: '/project-hero.jpeg',
                width: 1200,
                height: 630,
                alt: 'Shajar Ali Portfolio',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Shajar Ali — Creative Frontend & Blockchain Developer',
        description: 'Building pixel-perfect interfaces and complex Web3 applications.',
        images: ['/project-hero.jpeg'],
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Preload fonts to prevent flash of unstyled text (FOUT) */}
                <link
                    rel="preload"
                    href="/fonts/DMSans-VariableFont_opsz,wght.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Epilogue-VariableFont_wght.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                {/* Preload the hero video so LCP is discovered immediately */}
                <link
                    rel="preload"
                    href="/20563164-uhd_3840_2160_30fps (1).mp4"
                    as="video"
                    type="video/mp4"
                />
            </head>
            {/* suppressHydrationWarning: browser extensions (password managers, dark mode, etc.)
                inject attributes into <body> causing harmless SSR/client mismatch warnings */}
            <body suppressHydrationWarning>
                {children}
                <ClientProviders />
                <AboutWidget />
            </body>
        </html>
    );
}
