import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Properties from "./components/Properties";
import About from "./components/About";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SectionWrapper from "./components/SectionWrapper";
import ExploreOverlay from "./components/ExploreOverlay";
import PropertyContactForm from "./components/PropertyContactForm";
// 1. Import Privacy Overlay
import PrivacyOverlay from "./components/PrivacyOverlay";
import ContactOverlay from "./components/ContactOverlay"; // 1. Import

const App = () => {
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [contactProperty, setContactProperty] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // 2. Add Privacy State
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const handlePropertyContact = (propertyData) => {
        setContactProperty(propertyData);
    };

    return (
        <main className="relative w-full bg-brand-blue">
            <Navbar setIsContactOpen={setIsContactOpen} />

            <SectionWrapper id="hero-section" className="z-0">
                <Hero />
            </SectionWrapper>

            <Properties
                setIsExploreOpen={setIsExploreOpen}
                onContact={handlePropertyContact}
            />

            <About />
            <Team />
            <Testimonials />

            {/* 3. Pass setIsPrivacyOpen to Footer */}
            <Footer
                setIsPrivacyOpen={setIsPrivacyOpen}
                setIsContactOpen={setIsContactOpen}
            />

            {/* Overlays */}
            {isExploreOpen && (
                <ExploreOverlay
                    onClose={() => setIsExploreOpen(false)}
                    onContact={handlePropertyContact}
                />
            )}

            {isContactOpen && (
                <ContactOverlay onClose={() => setIsContactOpen(false)} />
            )}

            {contactProperty && (
                <PropertyContactForm
                    property={contactProperty}
                    onClose={() => setContactProperty(null)}
                />
            )}

            {/* 4. Render Privacy Overlay */}
            {isPrivacyOpen && (
                <PrivacyOverlay onClose={() => setIsPrivacyOpen(false)} />
            )}

        </main>
    )
}

export default App;