import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = ({ setIsPrivacyOpen }) => {

    const quickLinks = [
        { name: "Home", href: "#hero-section" },
        { name: "Properties", href: "#properties" },
        { name: "About Us", href: "#about" },
        { name: "The Team", href: "#team" },
        { name: "Testimonials", href: "#testimonials" },
    ];

    const socials = [
        { icon: <FaInstagram />, href: "#" },
        { icon: <FaLinkedin />, href: "#" },
        { icon: <FaTwitter />, href: "#" },
        { icon: <FaWhatsapp />, href: "#" },
    ];

    return (
        // Relative z-50 to sit on top of previous layers
        <footer id="footer" className="relative z-50 bg-brand-dark text-white h-auto border-t border-white/10">
            <div className="container mx-auto px-4 py-16 md:py-24">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* 1. Brand Column (Spans 5 cols) */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <h2 className="text-5xl md:text-7xl font-heading leading-none text-white uppercase select-none">
                            CHAMPIONS
                        </h2>
                        <p className="text-white/60 font-body max-w-sm leading-relaxed">
                            Redefining luxury living in Nigeria. We curate spaces that inspire, elevate, and endure.
                        </p>
                        <div className="flex gap-4 mt-4">
                            {socials.map((s, i) => (
                                <a key={i} href={s.href} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quick Links (Spans 3 cols) */}
                    <div className="md:col-span-3">
                        <h3 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h3>
                        <ul className="space-y-4 font-body">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-white/70 hover:text-brand-gold transition-colors inline-block">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            {/* Privacy Policy Trigger */}
                            <li>
                                <button
                                    onClick={() => setIsPrivacyOpen(true)}
                                    className="text-white/70 hover:text-brand-gold transition-colors text-left"
                                >
                                    Privacy Policy
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Contact Info (Spans 4 cols) */}
                    <div className="md:col-span-4">
                        <h3 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h3>
                        <div className="space-y-6 font-body">
                            <div>
                                <p className="text-xs text-white/40 uppercase mb-1">Head Office</p>
                                <p className="text-lg">1059 Ademola Adetokunbo Cres, <br/>Wuse II, Abuja 900288</p>
                            </div>
                            <div>
                                <a href="mailto:info@champions.com" className="flex items-center gap-3 text-white/80 hover:text-brand-gold transition-colors mb-2">
                                    <FaEnvelope /> info@champions.com
                                </a>
                                <a href="tel:+2348001234567" className="flex items-center gap-3 text-white/80 hover:text-brand-gold transition-colors">
                                    <FaPhoneAlt /> +234 (800) 123-4567
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Bar: Developer Credit --- */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-body">
                    <p>© 2025 Champions Properties. All Rights Reserved.</p>

                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
                        <span>Developed by <span className="text-brand-gold font-bold">Engr Bright Osisiogu</span></span>
                        <span className="hidden md:inline">•</span>
                        <a href="tel:+2347045763306" className="hover:text-white transition-colors flex items-center gap-2">
                            <FaPhoneAlt className="text-[10px]" /> 0704 576 3306
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;