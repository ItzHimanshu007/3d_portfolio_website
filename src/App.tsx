import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Archive from './pages/Archive';
import ProjectDetail from './pages/ProjectDetail';
import HackathonDetail from './pages/HackathonDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



