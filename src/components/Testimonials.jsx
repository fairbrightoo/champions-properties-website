import React, { useState, useRef, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { FaQuoteLeft } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const reviews = [
    {
        id: 1,
        text: "Champions Properties didn't just find us a house. They found us our sanctuary.",
        author: "Emmanuel Oshi",
        role: "CEO, TechCorp",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        text: "The level of detail and exclusivity they offer is unmatched in the Abuja market.",
        author: "Amina Bello",
        role: "Director, Zenith Bank",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        text: "Investing with Champions was the best financial decision I made this decade.",
        author: "Tunde Bakare",
        role: "Real Estate Investor",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const detailsRef = useRef(null);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    // 1. AUTO-PLAY LOGIC
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    // 2. ANIMATION LOGIC (TYPEWRITER WORD-BY-WORD)
    useGSAP(() => {
        // A. Animate Words (The Typewriter Effect)
        // We target all elements with class 'word-anim'
        gsap.fromTo(".word-anim",
            {
                opacity: 0,
                y: 20,
                filter: "blur(10px)" // Starts blurry
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)", // Becomes sharp
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.08 // 0.08s delay between each word
            }
        );

        // B. Fade/Slide in Author Details
        gsap.fromTo(detailsRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.5 }
        );

    }, [activeIndex]); // Re-run every time the slide changes

    const currentReview = reviews[activeIndex];

    return (
        <SectionWrapper
            id="testimonials"
            className="z-40 bg-brand-blue text-white !justify-start !pt-28 md:!pt-32"
        >
            <div ref={containerRef} className="container mx-auto px-4 h-full flex flex-col justify-between pb-12 md:pb-20">

                {/* --- Header --- */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-brand-gold font-body tracking-widest uppercase text-sm font-bold">
                        Client Stories
                    </p>
                    <div className="text-brand-gold/20 text-6xl md:text-8xl">
                        <FaQuoteLeft />
                    </div>
                </div>

                {/* --- Main Content (Centered) --- */}
                <div className="flex-1 flex flex-col justify-center max-w-5xl">

                    {/* The Quote (Split into Words) */}
                    <h2 className="text-3xl md:text-6xl lg:text-7xl font-heading uppercase leading-[1.1] mb-10 md:mb-16 min-h-[150px] md:min-h-[240px]">
                        {currentReview.text.split(" ").map((word, index) => (
                            <span
                                key={index}
                                className="inline-block mr-3 md:mr-5 opacity-0 word-anim" // 'word-anim' is the target
                            >
                                {word}
                            </span>
                        ))}
                    </h2>

                    {/* The Author Details */}
                    <div ref={detailsRef} className="flex items-center gap-4 md:gap-6 opacity-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-brand-gold p-1">
                            <img
                                src={currentReview.image}
                                alt={currentReview.author}
                                className="w-full h-full object-cover rounded-full grayscale"
                            />
                        </div>
                        <div>
                            <p className="font-heading text-xl md:text-3xl uppercase text-white">
                                {currentReview.author}
                            </p>
                            <p className="font-body text-xs md:text-sm text-brand-gold uppercase tracking-widest">
                                {currentReview.role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Navigation Buttons --- */}
                <div className="flex justify-end gap-4 mt-8 md:mt-0">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300 group"
                    >
                        <FiArrowLeft className="text-xl md:text-2xl" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300 group"
                    >
                        <FiArrowRight className="text-xl md:text-2xl" />
                    </button>
                </div>

            </div>
        </SectionWrapper>
    );
};

export default Testimonials;