'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// 간소화 리디자인(영상/구입·후원/심볼다운로드/프로젝트의미/심볼의미)으로 교체하면서
// 기존 상세 섹션은 삭제하지 않고 아래에서 SHOW_LEGACY_SECTIONS로만 렌더링을 끔.
// 복구하려면 true로 바꾸면 됨.
const SHOW_LEGACY_SECTIONS = false;

export default function Home() {
    // Theme state
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Sync theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Keyring tab state
    const [activeKeyring, setActiveKeyring] = useState<'ver1' | 'ver2'>('ver1');

    // Badge tab state
    const [activeBadge, setActiveBadge] = useState<'ver1' | 'ver2'>('ver1');

    // Tshirt tab state
    const [activeTshirt, setActiveTshirt] = useState<'black' | 'white'>('white');

    const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | '4XL'>('M');

    // Clipboard copy state
    const [isCopied, setIsCopied] = useState(false);

    // Bank account copy handler
    const handleCopyAccount = () => {
        navigator.clipboard.writeText('농협 317-0025-8978-71');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    // Hero video replay
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    const [videoEnded, setVideoEnded] = useState(false);

    const handleReplayVideo = () => {
        const video = heroVideoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.play();
        setVideoEnded(false);
    };

    // Header visibility state based on scroll
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show header at the top, hide when scrolling down, show when scrolling up
            if (currentScrollY <= 10) {
                setShowHeader(true);
            } else if (currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // T-shirt size dimensions  length:총장, shoulder:어깨너비, chest:가슴단면, sleeve:소매길이
    const sizes = {
        S: { length: '62.5', shoulder: '38.5', chest: '47', sleeve: '19' },
        M: { length: '65', shoulder: '40.5', chest: '49.5', sleeve: '20' },
        L: { length: '67.5', shoulder: '42.5', chest: '52', sleeve: '21' },
        XL: { length: '70', shoulder: '44.5', chest: '54.5', sleeve: '22' },
        '2XL': { length: '72.5', shoulder: '46.5', chest: '57', sleeve: '23' },
        '3XL': { length: '75', shoulder: '48.5', chest: '59.5', sleeve: '24' },
        '4XL': { length: '77', shoulder: '50.5', chest: '62', sleeve: '25' },
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-rose-500 selection:text-white">
            {/* Toast Notification */}
            <div
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform ${
                    isCopied ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
                }`}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">계좌번호가 클립보드에 복사되었습니다.</span>
            </div>

            {/* Header / Nav */}
            <header
                className={`sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md transition-transform duration-300 ${
                    showHeader ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
                            <Image
                                src="/images/main_logo.jpg"
                                alt="올공키링 브랜드 로고"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span
                            className={`text-lg tracking-tight ${
                                theme === 'dark'
                                    ? 'font-black bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent'
                                    : 'font-bold text-black'
                            }`}
                        >
                            올공키링
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <a href="#meaning" className="hover:text-white transition-colors">
                            소개
                        </a>
                        <a href="#symbol-meaning" className="hover:text-white transition-colors">
                            심볼
                        </a>
                        <a href="#symbol-download" className="hover:text-white transition-colors">
                            다운로드
                        </a>
                        <a href="#goods" className="hover:text-white transition-colors">
                            구매·후원
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                // Moon icon (to Dark)
                                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            ) : (
                                // Sun icon (to Light)
                                <svg
                                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                                    />
                                </svg>
                            )}
                        </button>

                        <a
                            href="https://smartstore.naver.com/pixeline"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 rounded-full hover:from-green-500 hover:to-emerald-400 shadow-md shadow-emerald-950/30 transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="hidden sm:inline">네이버스토어 바로가기</span>
                            <span className="sm:hidden">구매하기</span>
                            <svg
                                className="w-4 h-4 ml-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </header>

            {/* Video Hero Section */}
            <section id="video" className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-zinc-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent_50%)]" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-rose-500/5 rounded-full blur-[100px]" />

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        잠실민주화운동 심볼 확산 캠페인
                    </span>

                    <div className="relative group w-full max-w-sm mx-auto">
                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-purple-600 to-rose-600 rounded-3xl opacity-30 blur-2xl group-hover:opacity-40 transition-opacity" />
                        <div className="relative aspect-square w-full bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
                            <video
                                ref={heroVideoRef}
                                src="/videos/logo-reveal.mp4"
                                autoPlay
                                muted
                                playsInline
                                onEnded={() => setVideoEnded(true)}
                                className="w-full h-full object-contain"
                            />
                            {videoEnded && (
                                <button
                                    onClick={handleReplayVideo}
                                    aria-label="영상 다시 재생"
                                    className="absolute bottom-3 right-3 flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-black/60 hover:bg-black/75 backdrop-blur-sm text-white text-xs font-semibold shadow-lg transition-colors cursor-pointer"
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    다시보기
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-bold text-rose-400 tracking-widest uppercase">8.15 광복절</p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
                            다시, 광장에서
                            <br />
                            <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                대한민국 만세!
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
                            자유대한민국을 위한 모든 여정과
                            <br />
                            잠실민주화운동의 상징이 함께 하겠습니다
                        </p>
                    </div>

                    <div className="space-y-2 pt-2">
                        <a
                            href="#symbol-download"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-950 bg-white rounded-xl hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
                        >
                            로고 무료배포 바로가기
                        </a>
                        <p className="text-xs text-zinc-500">* 상업적 이용을 제외한 모든 이용이 가능합니다</p>
                    </div>
                </div>
            </section>

            {/* Goods Purchase & Donation Section */}
            <section id="goods" className="py-24 bg-zinc-900/30 border-b border-zinc-900">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Goods &amp; Donation</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">굿즈 구매 &amp; 캠페인 후원</h2>
                    <p className="text-lg text-zinc-400 font-light max-w-xl mx-auto">
                        원가와 배송비만 받고 투명하게 판매하며, 판매 수익금은 추가 물량 제작과 배포에 전액
                        사용됩니다.
                    </p>
                    <div className="pt-4">
                        <a
                            href="https://smartstore.naver.com/pixeline"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-950 bg-gradient-to-r from-rose-500 to-rose-400 rounded-xl hover:from-rose-400 hover:to-rose-300 shadow-xl shadow-rose-950/20 transition-all hover:scale-105 active:scale-95"
                        >
                            굿즈 구매하러 가기
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 mt-14">
                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4 relative">
                        <div className="absolute top-4 right-4 text-xs font-semibold text-rose-500 uppercase tracking-widest">
                            DONATION
                        </div>

                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">공식 후원 계좌</h4>
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl bg-[#ffffff] border border-zinc-200 dark:border-zinc-800/80 p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                <Image
                                    src="/images/logo.png"
                                    alt="Campaign Logo"
                                    width={56}
                                    height={56}
                                    className="object-contain"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-400 text-xs">농협은행</p>
                                <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wide">
                                    317-0025-8978-71
                                </p>
                                <p className="text-sm font-medium text-zinc-300">신전국대학생대표자협의회</p>
                            </div>
                        </div>

                        <button
                            onClick={handleCopyAccount}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                        >
                            {isCopied ? (
                                <>
                                    <svg
                                        className="w-4 h-4 text-emerald-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    복사 완료
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-4.5 h-4.5 text-zinc-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                        />
                                    </svg>
                                    계좌번호 복사하기
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {/* Symbol Download Section */}
            <section id="symbol-download" className="py-24 border-b border-zinc-900">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
                    <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Free Symbol</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">심볼 다운로드</h2>
                    <p className="text-lg text-zinc-400 font-light">
                        올공 심볼은 상업적 이용을 제외한 모든 용도로 자유롭게 사용하실 수 있습니다.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Symbol 1: 희망 (무궁화) */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 text-center">
                        <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-[#ffffff] rounded-full p-6 shadow-inner">
                            <Image
                                src="/downloads/symbol-mugunghwa-hope.png"
                                alt="올공 심볼 - 희망 (무궁화)"
                                fill
                                sizes="200px"
                                className="object-contain p-2"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-white">Ver.1 희망 (무궁화)</h3>
                        <div className="flex gap-3">
                            <a
                                href="/downloads/symbol-mugunghwa-hope.png"
                                download
                                className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                            >
                                PNG 다운로드
                            </a>
                            <a
                                href="/downloads/symbol-mugunghwa-hope.ai"
                                download
                                className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                            >
                                AI 다운로드
                            </a>
                        </div>
                    </div>

                    {/* Symbol 2: 애도 (국화) */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 text-center">
                        <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-[#ffffff] rounded-full p-6 shadow-inner">
                            <Image
                                src="/downloads/symbol-chrysanthemum-mourning.png"
                                alt="올공 심볼 - 애도 (국화)"
                                fill
                                sizes="200px"
                                className="object-contain p-2"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-white">Ver.2 애도 (국화)</h3>
                        <div className="flex gap-3">
                            <a
                                href="/downloads/symbol-chrysanthemum-mourning.png"
                                download
                                className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                            >
                                PNG 다운로드
                            </a>
                            <a
                                href="/downloads/symbol-chrysanthemum-mourning.ai"
                                download
                                className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                            >
                                AI 다운로드
                            </a>
                        </div>
                    </div>

                    {/* Symbol 3: 핀버튼 뱃지 디자인 */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 text-center">
                        <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-[#ffffff] rounded-full p-6 shadow-inner">
                            <Image
                                src="/downloads/badge-pin-design.png"
                                alt="올공 핀버튼 뱃지 디자인"
                                fill
                                sizes="200px"
                                className="object-contain p-2"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-white">핀버튼 뱃지 디자인</h3>
                        <div className="flex gap-3">
                            <a
                                href="/downloads/badge-pin-design.png"
                                download
                                className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                            >
                                PNG 다운로드
                            </a>
                            <a
                                href="/downloads/badge-pin-design.ai"
                                download
                                className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                            >
                                AI 다운로드
                            </a>
                        </div>
                    </div>
                </div>

                {/* Production Files: T-shirt Print Designs */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
                    <div className="text-center space-y-2 mb-8">
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                            제작 도안 파일
                        </h3>
                        <p className="text-sm text-zinc-500">티셔츠 인쇄용 도안 원본입니다.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {/* T-shirt Black Design */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 text-center">
                            <div className="relative aspect-square w-full max-w-[220px] mx-auto bg-[#ffffff] rounded-2xl p-4 shadow-inner">
                                <Image
                                    src="/downloads/tshirt-black-design.png"
                                    alt="올공 티셔츠 (검정) 인쇄 도안"
                                    fill
                                    sizes="220px"
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-white">티셔츠 도안 (검정)</h3>
                            <div className="flex gap-3">
                                <a
                                    href="/downloads/tshirt-black-design.png"
                                    download
                                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                                >
                                    PNG 다운로드
                                </a>
                                <a
                                    href="/downloads/tshirt-black-design.ai"
                                    download
                                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                                >
                                    AI 다운로드
                                </a>
                            </div>
                        </div>

                        {/* T-shirt White Design */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 text-center">
                            <div className="relative aspect-square w-full max-w-[220px] mx-auto bg-[#ffffff] rounded-2xl p-4 shadow-inner">
                                <Image
                                    src="/downloads/tshirt-white-design.png"
                                    alt="올공 티셔츠 (흰색) 인쇄 도안"
                                    fill
                                    sizes="220px"
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-white">티셔츠 도안 (흰색)</h3>
                            <div className="flex gap-3">
                                <a
                                    href="/downloads/tshirt-white-design.png"
                                    download
                                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                                >
                                    PNG 다운로드
                                </a>
                                <a
                                    href="/downloads/tshirt-white-design.ai"
                                    download
                                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/60 transition-all active:scale-[0.98]"
                                >
                                    AI 다운로드
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Olgong Project Meaning Section */}
            <section id="meaning" className="py-20 bg-zinc-900/30 border-b border-zinc-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">About Olgong</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        원가와 배송비만 받고 투명하게 판매합니다
                    </h2>

                    <div className="space-y-6 text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        <p>
                            잠실민주화 정신 확산을 위해{' '}
                            <strong className="text-zinc-200 font-semibold">올공키링</strong>과{' '}
                            <strong className="text-zinc-200 font-semibold">신전대협</strong>이 뜻을 함께 합니다.
                        </p>
                        <p>
                            현장에서만 배포하던 중,{' '}
                            <span className="text-white font-medium">&quot;온라인으로도 사고 싶다&quot;</span>,{' '}
                            <span className="text-white font-medium">
                                &quot;지방에 살아서 현장에 직접 참여하지 못해 아쉽다&quot;
                            </span>
                            는 요청이 계속 이어졌습니다.
                        </p>
                        <p>많은 분들이 일상 속에서 뜻을 함께 나눌 수 있도록 스마트스토어에서 정성껏 준비했습니다.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-left">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                판매 마진
                            </span>
                            <span className="text-2xl font-black text-rose-500 block mt-1">0 %</span>
                        </div>
                        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                배포 목적
                            </span>
                            <span className="text-lg font-bold text-white block mt-1">심볼 확산</span>
                        </div>
                        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                소재 상세
                            </span>
                            <span className="text-lg font-bold text-white block mt-1">아크릴 + 메달</span>
                        </div>
                        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                스토어 현황
                            </span>
                            <span className="text-lg font-bold text-emerald-400 block mt-1">즉시 구매가능</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Symbol Meaning Section */}
            <section id="symbol-meaning" className="py-24 border-b border-zinc-900">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
                    <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Symbol Meaning</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">심볼 의미</h2>
                    <p className="text-lg text-zinc-400 font-light">
                        참정권에 대한 두 가지 태도를 예술적이고 상징적인 디자인에 담아내었습니다.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
                    {/* Ver.1 희망 */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
                        <div className="relative aspect-square w-full max-w-[220px] mx-auto bg-[#ffffff] rounded-full p-6 shadow-inner">
                            <Image
                                src="/downloads/symbol-mugunghwa-hope.png"
                                alt="희망 심볼 (무궁화)"
                                fill
                                sizes="220px"
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white text-center">희망</h3>
                            <p className="text-zinc-300 font-light leading-relaxed">
                                대한민국의 희망찬 태극 그라데이션과 나라를 상징하는 영롱한 무궁화 문양이 어우러진
                                디자인입니다. 재선거로 다시 일어설 대한민국에 대한 밝고 긍정적인 희망과 염원을 품고
                                있습니다.
                            </p>
                            <ul className="space-y-2.5 text-sm text-zinc-400 pt-2">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                    주요 의미: 헌정 질서 재건에 대한 희망과 의지
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    상징 기호: 올공 상징 기호 + 태극 그라데이션 + 무궁화 문양
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Ver.2 애도 */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
                        <div className="relative aspect-square w-full max-w-[220px] mx-auto bg-[#ffffff] rounded-full p-6 shadow-inner">
                            <Image
                                src="/downloads/symbol-chrysanthemum-mourning.png"
                                alt="애도 심볼 (국화)"
                                fill
                                sizes="220px"
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white text-center">애도</h3>
                            <p className="text-zinc-300 font-light leading-relaxed">
                                단아한 국화 문양을 중심으로, 유린당한 민주주의와 침해된 참정권에 대한 깊은 애도의
                                마음을 표현했습니다. 차분하고 엄숙한 느낌의 세련된 디자인입니다.
                            </p>
                            <ul className="space-y-2.5 text-sm text-zinc-400 pt-2">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                    주요 의미: 민주주의 훼손에 대한 깊은 애도
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                    상징 기호: 올공 상징 기호 + 국화 문양
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {SHOW_LEGACY_SECTIONS && (
                <>
                    {/* Original Hero Section (간소화 리디자인 이전) */}
                    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-zinc-900">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,119,198,0.15),transparent_50%)]" />
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-rose-500/5 rounded-full blur-[100px]" />

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid md:grid-cols-12 gap-12 items-center">
                                <div className="md:col-span-7 space-y-6 text-center md:text-left">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                        잠실민주화운동 심볼 확산 캠페인
                                    </span>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                                        일상 속의 올공,
                                        <br />
                                        <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                            내 삶과 잠실민주화
                                        </span>
                                    </h1>
                                    <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
                                        일상 속에서도, 언제나 함께하고 싶은 마음을 담았습니다.
                                        <br />
                                        우리의 소중한 권리와 기억을 가방에, 열쇠에 곁에 두세요.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                                        <a
                                            href="https://smartstore.naver.com/pixeline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-950 bg-white rounded-xl hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
                                        >
                                            지금 구매하기
                                        </a>
                                        <a
                                            href="#support"
                                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 rounded-xl transition-all"
                                        >
                                            캠페인 후원하기
                                        </a>
                                    </div>
                                </div>

                                <div className="md:col-span-5 flex justify-center">
                                    <div className="relative group w-full max-w-sm sm:max-w-md">
                                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-purple-600 to-rose-600 rounded-3xl opacity-30 blur-2xl group-hover:opacity-40 transition-opacity" />
                                        <div className="relative aspect-square w-full bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl p-2">
                                            <Image
                                                src="/images/hero.jpg"
                                                alt="Olgong Keyring Hero View"
                                                fill
                                                sizes="(max-w-768px) 100vw, 50vw"
                                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                                                    PRODUCT MOCKUP
                                                </p>
                                                <h3 className="text-lg font-bold text-[#ffffff] mt-1">
                                                    올공 아크릴 키링 패키지
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Intro Story Section (1p) */}
                    <section id="intro" className="py-20 bg-zinc-900/30 border-b border-zinc-900">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                원가와 배송비만 받고 투명하게 판매합니다
                            </h2>

                            <div className="space-y-6 text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                <p className="bg-zinc-950 border border-zinc-800/80 px-6 py-4 rounded-xl text-rose-300 font-semibold shadow-inner">
                                    판매 요청이 다수 있었기에, 오직 <br />
                                    <span className="text-white">&apos;원가와 배송비만!&apos;</span> 받고
                                    <br />
                                    투명하게 판매합니다.
                                    <br />
                                </p>
                                <p>
                                    현장에서만 배포하던 중,{' '}
                                    <span className="text-white font-medium">&quot;온라인으로도 사고 싶다&quot;</span>,{' '}
                                    <span className="text-white font-medium">
                                        &quot;지방에 살아서 현장에 직접 참여하지 못해 아쉽다&quot;
                                    </span>
                                    는 요청이 계속 이어졌습니다.
                                </p>
                                <p>많은 분들이 일상 속에서 뜻을 함께 나눌 수 있도록 스마트스토어에서 정성껏 준비했습니다.</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-left">
                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                        판매 마진
                                    </span>
                                    <span className="text-2xl font-black text-rose-500 block mt-1">0 %</span>
                                </div>
                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                        배포 목적
                                    </span>
                                    <span className="text-lg font-bold text-white block mt-1">심볼 확산</span>
                                </div>
                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                        소재 상세
                                    </span>
                                    <span className="text-lg font-bold text-white block mt-1">아크릴 + 메달</span>
                                </div>
                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800">
                                    <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                                        스토어 현황
                                    </span>
                                    <span className="text-lg font-bold text-emerald-400 block mt-1">즉시 구매가능</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* T-shirt Section (Product 01) */}
                    <section id="tshirt" className="py-24 bg-zinc-900/30 border-b border-zinc-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Product 01</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">올공 캠페인 티셔츠</h2>
                                <p className="text-lg text-zinc-400 font-light">
                                    일상복처럼 편안하고 세련되게 입으며, 가슴 깊이 간직한 뜻을 절대 잊지 않도록 제작했습니다.
                                </p>
                                <div className="pt-2">
                                    <a
                                        href="https://smartstore.naver.com/pixeline/products/13658672827"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-zinc-950 bg-gradient-to-r from-rose-500 to-rose-400 rounded-xl hover:from-rose-400 hover:to-rose-300 shadow-xl shadow-rose-950/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        캠페인 티셔츠 구매하기
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Left: T-shirt Mockup */}
                                <div className="lg:col-span-6 flex flex-col items-center">
                                    <div className="relative group aspect-[4/3] w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-4 transition-all duration-500">
                                        <Image
                                            src={
                                                activeTshirt === 'black'
                                                    ? '/images/tshirt_black.jpg'
                                                    : '/images/tshirt_white.jpg'
                                            }
                                            alt={
                                                activeTshirt === 'black'
                                                    ? 'Olgong T-shirt Black Mockup'
                                                    : 'Olgong T-shirt White Mockup'
                                            }
                                            fill
                                            sizes="(max-w-768px) 100vw, 50vw"
                                            className="object-contain p-2 transition-opacity duration-300"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#09090b]/80 backdrop-blur-sm border border-[#27272a]/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#ffffff]">
                                            {activeTshirt === 'white' ? '희망 (White)' : '애도 (Black)'}
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-[#09090b]/90 backdrop-blur-sm border border-[#27272a]/80 px-3 py-1.5 rounded-full text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>

                                    {/* Tab Selector Buttons */}
                                    <div className="flex gap-4 mt-6 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 max-w-sm w-full">
                                        <button
                                            onClick={() => setActiveTshirt('white')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                activeTshirt === 'white'
                                                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                                    : 'text-zinc-400 hover:text-white'
                                            }`}
                                        >
                                            희망 (White)
                                        </button>
                                        <button
                                            onClick={() => setActiveTshirt('black')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                activeTshirt === 'black'
                                                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                                    : 'text-zinc-400 hover:text-white'
                                            }`}
                                        >
                                            애도 (Black)
                                        </button>
                                    </div>
                                </div>

                                {/* Right Spec & Interactive Size Chart */}
                                <div className="lg:col-span-6 space-y-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                            티셔츠 스펙
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">일상복으로 완벽한 고기능성 티셔츠</h3>
                                        <p className="text-zinc-300 font-light leading-relaxed">
                                            가볍고 쾌적한 고기능성 쿨론/기능성 원단을 사용하여 땀 흡수와 통기성이 뛰어납니다.
                                            세탁 후에도 수축이나 변형이 적어 일상 생활과 아웃도어 활동 시 편안하게 착용하기에
                                            제격입니다.
                                        </p>
                                    </div>

                                    {/* Interactive Size Chart */}
                                    <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
                                                사이즈 조견표 (Size Chart)
                                            </h4>
                                            <span className="text-zinc-500 text-xs">(단위: cm)</span>
                                        </div>

                                        {/* Quick select buttons */}
                                        <div className="flex flex-wrap gap-2">
                                            {(['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const).map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                                        selectedSize === size
                                                            ? 'bg-rose-600 text-white'
                                                            : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                                                    }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Table */}
                                        <div className="overflow-x-auto rounded-xl border border-zinc-800">
                                            <table className="min-w-full divide-y divide-zinc-800 text-left text-xs sm:text-sm">
                                                <thead className="bg-zinc-950">
                                                    <tr>
                                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-zinc-400 whitespace-nowrap">
                                                            사이즈
                                                        </th>
                                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-zinc-400 whitespace-nowrap">
                                                            총장
                                                        </th>
                                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-zinc-400 whitespace-nowrap">
                                                            어깨너비
                                                        </th>
                                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-zinc-400 whitespace-nowrap">
                                                            가슴단면
                                                        </th>
                                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-zinc-400 whitespace-nowrap">
                                                            소매길이
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-zinc-800 bg-zinc-900/40">
                                                    {(['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const).map((size) => (
                                                        <tr
                                                            key={size}
                                                            onClick={() => setSelectedSize(size)}
                                                            className={`cursor-pointer transition-colors ${
                                                                selectedSize === size
                                                                    ? 'bg-rose-500/10 text-rose-400 font-bold'
                                                                    : 'text-zinc-300 hover:bg-zinc-800/40'
                                                            }`}
                                                        >
                                                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold whitespace-nowrap">
                                                                {size}
                                                            </td>
                                                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                                                                {sizes[size].length}
                                                            </td>
                                                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                                                                {sizes[size].shoulder}
                                                            </td>
                                                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                                                                {sizes[size].chest}
                                                            </td>
                                                            <td className="px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                                                                {sizes[size].sleeve}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Wear Shot Gallery Placeholder */}
                            <div className="mt-20 border-t border-zinc-900 pt-16">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                                    <div>
                                        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">
                                            Gallery
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mt-1">캠페인 티셔츠 착용 예시</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {/* Card 1: Model Wear Shot (Generated Preview) */}
                                    <div className="relative group aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/shirt1.jpg"
                                            alt="Olgong T-shirt Wear Shot 1"
                                            fill
                                            sizes="(max-w-768px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 text-xs text-[#d4d4d8] font-medium">
                                            착용 예시 #1
                                        </div>
                                        <div className="absolute bottom-3 right-3 text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>

                                    {/* Card 2: Placeholder */}
                                    <div className="relative group aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/shirt2.jpg"
                                            alt="Olgong T-shirt Wear Shot 2"
                                            fill
                                            sizes="(max-w-768px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 text-xs text-[#d4d4d8] font-medium">
                                            착용 예시 #2
                                        </div>
                                        <div className="absolute bottom-3 right-3 text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>

                                    {/* Card 3: Placeholder */}
                                    <div className="relative group aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/shirt3.png"
                                            alt="Olgong T-shirt Wear Shot 3"
                                            fill
                                            sizes="(max-w-768px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 text-xs text-[#d4d4d8] font-medium">
                                            착용 예시 #3
                                        </div>
                                        <div className="absolute bottom-3 right-3 text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>

                                    {/* Card 4: Placeholder */}
                                    <div className="relative group aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src="/images/shirt4.png"
                                            alt="Olgong T-shirt Wear Shot 4"
                                            fill
                                            sizes="(max-w-768px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 text-xs text-[#d4d4d8] font-medium">
                                            착용 예시 #4
                                        </div>
                                        <div className="absolute bottom-3 right-3 text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Keyring Section (2p) */}
                    <section id="keyring" className="py-24 border-b border-zinc-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Product 02</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">올공 아크릴 키링</h2>
                                <p className="text-lg text-zinc-400 font-light">
                                    참정권에 대한 두 가지 태도를 예술적이고 상징적인 디자인에 담아내었습니다.
                                </p>
                                <div className="pt-2">
                                    <a
                                        href="https://smartstore.naver.com/pixeline/products/13658675651"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-zinc-950 bg-gradient-to-r from-rose-500 to-rose-400 rounded-xl hover:from-rose-400 hover:to-rose-300 shadow-xl shadow-rose-950/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        아크릴 키링 구매하기
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Left: Image Viewer */}
                                <div className="lg:col-span-6 flex flex-col items-center">
                                    <div className="relative group aspect-square w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
                                        <Image
                                            src={
                                                activeKeyring === 'ver1'
                                                    ? '/images/keyring_color.jpg'
                                                    : '/images/keyring_black.jpg'
                                            }
                                            alt={activeKeyring === 'ver1' ? 'Ver.1 Hope' : 'Ver.2 Mourning'}
                                            fill
                                            sizes="(max-w-768px) 100vw, 50vw"
                                            className="object-cover transition-opacity duration-300"
                                        />

                                        {/* Visual Label */}
                                        <div className="absolute top-4 left-4 bg-[#09090b]/80 backdrop-blur-sm border border-[#27272a]/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#ffffff]">
                                            {activeKeyring === 'ver1' ? 'Ver.1 희망 (Red & Blue)' : 'Ver.2 애도 (Black)'}
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-[#09090b]/85 backdrop-blur-sm border border-[#27272a]/80 px-2.5 py-1 rounded-full text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>

                                    {/* Tab Selector Buttons */}
                                    <div className="flex gap-4 mt-6 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 max-w-sm w-full">
                                        <button
                                            onClick={() => setActiveKeyring('ver1')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                activeKeyring === 'ver1'
                                                    ? 'bg-gradient-to-r from-blue-900/60 to-rose-900/60 text-white shadow-md border border-rose-500/20'
                                                    : 'text-zinc-400 hover:text-white'
                                            }`}
                                        >
                                            Ver.1 희망 (Red&amp;Blue)
                                        </button>
                                        <button
                                            onClick={() => setActiveKeyring('ver2')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                activeKeyring === 'ver2'
                                                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                                    : 'text-zinc-400 hover:text-white'
                                            }`}
                                        >
                                            Ver.2 애도 (Black)
                                        </button>
                                    </div>
                                </div>

                                {/* Right: Product Details */}
                                <div className="lg:col-span-6 space-y-8">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                            디자인 스토리
                                        </div>

                                        {activeKeyring === 'ver2' ? (
                                            <div className="space-y-4 animate-fadeIn">
                                                <h3 className="text-2xl font-bold text-white">Ver.2 애도 (Black)</h3>
                                                <p className="text-zinc-300 font-light leading-relaxed">
                                                    단아한 국화 문양을 중심으로, 유린당한 민주주의와 침해된 참정권에 대한 깊은
                                                    애도의 마음을 표현했습니다. 차분하고 엄숙한 느낌의 세련된 블랙 아크릴
                                                    디자인입니다.
                                                </p>
                                                <ul className="space-y-2.5 text-sm text-zinc-400 pt-2">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                                        주요 의미: 민주주의 훼손에 대한 깊은 애도
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                                        상징 기호: 올공 상징 기호 + 국화(Chrysanthemum) 문양
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 animate-fadeIn">
                                                <h3 className="text-2xl font-bold text-white">Ver.1 희망 (Red & Blue)</h3>
                                                <p className="text-zinc-300 font-light leading-relaxed">
                                                    대한민국의 희망찬 태극 그라데이션과 나라를 상징하는 영롱한 무궁화 문양이
                                                    어우러진 디자인입니다. 재선거로 다시 일어설 대한민국에 대한 밝고 긍정적인
                                                    희망과 염원을 품고 있습니다.
                                                </p>
                                                <ul className="space-y-2.5 text-sm text-zinc-400 pt-2">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                                        주요 의미: 헌정 질서 재건에 대한 희망과 의지
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                        상징 기호: 올공 상징 기호 + 태극 그라데이션 + 무궁화(Rose of Sharon)
                                                        문양
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Specification Card */}
                                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                                        <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
                                            제품 스펙 (Specification)
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-1">
                                                <span className="text-zinc-500 text-xs block">소재</span>
                                                <span className="text-zinc-200 font-semibold">아크릴 메달 + 금속 고리걸쇠</span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-zinc-500 text-xs block">사이즈</span>
                                                <span className="text-zinc-200 font-semibold">30 mm (원형 메달 지름 기준)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Badge Section (Product 03) */}
                    <section id="badge" className="py-24 bg-zinc-900/10 border-b border-zinc-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Product 03</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">올공 금속 핀 뱃지</h2>
                                <p className="text-lg text-zinc-400 font-light">
                                    언제 어디서나 품격 있게 심볼을 드러낼 수 있는 프리미엄 황동 뱃지입니다.
                                </p>
                                <div className="pt-2">
                                    <a
                                        href="https://smartstore.naver.com/pixeline/products/13654734990"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-zinc-950 bg-gradient-to-r from-rose-500 to-rose-400 rounded-xl hover:from-rose-400 hover:to-rose-300 shadow-xl shadow-rose-950/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        금속 뱃지 구매하기
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Left: Image & Tab Selector */}
                                <div className="lg:col-span-6 flex flex-col items-center">
                                    <div className="relative group aspect-square w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
                                        <Image
                                            src={activeBadge === 'ver1' ? '/images/badge_color.jpg' : '/images/badge_black.jpg'}
                                            alt={activeBadge === 'ver1' ? 'Ver.1 Hope' : 'Ver.2 Mourning'}
                                            fill
                                            sizes="(max-w-768px) 100vw, 50vw"
                                            className="object-cover transition-opacity duration-300"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#09090b]/80 backdrop-blur-sm border border-[#27272a]/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#ffffff]">
                                            {activeBadge === 'ver1' ? 'Ver.1 희망 (Red & Blue)' : 'Ver.2 애도 (Black)'}
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-[#09090b]/85 backdrop-blur-sm border border-[#27272a]/80 px-2.5 py-1 rounded-full text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>

                                    {/* Tab Selector Buttons */}
                                    <div className="flex gap-4 mt-6 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 max-w-sm w-full">
                                        <button
                                            onClick={() => setActiveBadge('ver1')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                activeBadge === 'ver1'
                                                    ? 'bg-gradient-to-r from-blue-900/60 to-rose-900/60 text-white shadow-md border border-rose-500/20'
                                                    : 'text-zinc-400 hover:text-white'
                                            }`}
                                        >
                                            Ver.1 희망
                                            <br /> (Red & Blue)
                                        </button>
                                        <button
                                            onClick={() => setActiveBadge('ver2')}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                activeBadge === 'ver2'
                                                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                                    : 'text-zinc-400 hover:text-white'
                                            }`}
                                        >
                                            Ver.2 애도 (Black)
                                        </button>
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="lg:col-span-6 space-y-8">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                            디자인 스토리
                                        </div>

                                        {activeBadge === 'ver2' ? (
                                            <div className="space-y-4 animate-fadeIn">
                                                <h3 className="text-2xl font-bold text-white">Ver.2 애도 (Black)</h3>
                                                <p className="text-zinc-300 font-light leading-relaxed">
                                                    단아한 국화 문양을 중심으로, 유린당한 민주주의와 침해된 참정권에 대한 깊은
                                                    애도의 마음을 표현했습니다. 차분하고 엄숙한 느낌의 세련된 블랙 금속
                                                    뱃지입니다.
                                                </p>
                                                <ul className="space-y-2.5 text-sm text-zinc-400 pt-2">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                                        주요 의미: 민주주의 훼손에 대한 깊은 애도
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                                        상징 기호: 올공 상징 기호 + 국화(Chrysanthemum) 문양
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 animate-fadeIn">
                                                <h3 className="text-2xl font-bold text-white">Ver.1 희망 (Red & Blue)</h3>
                                                <p className="text-zinc-300 font-light leading-relaxed">
                                                    대한민국의 희망찬 태극 그라데이션과 나라를 상징하는 영롱한 무궁화 문양이
                                                    어우러진 디자인입니다. 재선거로 다시 일어설 대한민국에 대한 밝고 긍정적인
                                                    희망과 염원을 품고 있습니다.
                                                </p>
                                                <ul className="space-y-2.5 text-sm text-zinc-400 pt-2">
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                                        주요 의미: 헌정 질서 재건에 대한 희망과 의지
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                        상징 기호: 올공 상징 기호 + 태극 그라데이션 + 무궁화(Rose of Sharon)
                                                        문양
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Specification Card */}
                                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                                        <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
                                            제품 스펙 (Specification)
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-1">
                                                <span className="text-zinc-500 text-xs block">소재</span>
                                                <span className="text-zinc-200 font-semibold">
                                                    황동 (Brass) + 실리콘/금속 마개
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-zinc-500 text-xs block">사이즈</span>
                                                <span className="text-zinc-200 font-semibold">25 mm (지름 기준)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sticker Section (Product 04) */}
                    <section id="sticker" className="py-24 border-b border-zinc-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">Product 04</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">올공 방수 스티커 세트</h2>
                                <p className="text-lg text-zinc-400 font-light">
                                    노트북, 텀블러부터 차량 유리에 이르기까지 다양한 곳에 활용 가능한 스티커 컬렉션입니다.
                                </p>
                                <div className="pt-2">
                                    <a
                                        href="https://smartstore.naver.com/pixeline/products/13654968955"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-zinc-950 bg-gradient-to-r from-rose-500 to-rose-400 rounded-xl hover:from-rose-400 hover:to-rose-300 shadow-xl shadow-rose-950/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        방수 스티커 구매하기
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Left: Info */}
                                <div className="lg:col-span-6 space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                        패키지 옵션 및 가격 안내
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl border bg-zinc-900/40 border-zinc-800 flex justify-between items-center gap-4">
                                            <div>
                                                <h4 className="text-sm sm:text-base font-bold text-white">
                                                    선택 패키지 (로고 + 작은 스티커)
                                                </h4>
                                                <p className="text-xs text-zinc-400 mt-1">
                                                    올공 로고 스티커와 작은 크기 스티커 선택 구성
                                                </p>
                                            </div>
                                            <span className="text-rose-500 font-extrabold text-sm sm:text-base whitespace-nowrap">
                                                4,900 원
                                            </span>
                                        </div>

                                        <div className="p-4 rounded-xl border bg-zinc-900/40 border-zinc-800 flex justify-between items-center gap-4">
                                            <div>
                                                <h4 className="text-sm sm:text-base font-bold text-white">
                                                    작은 친구들 All 패키지
                                                </h4>
                                                <p className="text-xs text-zinc-400 mt-1">
                                                    작은 크기의 스티커들이 모두 포함된 알찬 패키지 세트
                                                </p>
                                            </div>
                                            <span className="text-rose-500 font-extrabold text-sm sm:text-base whitespace-nowrap">
                                                7,900 원
                                            </span>
                                        </div>

                                        <div className="p-4 rounded-xl border bg-zinc-900/40 border-zinc-800 flex justify-between items-center gap-4">
                                            <div>
                                                <h4 className="text-sm sm:text-base font-bold text-white">
                                                    차량용 스티커 (1개)
                                                </h4>
                                                <p className="text-xs text-zinc-400 mt-1">
                                                    차량 외부나 유리창에 부착하기 좋은 대형 방수 스티커
                                                </p>
                                            </div>
                                            <span className="text-rose-500 font-extrabold text-sm sm:text-base whitespace-nowrap">
                                                4,900 원
                                            </span>
                                        </div>
                                    </div>

                                    {/* Material Spec */}
                                    <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-sm text-zinc-400 space-y-2">
                                        <p className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4 text-rose-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span className="font-semibold text-zinc-200">고성능 방수 코팅:</span> 비와 습기, 물
                                            세척에도 손상이 없도록 튼튼하게 제작되었습니다.
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4 text-rose-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span className="font-semibold text-zinc-200">리무버블 점착제:</span> 스티커를
                                            제거할 때 끈적임이나 흔적이 남지 않아 안심하고 부착할 수 있습니다.
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Photo */}
                                <div className="lg:col-span-6 flex justify-center">
                                    <div className="relative group aspect-[4/3] w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                                        <Image
                                            src="/images/stickers.jpg"
                                            alt="Olgong Waterproof Stickers Mockup"
                                            fill
                                            sizes="(max-w-768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/60 to-transparent" />
                                        <div className="absolute bottom-4 right-4 bg-[#09090b]/90 backdrop-blur-sm border border-[#27272a]/80 px-3 py-1.5 rounded-full text-[10px] text-[#a1a1aa] transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                                            ※ 실제 제품과 다를 수 있습니다
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Closing CTA Section (마무리) */}
                    <section className="py-24 relative overflow-hidden border-b border-zinc-900">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px]" />

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
                            <div className="space-y-3">
                                <span className="text-rose-500 font-bold text-sm tracking-wider uppercase">
                                    SUPPORT & SPREAD
                                </span>
                                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                                    판매된 수익금은
                                    <br />
                                    추가 물량 제작 및 배포에 사용됩니다!
                                </h2>
                            </div>

                            <div className="text-zinc-300 space-y-4 max-w-xl mx-auto font-light text-base sm:text-lg leading-relaxed">
                                <p>
                                    현장에 직접 가지 못하더라도, 마음은 언제나 잠실과 대한민국 민주주의의 가치를 향해 나란히
                                    함께할 수 있습니다.
                                </p>
                                <p className="text-white font-medium">
                                    여러분의 가방에, 소중한 차 열쇠에, 매일 쓰는 필통에 잠실의 기억과 민주주의에 대한 마음을
                                    곁에 두고 간직해 주세요.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Press / Seoul Shinmun Interview Section */}
                    <section className="py-24 bg-zinc-900/10 border-b border-zinc-900 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.03),transparent_60%)]" />
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                                <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">
                                    Press Interview
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">서울신문 언론 보도</h2>
                                <p className="text-lg text-zinc-400 font-light max-w-xl mx-auto">
                                    올공 키링 무료 나눔 프로젝트의 생생한 현장 취재와 메이커 인터뷰 보도 영상입니다.
                                </p>
                            </div>

                            {/* YouTube Video Embed Container */}
                            <div className="max-w-4xl mx-auto w-full aspect-video rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/6QvD3FAs-NY"
                                    title="SNS 민심이 올림픽공원 반전의 활기 만든다... '올공 키링' 무료 나눔의 정체"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </section>

                    {/* Instagram Reels Section */}
                    <section className="py-20 bg-zinc-950 relative overflow-hidden border-b border-zinc-900">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-purple-600/10 via-rose-500/10 to-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
                            <div className="space-y-4">
                                <span className="text-rose-500 font-bold text-sm tracking-wider uppercase">behind story</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                    올공 키링의 탄생 비하인드
                                </h2>
                                <p className="text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
                                    아크릴 판을 자르고 단아한 국화와 무궁화 문양이 새겨지기까지,{' '}
                                    <br className="hidden sm:inline" />
                                    올공 키링이 만들어지는 생생한 전체 제작 과정을 인스타그램 릴스로 만나보세요.
                                </p>
                            </div>

                            <div className="pt-2">
                                <a
                                    href="https://www.instagram.com/jeong.minute"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/30"
                                >
                                    {/* Instagram Icon */}
                                    <svg
                                        className="w-5 h-5 text-rose-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                    릴스 보러가기
                                </a>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Footer */}
            <footer className="bg-zinc-950 pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-zinc-900 text-xs text-zinc-600 gap-4">
                        <p>© 2026 올공키링 & 신전대협. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:underline">
                                이용약관
                            </a>
                            <a href="#" className="hover:underline">
                                개인정보처리방침
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
