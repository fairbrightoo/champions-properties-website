import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import House from './House';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

const SplitText = ({ children, className }) => {
    return (
        <span className={className}>
            {children.split("").map((char, i) => (
                <span key={i} className="inline-block opacity-0 letter-anim">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const championsRef = useRef(null);
    const subtextLeftRef = useRef(null);
    const subtextRightRef = useRef(null);

    const [houseGroup, setHouseGroup] = useState(null);
    const [houseScale, setHouseScale] = useState(0.4);
    const [isMobile, setIsMobile] = useState(false);

    // --- RESPONSIVE SCALING LOGIC ---
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setIsMobile(true);
                setHouseScale(0.15);
            } else if (width < 1280) {
                setIsMobile(false);
                setHouseScale(0.25);
            } else {
                setIsMobile(false);
                setHouseScale(0.4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- DYNAMIC Y POSITIONING ---
    // This ensures the shadow always sticks to the house
    // Mobile: 0 (Center), Desktop: -1 (Lower)
    const houseBaseY = isMobile ? 0 : -1;

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.fromTo(championsRef.current,
            { y: "100%" },
            { y: "0%", duration: 1.5, ease: "power4.out" }
        );

        tl.fromTo([subtextLeftRef.current, subtextRightRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "+=0.1"
        );

        if (houseGroup) {
            tl.fromTo(houseGroup.position,
                { y: 10 },
                { y: 0, duration: 5.5, ease: "bounce.out" },
                "<"
            );
        }

        tl.to(".letter-anim", {
            opacity: 1,
            duration: 0.05,
            stagger: { amount: 1, from: "random" }
        }, "+=0.2");

        tl.to(".fade-in-anim", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        }, "+=0.1");

    }, {
        scope: containerRef,
        dependencies: [houseGroup]
    });

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-brand-blue overflow-hidden">

            {/* --- Background Text --- */}
            {/* FIX #1: Reduced negative translate from -20 to -12 to tighten gap */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -translate-y-12 md:translate-y-0">
                <div className="relative w-full px-4 flex justify-center">
                    <div ref={subtextLeftRef} className="absolute -top-8 md:-top-14 left-[10%] opacity-0">
                        <p className="text-sm md:text-3xl lg:text-5xl font-body font-black tracking-widest text-surface/60 ">
                            Experience the
                        </p>
                    </div>

                    <div className="overflow-hidden w-full text-center">
                        <h1 ref={championsRef} className="font-heading text-[13vw] md:text-[15vw] leading-none text-surface select-none tracking-tighter uppercase opacity-90 translate-y-full">
                            CHAMPIONS
                        </h1>
                    </div>

                    <div ref={subtextRightRef} className="absolute -bottom-6 md:-bottom-10 right-[5%] opacity-0">
                        <p className="text-sm md:text-3xl lg:text-5xl font-body font-black tracking-widest text-surface/60 ">
                            Lifestyle!
                        </p>
                    </div>
                </div>
            </div>

            {/* --- The 3D Canvas --- */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [5, 2, 10], fov: 45 }}>
                    <ambientLight intensity={2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} />
                    <pointLight position={[-10, -10, -10]} intensity={5} />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                        mouseButtons={{
                            LEFT: THREE.MOUSE.ROTATE,
                            MIDDLE: THREE.MOUSE.DOLLY,
                            RIGHT: null
                        }}
                    />

                    <group ref={setHouseGroup}>
                        <Suspense fallback={null}>
                            {/* FIX #2: Use houseBaseY for the Y position */}
                            <House
                                scale={houseScale}
                                position={[0, houseBaseY, 0]}
                            />
                        </Suspense>
                    </group>

                    <Suspense fallback={null}>
                        <Environment files="/textures/potsdamer_platz_1k.hdr" />
                    </Suspense>

                    {/* FIX #3: Shadow Y is now relative to houseBaseY (always 0.01 below it) */}
                    <ContactShadows
                        position={[0, houseBaseY - 0.01, 0]}
                        opacity={0.5}
                        scale={10}
                        blur={1.5}
                        far={4.5}
                    />
                </Canvas>
            </div>

            {/* --- UI GROUP 1 --- */}
            <div className="absolute z-20
                bottom-32 right-6 text-right items-end
                md:bottom-12 md:left-10 md:text-left md:items-start md:right-auto
                lg:bottom-16 lg:left-20

                max-w-[80%] md:max-w-2xl lg:max-w-4xl flex flex-col gap-6 md:gap-6 lg:gap-10 pointer-events-none">

                <div>
                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-heading mb-2 md:mb-3 whitespace-nowrap text-white">
                        <SplitText>Modern Living Redefined</SplitText>
                    </h2>
                    <p className="text-sm md:text-lg lg:text-2xl text-white/90 font-body leading-relaxed font-medium">
                        <SplitText>Experience the pinnacle of architectural design.</SplitText> <br className="hidden md:block"/>
                        <SplitText>Sustainable, smart, and built for the future.</SplitText>
                    </p>
                </div>

                <div className="flex gap-3 md:gap-4 lg:gap-6 pointer-events-auto fade-in-anim opacity-0 translate-y-4 justify-end md:justify-start">
                    <button className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full border md:border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all duration-300 group">
                        <FiArrowLeft className="text-xl md:text-3xl lg:text-5xl" />
                    </button>
                    <button className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full border md:border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all duration-300 group">
                        <FiArrowRight className="text-xl md:text-3xl lg:text-5xl" />
                    </button>
                </div>
            </div>

            {/* --- UI GROUP 2 --- */}
            <div className="absolute z-20 pointer-events-none
                top-28 left-6 text-left
                md:top-auto md:bottom-12 md:left-auto md:right-10 md:text-right
                lg:bottom-16 lg:right-20
            ">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading text-white">
                    <SplitText>Start Your Journey</SplitText>
                </h2>
                <p className="text-xs md:text-base lg:text-xl text-white/80 font-body fade-in-anim opacity-0 translate-y-4">EST. 2025</p>
            </div>

        </section>
    );
};

export default Hero;