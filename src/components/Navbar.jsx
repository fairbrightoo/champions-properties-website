import React, { useState, useRef } from 'react';
import { FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap"; // Correct import
import { useGSAP } from "@gsap/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // 1. Initial State: Just invisible (opacity 0)
    useGSAP(() => {
        gsap.set(menuRef.current, { autoAlpha: 0 });
    }, []);

    // 2. Toggle Animation (Simple Fade)
    useGSAP(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                autoAlpha: 1, // Visible
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(menuRef.current, {
                autoAlpha: 0, // Invisible
                duration: 0.4,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    return (
        <>
            {/* --- Main Navbar --- */}
            <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-20 py-6 text-white pointer-events-none">

                {/* Logo */}
                <div className="font-heading text-2xl md:text-3xl tracking-wider z-50 relative pointer-events-auto">
                    CHAMPIONS
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 font-body text-lg font-bold tracking-wide pointer-events-auto">
                    <a href="#" className="hover:text-brand-light transition-colors">PROPERTIES</a>
                    <a href="#" className="hover:text-brand-light transition-colors">AGENTS</a>
                    <a href="#" className="hover:text-brand-light transition-colors">LOCATIONS</a>
                    <a href="#" className="hover:text-brand-light transition-colors">CONTACT</a>
                </div>

                {/* Icons & Burger */}
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

                    {/* Burger Icon (Only shows when menu is CLOSED) */}
                    {/* We hide this when open, because the overlay has its own close button */}
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

            {/* --- Mobile Menu Overlay --- */}
            {/* Z-[60] sits on top of navbar. bg-black/95 ensures visibility. */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden text-white opacity-0 invisible"
            >
                {/* Close Button INSIDE Overlay */}
                <button
                    className="absolute top-6 right-6 text-4xl text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer pointer-events-auto"
                    onClick={() => setIsOpen(false)}
                >
                    <FiX />
                </button>

                <div className="flex flex-col gap-10 font-heading text-4xl tracking-widest text-center pointer-events-auto">
                    <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-light transition-colors">PROPERTIES</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-light transition-colors">AGENTS</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-light transition-colors">LOCATIONS</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="hover:text-brand-light transition-colors">CONTACT</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;