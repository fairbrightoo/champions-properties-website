import React, { useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from './TeamCard';

gsap.registerPlugin(ScrollTrigger);

// --- 8 MEMBER LAYOUT CONFIGURATION (Unchanged) ---
const teamMembers = [
    {
        id: 1, name: "Sarah Adebayo", role: "Lead Architect",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '0%', left: '2%', width: '16%', aspectRatio: '3/4', zIndex: 2 }
    },
    {
        id: 2, name: "David Okon", role: "Senior Broker",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#", mail: "#" },
        style: { top: '30%', left: '0%', width: '22%', aspectRatio: '4/3', zIndex: 3 }
    },
    {
        id: 3, name: "Michelle Onoja", role: "Project Manager",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#" },
        style: { top: '55%', left: '8%', width: '24%', aspectRatio: '1/1', zIndex: 1 }
    },
    {
        id: 4, name: "Emeka Nwosu", role: "Construction Head",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '2%', left: '26%', width: '22%', aspectRatio: '3/5', zIndex: 2 }
    },
    {
        id: 5, name: "Grace Okafor", role: "Interior Head",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        socials: { instagram: "#", linkedin: "#" },
        style: { top: '13%', left: '57%', width: '24%', aspectRatio: '3/5', zIndex: 10 }
    },
    {
        id: 6, name: "Tunde Bakare", role: "Legal Counsel",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#", mail: "#" },
        style: { top: '45%', left: '42%', width: '18%', aspectRatio: '3/4', zIndex: 5 }
    },
    {
        id: 7, name: "Amina Yusuf", role: "Sales Director",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#", instagram: "#" },
        style: { top: '5%', right: '2%', width: '18%', aspectRatio: '1/1', zIndex: 3 }
    },
    {
        id: 8, name: "John Doe", role: "Marketing Lead",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '50%', right: '0%', width: '20%', aspectRatio: '4/3', zIndex: 12 }
    },
];

const Team = () => {
    const containerRef = useRef(null);
    const q = gsap.utils.selector(containerRef);

    useGSAP(() => {
        const cards = q('.team-card-container');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center+=100",
                toggleActions: "play none none reverse"
            },
            onComplete: startBreathing
        });

        tl.from(cards, {
            opacity: 0,
            scale: 0,
            x: () => gsap.utils.random([-1000, 1000]),
            y: () => gsap.utils.random([-1000, 1000]),
            rotation: () => gsap.utils.random(-45, 45),
            duration: 1.5,
            stagger: { amount: 0.5, from: "random" },
            ease: "power3.out"
        });

        function startBreathing() {
            cards.forEach((card) => {
                gsap.to(card, {
                    y: gsap.utils.random(-15, -25),
                    rotation: gsap.utils.random(-3, 3),
                    duration: gsap.utils.random(3, 5),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: gsap.utils.random(0, 2)
                });
            });
        }

    }, { scope: containerRef });

    return (
        <SectionWrapper
            id="team"
            // FIX 1: Reduced top padding (!pt-20 md:!pt-24) to lift Header UP
            className="z-30 bg-surface text-brand-blue !justify-start !pt-20 md:!pt-24 overflow-hidden"
        >
            <div className="container mx-auto px-4 h-full flex flex-col">

                {/* Header Section */}
                {/* Reduced bottom margin slightly to keep things tight */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-10 relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading leading-[0.9] text-brand-blue uppercase mb-4">
                            The <br /> <span className="text-brand-gold">Champions</span>
                        </h2>
                        <p className="text-brand-blue/70 font-body text-sm md:text-base max-w-md border-l-2 border-brand-gold pl-4">
                            Meet the elite team of architects, designers, and agents crafting your legacy.
                        </p>
                    </div>
                </div>

                {/* --- The Collage Container --- */}
                {/* FIX 2: Removed negative margin. */}
                {/* FIX 3: Changed aspect ratio to [16/8] (shorter) so bottom cards are pulled UP on screen */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-7xl mx-auto aspect-[9/10] md:aspect-[16/8] mt-0 mb-auto"
                >
                    {teamMembers.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Team;