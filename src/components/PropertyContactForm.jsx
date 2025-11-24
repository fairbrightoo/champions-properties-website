import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TiTimes, TiPlus, TiMinus } from "react-icons/ti";
//import emailjs from '@emailjs/browser';

const PropertyContactForm = ({ onClose, property }) => {
    const containerRef = useRef(null);
    const formBoxRef = useRef(null);
    const formRef = useRef();

    const [showMarketer, setShowMarketer] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useGSAP(() => {
        gsap.from(formBoxRef.current, {
            y: 100, opacity: 0, duration: 0.5, ease: 'power3.out'
        });
    }, { scope: containerRef });

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- EmailJS Logic (Placeholder for your keys) ---
        // emailjs.sendForm(...) logic goes here similar to your previous project
        // For now, we simulate a success after 2 seconds
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            // e.target.reset();
            // setTimeout(() => { onClose(); setSubmitStatus(null); }, 3000);
        }, 2000);
    };

    return (
        <section
            ref={containerRef}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-brand-dark/90 backdrop-blur-md p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                ref={formBoxRef}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden grid grid-cols-1 md:grid-cols-2 bg-brand-blue rounded-2xl border border-white/10 text-white shadow-2xl scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl text-white/50 hover:text-white transition-colors z-20 bg-black/20 hover:bg-white/10 rounded-full p-1 backdrop-blur-md"
                >
                    <TiTimes />
                </button>

                {/* --- LEFT SIDE: Property Preview --- */}
                <div className="relative h-64 md:h-auto bg-brand-dark">
                    <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/40 to-transparent flex flex-col justify-end p-8">
                        <span className="px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider w-fit rounded mb-2">
                            Selected Property
                        </span>
                        <h3 className="text-3xl font-heading leading-tight uppercase">{property.name}</h3>
                        <p className="text-brand-gold font-bold text-xl mt-2">{property.price}</p>
                        <p className="text-white/70 text-sm mt-1 font-body">{property.size} • {property.type}</p>
                    </div>
                </div>

                {/* --- RIGHT SIDE: The Form --- */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-3xl font-heading mb-2 text-white">Make it <span className="text-brand-gold">Yours</span></h2>
                        <p className="text-white/60 text-sm font-body">
                            Fill out the form below to schedule an inspection or request more details about this specific property.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={sendEmail} className="space-y-5 font-body">

                        {/* Hidden input for property name */}
                        <input type="hidden" name="property_name" value={property.name} />

                        {submitStatus === 'success' && (
                            <div className="p-3 bg-green-900/50 border border-green-500 text-green-200 rounded text-center text-sm">
                                Request sent successfully!
                            </div>
                        )}

                        <div>
                            <label className="text-xs text-brand-gold uppercase tracking-wide ml-1 font-bold">Full Name</label>
                            <input
                                required
                                name="user_name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-white/30"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-brand-gold uppercase tracking-wide ml-1 font-bold">Phone</label>
                                <input
                                    required
                                    name="user_phone"
                                    type="tel"
                                    placeholder="+234..."
                                    className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-white/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-brand-gold uppercase tracking-wide ml-1 font-bold">Email</label>
                                <input
                                    required
                                    name="user_email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-white/30"
                                />
                            </div>
                        </div>

                        {/* Marketer Accordion */}
                        <div className="pt-2 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => setShowMarketer(!showMarketer)}
                                className="flex items-center gap-2 text-sm text-brand-gold hover:text-white transition-colors focus:outline-none"
                            >
                                {showMarketer ? <TiMinus /> : <TiPlus />}
                                <span>Referred by a Marketer?</span>
                            </button>

                            {showMarketer && (
                                <div className="grid grid-cols-2 gap-4 mt-4 animate-fadeIn">
                                    <div>
                                        <label className="text-xs text-white/50 uppercase tracking-wide ml-1">Marketer Name</label>
                                        <input name="marketer_name" type="text" placeholder="Agent Name" className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-white/30" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/50 uppercase tracking-wide ml-1">Marketer Phone</label>
                                        <input name="marketer_phone" type="tel" placeholder="Agent Phone" className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-white/30" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-xs text-brand-gold uppercase tracking-wide ml-1 font-bold">Message</label>
                            <textarea
                                name="message"
                                rows="3"
                                defaultValue={`I am interested in the ${property.name}. Please contact me regarding inspection and payment plans.`}
                                className="w-full bg-black/20 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder-white/30"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full font-bold font-heading tracking-widest uppercase py-4 rounded-lg transition-all duration-300 ${
                                isSubmitting
                                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                    : 'bg-brand-gold text-brand-dark hover:bg-white hover:text-brand-blue'
                            }`}
                        >
                            {isSubmitting ? 'Sending Request...' : 'Request Details'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PropertyContactForm;