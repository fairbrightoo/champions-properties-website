import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TiTimes } from "react-icons/ti";

const PrivacyOverlay = ({ onClose }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        gsap.from(contentRef.current, {
            y: 50, opacity: 0, duration: 0.5, ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-4xl max-h-[85vh] bg-brand-blue rounded-2xl border border-white/10 text-white overflow-hidden flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-brand-dark/50">
                    <h2 className="text-2xl font-heading text-white">Privacy Policy</h2>
                    <button onClick={onClose} className="text-3xl text-white/50 hover:text-white transition-colors">
                        <TiTimes />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto space-y-4 font-body text-white/80">
                    <p>Last updated: November 2025</p>
                    <h3 className="text-xl font-bold text-brand-gold">1. Introduction</h3>
                    <p>Welcome to Champions Properties. We respect your privacy...</p>
                    {/* Add more dummy text here */}
                </div>
            </div>
        </section>
    );
};

export default PrivacyOverlay;