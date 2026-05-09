import './globals.css';

export const metadata = {
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
                {/* Preload the hero video so LCP is discovered immediately */}
                <link
                    rel="preload"
                    href="/20563164-uhd_3840_2160_30fps.mp4"
                    as="video"
                    type="video/mp4"
                />
            </head>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
