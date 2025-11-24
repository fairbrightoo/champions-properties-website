import React, { useRef } from 'react';
import { FiArrowUpRight } from "react-icons/fi";

const PropertyCard = ({ estate, onClick }) => {
    const isVideo = estate.src.endsWith('.mp4');
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            onClick={() => onClick(estate)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full h-full flex-shrink-0 bg-brand-dark rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/5 hover:border-brand-gold/50 transition-all duration-500"
        >
            {/* --- Media Layer --- */}
            <div className="absolute inset-0 h-full w-full">
                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={estate.src}
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                ) : (
                    <img
                        src={estate.src}
                        alt={estate.name}
                        className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110"
                    />
                )}
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-transparent opacity-90" />
            </div>

            {/* --- Content Layer --- */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start">
                <p className="text-brand-gold text-xs tracking-widest uppercase font-bold mb-2">
                    {estate.location}
                </p>
                <h3 className="text-3xl font-heading text-white uppercase mb-2 leading-none">
                    {estate.name}
                </h3>
                <p className="text-white/70 font-body text-sm line-clamp-2 max-w-xs group-hover:text-white transition-colors">
                    {estate.description}
                </p>

                {/* Action Button */}
                <div className="mt-6 flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest border-b border-brand-gold pb-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    View Details <FiArrowUpRight className="text-brand-gold text-lg" />
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;