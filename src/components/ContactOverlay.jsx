import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TiTimes } from "react-icons/ti";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";

const ContactOverlay = ({ onClose }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        onClose();
    };

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(contentRef.current,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
        tl.from(".contact-item", {
            y: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out"
        }, "-=0.2");
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 text-3xl text-brand-blue/50 hover:text-brand-blue transition-colors p-2"
                >
                    <TiTimes />
                </button>

                {/* --- LEFT COLUMN: Info --- */}
                <div className="w-full md:w-2/5 bg-brand-blue text-white p-8 md:p-12 flex flex-col justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-heading uppercase mb-6 contact-item">
                            Get in <br /> <span className="text-brand-gold">Touch</span>
                        </h2>
                        <p className="text-white/70 font-body mb-10 contact-item">
                            Ready to start your journey? Our team of experts is here to guide you to your dream property.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 contact-item">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                                    <FiMapPin />
                                </div>
                                <div>
                                    <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-1">Visit Us</p>
                                    <p className="text-sm text-white/90">1059 Ademola Adetokunbo Cres,<br/>Wuse II, Abuja 900288</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 contact-item">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                                    <FiPhone />
                                </div>
                                <div>
                                    <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-1">Call Us</p>
                                    <p className="text-sm text-white/90">+234 (800) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 contact-item">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold flex-shrink-0">
                                    <FiMail />
                                </div>
                                <div>
                                    <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-1">Email Us</p>
                                    <p className="text-sm text-white/90">info@champions.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 pt-10 border-t border-white/10 text-xs text-white/30 contact-item hidden md:block">
                        EST. 2025 CHAMPIONS PROPERTIES
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Form --- */}
                {/* FIX: Added 'pb-20' to ensure bottom padding for scrolling */}
                <div className="w-full md:w-3/5 bg-surface p-8 md:p-12 overflow-y-auto pb-20">
                    <h3 className="text-2xl font-heading text-brand-blue uppercase mb-8 contact-item">
                        Send a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 contact-item">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-brand-blue/50 uppercase tracking-wide">Full Name</label>
                                {/* FIX: Added 'text-brand-blue' to make typed text visible */}
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-blue focus:outline-none focus:border-brand-gold transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-brand-blue/50 uppercase tracking-wide">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-blue focus:outline-none focus:border-brand-gold transition-colors"
                                    placeholder="+234..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2 contact-item">
                            <label className="text-xs font-bold text-brand-blue/50 uppercase tracking-wide">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-blue focus:outline-none focus:border-brand-gold transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2 contact-item">
                            <label className="text-xs font-bold text-brand-blue/50 uppercase tracking-wide">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-white border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-blue focus:outline-none focus:border-brand-gold transition-colors resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="contact-item pt-2">
                            <button
                                type="submit"
                                className="w-full bg-brand-blue text-white font-bold uppercase text-sm tracking-widest py-4 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
                            >
                                Send Message <FiSend className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactOverlay;