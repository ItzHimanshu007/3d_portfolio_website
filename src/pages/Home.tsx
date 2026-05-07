import { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import QuickLinks from '../components/QuickLinks';
import Values from '../components/Values';
import About from '../components/About';
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


const Home = () => {
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const state = location.state as { scrollTo?: string } | null;
        if (state?.scrollTo) {
            const target = state.scrollTo;
            
            // Delay to allow DOM, Images, and Lenis to initialize fully
            // A slightly longer delay (500ms) ensures stable height calculation
            const timer = setTimeout(() => {
                const element = document.getElementById(target);
                if (element) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const lenis = (window as any).lenis;
                    if (lenis) {
                        lenis.scrollTo(element, { 
                            offset: -80, // Account for fixed navbar
                            duration: 1.2,
                            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        });
                    } else {
                        const offset = 80;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = element.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }, 500);

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
            <Suspense fallback={null}>
                <ScrollModel />
            </Suspense>
            <main id="home">
                <Hero />
                <Values />
                <About />
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

