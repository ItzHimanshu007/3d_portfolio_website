import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import QuickLinks from '../components/QuickLinks';
import Values from '../components/Values';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Hackathons from '../components/Hackathons';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certificates from '../components/Certificates';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import ScrollEffects from '../components/ScrollEffects';
import ParticleBackground from '../components/ParticleBackground';
import SectionTransitions from '../components/SectionTransitions';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        const state = location.state as { scrollTo?: string } | null;
        if (state?.scrollTo) {
            const target = state.scrollTo;
            // Delay to allow DOM and Lenis to initialize
            const timer = setTimeout(() => {
                const element = document.getElementById(target);
                if (element) {
                    if ((window as any).lenis) {
                        (window as any).lenis.scrollTo(element, { offset: -50 });
                    } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 300);

            // Clean up state to prevent re-scroll on refresh
            window.history.replaceState({}, document.title);
            return () => clearTimeout(timer);
        }
    }, [location]);

    return (
        <>
            <ParticleBackground />
            <ScrollEffects />
            <SectionTransitions />
            <main id="home">
                <Hero />
                <Values />
                <About />
                <Skills />
                <Projects />
                <Hackathons />
                <Experience />
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

