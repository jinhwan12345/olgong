import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://olgong.vercel.app'),
    title: '올공키링 | 일상 속의 올공, 내 삶과 잠실민주화',
    description:
        '올공키링 공식 랜딩페이지. 참정권의 애도와 희망을 담은 올공키링, 뱃지, 스티커, 티셔츠를 스마트스토어에서 만나보세요.',
    keywords: ['올공키링', '올공', '잠실민주화운동', '참정권 캠페인', '올공 심볼', '올공 뱃지', '올공 티셔츠'],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: '올공키링 | 일상 속의 올공, 내 삶과 잠실민주화',
        description:
            '올공키링 공식 랜딩페이지. 참정권의 애도와 희망을 담은 올공키링, 뱃지, 스티커, 티셔츠를 스마트스토어에서 만나보세요.',
        url: 'https://olgong.vercel.app',
        siteName: '올공키링',
        images: [
            {
                url: '/images/main_logo.jpg',
                width: 1200,
                height: 630,
                alt: '올공키링 브랜드 로고',
            },
        ],
        locale: 'ko_KR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '올공키링 | 일상 속의 올공, 내 삶과 잠실민주화',
        description:
            '올공키링 공식 랜딩페이지. 참정권의 애도와 희망을 담은 올공키링, 뱃지, 스티커, 티셔츠를 스마트스토어에서 원가로 만나보세요.',
        images: ['/images/main_logo.jpg'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
