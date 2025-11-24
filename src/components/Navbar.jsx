import React, { useState, useRef } from 'react';
import { FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ setIsContactOpen }) => { // Accept the prop
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const [navStyle, setNavStyle] = useState({
        bg: 'bg-brand-blue',
        text: 'text-white'
    });

    const sections = [
        { id: 'hero-section', bg: 'bg-brand-blue', text: 'text-white' },
        { id: 'properties',   bg: 'bg-surface',    text: 'text-brand-blue' },
        { id: 'about',        bg: 'bg-brand-dark', text: 'text-white' },
        { id: 'team',         bg: 'bg-surface',    text: 'text-brand-blue' },
        { id: 'testimonials', bg: 'bg-brand-blue', text: 'text-white' },
        { id: 'footer',       bg: 'bg-brand-dark', text: 'text-white' },
    ];

    useGSAP(() => {
        gsap.set(menuRef.current, { autoAlpha: 0 });

        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: `#${section.id}`,
                start: "top top+=10",
                end: "bottom top",
                refreshPriority: -1,
                onEnter: () => setNavStyle({ bg: section.bg, text: section.text }),
                onEnterBack: () => setNavStyle({ bg: section.bg, text: section.text }),
            });
        });

    }, []);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
        } else {
            gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
        }
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-20 py-6 transition-colors duration-500 ${navStyle.bg} ${navStyle.text} pointer-events-none`}>

                <div className="font-heading text-2xl md:text-3xl tracking-wider z-50 relative pointer-events-auto">
                    CHAMPIONS
                </div>

                <div className="hidden md:flex gap-8 font-body text-lg font-bold tracking-wide pointer-events-auto">
                    <a href="#properties" className="hover:text-brand-gold transition-colors">PROPERTIES</a>
                    <a href="#about" className="hover:text-brand-gold transition-colors">AGENTS</a>
                    <a href="#footer" className="hover:text-brand-gold transition-colors">LOCATIONS</a>

                    {/* --- FIX: Changed hover color to Gold --- */}
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="hover:text-brand-gold transition-colors uppercase font-bold tracking-wide"
                    >
                        CONTACT
                    </button>
                </div>

                <div className="flex gap-6 text-xl items-center z-50 relative pointer-events-auto">
                    <div className="hidden xs:flex gap-6">
                        <FiUser className="cursor-pointer hover:scale-110 transition-transform" />
                        <div className="relative cursor-pointer hover:scale-110 transition-transform">
                            <FiShoppingBag />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-red"></span>
                            </span>
                        </div>
                    </div>

                    {!isOpen && (
                        <button
                            className="md:hidden text-3xl focus:outline-none cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <FiMenu />
                        </button>
                    )}
                </div>
            </nav>

            <div
                ref={menuRef}
                className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center md:hidden text-white opacity-0 invisible"
            >
                <button
                    className="absolute top-6 right-6 text-4xl text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer pointer-events-auto"
                    onClick={() => setIsOpen(false)}
                >
                    <FiX />
                </button>

                <div className="flex flex-col gap-10 font-heading text-4xl tracking-widest text-center pointer-events-auto">
                    <a href="#properties" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors">PROPERTIES</a>
                    <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors">AGENTS</a>
                    <a href="#footer" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors">LOCATIONS</a>

                    {/* Mobile Contact Button */}
                    <button
                        onClick={() => { setIsOpen(false); setIsContactOpen(true); }}
                        className="hover:text-brand-gold transition-colors uppercase"
                    >
                        CONTACT
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;