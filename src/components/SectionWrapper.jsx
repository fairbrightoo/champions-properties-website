import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({ children, id, className, style }) => {
    const sectionRef = useRef(null);

    const isHero = id === 'hero-section';

    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
            {
                scale: 1,
                rotateX: 0,
                y: 0,
                filter: "brightness(1)",
                borderRadius: "0px", // Start sharp
                transformPerspective: 800, // Lower value = More dramatic 3D effect
                transformOrigin: "top center"
            },
            {
                scale: 0.85, // Shrink more to reveal the layer underneath
                rotateX: -45, // Deep tilt backwards
                y: -50, // Lift it slightly up as it tilts
                filter: "brightness(0.3)", // Get darker (shadow effect)
                borderRadius: "50px", // Rounding corners simulates a "curved" edge
                ease: "power2.out", // Smooth curve
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );
    }, { scope: sectionRef });

    const wrapperClasses = isHero
        ? `h-screen w-full sticky top-0 overflow-hidden ${className || ''}`
        : `h-screen w-full sticky top-0 overflow-hidden flex flex-col justify-center pt-40 pb-24 ${className || ''}`;

    return (
        <section
            ref={sectionRef}
            id={id}
            style={style}
            // Added shadow-2xl to help separate the layers visually
            className={`will-change-transform shadow-2xl ${wrapperClasses}`}
        >
            {isHero ? (
                children
            ) : (
                <div className="h-full w-full flex flex-col justify-center">
                    {children}
                </div>
            )}
        </section>
    );
};

export default SectionWrapper;