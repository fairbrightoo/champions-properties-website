import React from 'react';
import SectionWrapper from './SectionWrapper';
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const About = () => {
    return (
        // z-20 to sit ON TOP of Properties (z-10)
        // bg-brand-dark to contrast with the white Properties section
        <SectionWrapper id="about" className="z-20 bg-brand-dark text-white">
            <div className="container mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left: Text Content */}
                <div className="flex flex-col gap-8">
                    <div>
                        <p className="text-brand-gold font-body tracking-widest uppercase mb-4">
                            Our Story
                        </p>
                        <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] mb-6">
                            BEYOND <br /> <span className="text-brand-gold">PREMIUM</span>
                        </h2>
                        <p className="text-lg text-white/80 font-body leading-relaxed max-w-md">
                            Founded in 2023, Champions Properties isn't just about selling houses.
                            It's about curating lifestyles for the ambitious, the bold, and the visionaries.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {["Exclusive Locations", "Smart Home Integration", "Sustainable Design"].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-xl font-heading text-white/90">
                                <FiCheckCircle className="text-brand-gold" />
                                {item}
                            </div>
                        ))}
                    </div>

                    <button className="w-fit flex items-center gap-3 px-8 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 uppercase tracking-widest font-bold text-sm">
                        Read Our Philosophy <FiArrowRight />
                    </button>
                </div>

                {/* Right: Image/Visual */}
                <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop"
                        alt="About Champions"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gold Overlay */}
                    <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay"></div>
                </div>

            </div>
        </SectionWrapper>
    );
};

export default About;