import React, { useState, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import { FiArrowUpRight, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import PropertyCard from './PropertyCard';
import PropertyOverlay from './PropertyOverlay';
import { estates } from '../data/estates';

const Properties = ({ setIsExploreOpen, onContact }) => {
    const [selectedEstate, setSelectedEstate] = useState(null);

    // Duplicate list 3 times for infinite loop
    const marqueeEstates = [...estates, ...estates, ...estates];

    return (
        <SectionWrapper
            id="properties"
            className="z-10 bg-surface text-brand-blue !justify-start !pt-28 !pb-8"
        >
            <div className="container mx-auto px-4 w-full flex flex-col justify-center h-full overflow-hidden">

                {/* Header Section (Unchanged) */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 z-20 relative">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading leading-[0.9] text-brand-blue uppercase mb-2">
                            Featured <br /> <span className="text-brand-gold">Estates</span>
                        </h2>
                        <p className="text-brand-blue/70 font-body text-sm md:text-base max-w-md border-l-2 border-brand-gold pl-4">
                            Curated collections of Nigeria's most prestigious addresses.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsExploreOpen(true)}
                        className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b-2 border-brand-blue pb-1 hover:text-brand-gold hover:border-brand-gold transition-all cursor-pointer"
                    >
                        View All Properties <FiArrowUpRight className="text-lg" />
                    </button>
                </div>

                {/* --- Marquee Container --- */}
                <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                        {marqueeEstates.map((estate, index) => (
                            // FIX: Removed 'gap' from parent and added 'mr-8' (32px margin) to each item.
                            // This forces physical space between cards.
                            <div
                                key={`${estate.id}-${index}`}
                                className="w-[300px] md:w-[430px] h-[50vh] min-h-[350px] flex-shrink-0 mr-8 last:mr-0 transition-transform duration-300 hover:scale-[1.02] [&>div]:h-full"
                            >
                                <PropertyCard
                                    estate={estate}
                                    onClick={() => setSelectedEstate(estate)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); } 
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite; 
                }
            `}</style>

            {/* Overlay */}
            {selectedEstate && (
                <PropertyOverlay
                    estate={selectedEstate}
                    onContact={onContact}
                    onClose={() => setSelectedEstate(null)}
                />
            )}
        </SectionWrapper>
    );
};

export default Properties;