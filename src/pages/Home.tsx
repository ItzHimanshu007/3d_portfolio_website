import { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import QuickLinks from '../components/QuickLinks';
import Values from '../components/Values';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Hackathons from '../components/Hackathons';
import Education from '../components/Education';
import Certificates from '../components/Certificates';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import ScrollEffects from '../components/ScrollEffects';
import ParticleBackground from '../components/ParticleBackground';
import SectionTransitions from '../components/SectionTransitions';
import ScrollModel from '../components/ScrollModel';
import { scrollToSection } from '../utils/scroll';


const Home = () => {
    const location = useLocation();

    useEffect(() => {
        const state = location.state as { scrollTo?: string } | null;
        if (state?.scrollTo) {
            const target = state.scrollTo;

            // Delay to allow DOM, Images, and Lenis to initialize fully
            // A slightly longer delay (500ms) ensures stable height calculation
            const timer = setTimeout(() => scrollToSection(target), 500);

            // Clear our state so a refresh doesn't re-scroll, keeping the router's own history keys intact
            window.history.replaceState({ ...window.history.state, usr: null }, '');
            return () => clearTimeout(timer);
        }
    }, [location]);

    return (
        <>
            <ParticleBackground />
            <ScrollEffects />
            <SectionTransitions />
            <Suspense fallback={null}>
                <ScrollModel />
            </Suspense>
            <main id="home">
                <Hero />
                <Values />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Hackathons />
                <Education />
                <Certificates />
                <Testimonials />
                <Contact />
                <QuickLinks />
            </main>
        </>
    );
};

export default Home;
