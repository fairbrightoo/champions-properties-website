import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TiTimes } from "react-icons/ti";
import { FiCheckCircle, FiArrowUpRight } from "react-icons/fi";

// FIX: Added 'onContact' to the props list
const PropertyOverlay = ({ estate, onClose, onContact }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        // Animation In
        gsap.fromTo(contentRef.current,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
    }, []);

    return (
        <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-6xl h-[85vh] bg-brand-blue text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Header --- */}
                <div className="p-6 md:p-8 border-b border-white/10 bg-brand-dark/20 z-10 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-widest rounded-full">
                                Featured Estate
                            </span>
                            <span className="text-brand-gold/80 text-sm font-bold tracking-widest uppercase">
                                {estate.location}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-heading uppercase leading-none mb-2">
                            {estate.name}
                        </h2>
                        <p className="text-white/70 font-body max-w-xl text-sm md:text-base">{estate.description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-3xl text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
                    >
                        <TiTimes />
                    </button>
                </div>

                {/* --- Content: Prototypes Grid --- */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <h3 className="text-2xl font-heading text-white mb-8 border-l-4 border-brand-gold pl-4">
                        Available Prototypes
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {estate.prototypes.map((proto, index) => (
                            <div
                                key={index}
                                // Removed 'p-6' from here to let image fill width
                                className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 flex flex-col"
                            >
                                {/* --- 1. PROTOTYPE IMAGE --- */}
                                <div className="h-48 w-full relative overflow-hidden">
                                    <img
                                        src={proto.image}
                                        alt={proto.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-brand-dark/80 backdrop-blur-sm text-brand-gold text-[10px] font-bold uppercase rounded-full tracking-wide flex items-center gap-1">
                                        <FiCheckCircle className="text-brand-gold" /> Available
                                    </div>
                                </div>

                                {/* --- 2. CARD CONTENT --- */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="text-xl font-heading text-white mb-1">{proto.name}</h4>
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-6">{proto.type}</p>

                                    <div className="border-t border-white/10 pt-4 mt-auto space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/50">Plot Size</span>
                                            <span className="text-white font-semibold">{proto.size}</span>
                                        </div>

                                        {/* --- 3. DUAL PRICE DISPLAY --- */}
                                        <div className="flex justify-between items-end">
                                            <span className="text-white/50 text-sm">Price</span>
                                            <div className="text-right">
                                                <span className="block text-xs text-white/40 line-through decoration-brand-gold/50">{proto.oldPrice}</span>
                                                <span className="block text-brand-gold font-bold text-xl leading-none">{proto.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onContact({...proto, estateName: estate.name})}
                                        className="w-full mt-6 py-3 bg-white text-brand-dark font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-brand-gold hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
                                    >
                                        Book Inspection <FiArrowUpRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyOverlay;