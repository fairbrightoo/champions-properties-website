import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
    return (
        <main className="relative w-full min-h-screen bg-brand-blue">
            <Navbar />
            <Hero />
        </main>
    )
}

export default App;