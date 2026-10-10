import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { lazy, Suspense, useState, useCallback, type ReactNode } from 'react';
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
const NotFound = lazy(() => import('./pages/NotFound'));

const PRELOADER_SEEN_KEY = 'preloader-seen';

// The intro only plays on the first visit to the home page in a session, and never for reduced-motion users
// or deep links (someone opening a shared project link should see the project straight away).
const shouldShowPreloader = () => {
  if (window.location.pathname !== '/') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(PRELOADER_SEEN_KEY);
  } catch {
    return true;
  }
};

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

const page = (element: ReactNode) => (
  <PageTransition>
    <Suspense fallback={<PageLoader />}>{element}</Suspense>
  </PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/archive" element={page(<Archive />)} />
        <Route path="/hackathons-archive" element={page(<HackathonArchive />)} />
        <Route path="/project/:id" element={page(<ProjectDetail />)} />
        <Route path="/hackathon/:id" element={page(<HackathonDetail />)} />
        <Route path="*" element={page(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
};

// Moves keyboard focus past the navbar. Uses focus() instead of a #fragment so it works on every route.
const SkipLink = () => (
  <a
    href="#main-content"
    className="skip-to-content"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById('main-content')?.focus();
    }}
  >
    Skip to main content
  </a>
);

function App() {
  const [isLoading, setIsLoading] = useState(shouldShowPreloader);

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem(PRELOADER_SEEN_KEY, '1');
    } catch {
      // Storage can be unavailable (private mode); the intro will simply play again next time.
    }
    setIsLoading(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isLoading && <IronManPreloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <Analytics />
          <ScrollToTop />
          <SkipLink />
          <Layout>
            <ErrorBoundary>
              <Navbar />
              <AnimatedRoutes />
              <BackToTop />
            </ErrorBoundary>
          </Layout>
        </Router>
      )}
    </MotionConfig>
  );
}

export default App;
