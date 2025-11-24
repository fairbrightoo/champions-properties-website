import React, { useState } from 'react';
import { TiTimes, TiArrowSortedDown } from "react-icons/ti";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { estates } from '../data/estates';

const ExploreOverlay = ({ onClose, onContact }) => {

    const locations = [...new Set(estates.map(item => item.location))];

    const [activeLocation, setActiveLocation] = useState(locations[0]);
    const [selectedEstateId, setSelectedEstateId] = useState(null);

    const filteredEstates = estates.filter(e => e.location === activeLocation);

    const currentEstate = selectedEstateId
        ? filteredEstates.find(e => e.id == selectedEstateId)
        : filteredEstates[0];

    const handleLocationChange = (loc) => {
        setActiveLocation(loc);
        setSelectedEstateId(null);
    };

    return (
        <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-7xl h-[85vh] bg-brand-dark text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Header --- */}
                <div className="p-6 border-b border-white/10 bg-brand-dark z-10">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-xl md:text-2xl font-heading uppercase text-white">
                            Explore Our <span className="text-brand-gold">Portfolio</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-3xl text-white/50 hover:text-white transition-colors"
                        >
                            <TiTimes />
                        </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {locations.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => handleLocationChange(loc)}
                                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                                    activeLocation === loc
                                        ? 'bg-brand-gold text-brand-dark border-brand-gold'
                                        : 'bg-transparent text-white/60 border-white/20 hover:border-white hover:text-white'
                                }`}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Body --- */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">

                    {/* Dropdown Selector */}
                    <div className="mb-10">
                        <label className="block text-xs font-bold text-brand-gold mb-3 uppercase tracking-widest">
                            Select Estate
                        </label>
                        <div className="relative max-w-md">
                            <select
                                value={currentEstate?.id || ''}
                                onChange={(e) => setSelectedEstateId(e.target.value)}
                                className="w-full appearance-none bg-surface/5 text-white text-lg py-4 px-6 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer transition-colors"
                            >
                                {filteredEstates.map((estate) => (
                                    <option key={estate.id} value={estate.id} className="bg-brand-dark">
                                        {estate.name}
                                    </option>
                                ))}
                            </select>
                            <TiArrowSortedDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-xl" />
                        </div>
                    </div>

                    {/* Prototypes Grid */}
                    {currentEstate ? (
                        <div className="animate-fadeIn">
                            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                <h3 className="text-3xl font-heading text-white uppercase">{currentEstate.name}</h3>
                                <span className="text-sm text-white/50 hidden md:block">{currentEstate.description}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentEstate.prototypes.map((proto, index) => (
                                    // --- UPDATED CARD DESIGN ---
                                    <div
                                        key={index}
                                        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 flex flex-col"
                                    >
                                        {/* 1. IMAGE SECTION */}
                                        <div className="h-48 w-full relative overflow-hidden">
                                            <img
                                                src={proto.image}
                                                alt={proto.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-brand-dark/80 backdrop-blur-sm text-brand-gold text-[10px] font-bold uppercase rounded-full tracking-wide flex items-center gap-1">
                                                <FiCheckCircle className="text-brand-gold" /> Available
                                            </div>
                                        </div>

                                        {/* 2. CONTENT SECTION */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h4 className="text-xl font-heading text-white mb-1">{proto.name}</h4>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-6">{proto.type}</p>

                                            <div className="border-t border-white/10 pt-4 mt-auto space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white/50">Plot Size</span>
                                                    <span className="text-white font-semibold">{proto.size}</span>
                                                </div>
                                                {/* 3. DUAL PRICE */}
                                                <div className="flex justify-between items-end">
                                                    <span className="text-white/50 text-sm">Price</span>
                                                    <div className="text-right">
                                                        <span className="block text-xs text-white/40 line-through decoration-brand-gold/50">{proto.oldPrice}</span>
                                                        <span className="block text-brand-gold font-bold text-xl leading-none">{proto.price}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => onContact({...proto, estateName: currentEstate.name})}
                                                className="w-full mt-6 py-3 bg-white text-brand-dark font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-brand-gold hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
                                            >
                                                Book Inspection <FiArrowUpRight />
                                            </button>
                                        </div>
                                    </div>
                                    // --- END UPDATED CARD ---
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-white/40 text-center py-20">Select a location to view properties.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExploreOverlay;