// app/components/MobileMenu.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                className={`fixed top-0 left-0 h-screen w-full bg-linear-to-b from-black to-[#1A0033] flex flex-col justify-center items-center gap-8 font-medium text-white transition-all duration-300 z-50 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-5 bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <Link href="#" className="text-2xl hover:text-indigo-300" onClick={onClose}>
                    Home
                </Link>

                <div className="flex flex-col items-center gap-2 text-2xl">
                    <span className="cursor-default">Products</span>
                    <div className="flex flex-col items-center gap-1 text-base text-gray-300">
                        <Link href="#" className="hover:text-indigo-300" onClick={onClose}>
                            Templates
                        </Link>
                        <Link href="#" className="hover:text-indigo-300" onClick={onClose}>
                            UI Components
                        </Link>
                        <Link href="#" className="hover:text-indigo-300" onClick={onClose}>
                            Mobile Apps
                        </Link>
                        <Link href="#" className="hover:text-indigo-300" onClick={onClose}>
                            Web Apps
                        </Link>
                    </div>
                </div>

                <Link href="#" className="text-2xl hover:text-indigo-300" onClick={onClose}>
                    Stories
                </Link>

                <Link href="#" className="text-2xl hover:text-indigo-300" onClick={onClose}>
                    Pricing
                </Link>

                <button
                    onClick={onClose}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-full text-xl font-medium transition mt-4"
                >
                    Sign up
                </button>
            </div>
        </>
    );
}