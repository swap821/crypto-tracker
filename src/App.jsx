import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;