import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useState, useCallback } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import IronManPreloader from './components/IronManPreloader';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

// Lazy load pages for better initial load performance
const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const HackathonArchive = lazy(() => import('./pages/HackathonArchive'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const HackathonDetail = lazy(() => import('./pages/HackathonDetail'));

const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#888',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '0.9rem',
  }}>
    Loading...
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Suspense fallback={<PageLoader />}><Home /></Suspense></PageTransition>} />
        <Route path="/archive" element={<PageTransition><Suspense fallback={<PageLoader />}><Archive /></Suspense></PageTransition>} />
        <Route path="/hackathons-archive" element={<PageTransition><Suspense fallback={<PageLoader />}><HackathonArchive /></Suspense></PageTransition>} />
        <Route path="/project/:id" element={<PageTransition><Suspense fallback={<PageLoader />}><ProjectDetail /></Suspense></PageTransition>} />
        <Route path="/hackathon/:id" element={<PageTransition><Suspense fallback={<PageLoader />}><HackathonDetail /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <IronManPreloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <Analytics />
          <ScrollToTop />
          <a href="#home" className="skip-to-content">
            Skip to main content
          </a>
          <Layout>
            <ErrorBoundary>
              <Navbar />
              <AnimatedRoutes />
              <BackToTop />
            </ErrorBoundary>
          </Layout>
        </Router>
      )}
    </>
  );
}

export default App;
