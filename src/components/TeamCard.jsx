import React, { useState } from 'react';
import { FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa"; // Make sure react-icons is installed

const TeamCard = ({ member }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const getIcon = (type) => {
        switch(type) {
            case 'linkedin': return <FiLinkedin />;
            case 'instagram': return <FiInstagram />;
            case 'mail': return <FiMail />;
            case 'twitter': return <FaTwitter />;
            default: return null;
        }
    };

    return (
        // Container determines position and size based on props
        <div
            className="absolute perspective-1000 cursor-pointer group team-card-container"
            style={member.style}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* Inner Card - Handles the Rotation */}
            <div
                className="relative w-full h-full transition-transform duration-700 transform-style-3d"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >

                {/* --- FRONT SIDE --- */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden border border-white/20 bg-brand-dark shadow-2xl">
                    {/* Image */}
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />

                    {/* Gradient & Text Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-brand-gold text-[0.6rem] md:text-xs font-bold tracking-widest uppercase mb-1">
                            {member.role}
                        </p>
                        <h3 className="text-xs md:text-lg font-heading text-white uppercase leading-none">
                            {member.name}
                        </h3>
                    </div>
                </div>

                {/* --- BACK SIDE (Rotated) --- */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-brand-blue border-2 border-brand-gold p-4 flex flex-col justify-center items-center text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="w-12 h-1 bg-brand-gold mb-4"></div>
                    <h3 className="text-sm md:text-xl font-heading text-white uppercase mb-1">{member.name}</h3>
                    <p className="text-white/60 text-[0.6rem] md:text-xs mb-6 font-body">{member.role}</p>

                    <div className="flex gap-3 text-lg md:text-2xl text-white">
                        {Object.entries(member.socials).map(([type, url]) => (
                            <a
                                key={type}
                                href={url}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-brand-gold transition-colors hover:scale-110"
                            >
                                {getIcon(type)}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeamCard;