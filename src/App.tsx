import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import HackathonArchive from './pages/HackathonArchive';
import ProjectDetail from './pages/ProjectDetail';
import HackathonDetail from './pages/HackathonDetail';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/archive" element={<PageTransition><Archive /></PageTransition>} />
        <Route path="/hackathons-archive" element={<PageTransition><HackathonArchive /></PageTransition>} />
        <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/hackathon/:id" element={<PageTransition><HackathonDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Navbar />
        <AnimatedRoutes />
        <BackToTop />
      </Layout>
    </Router>
  );
}

export default App;



