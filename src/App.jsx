import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* Our main dashboard */}
          <Route path="/" element={<Home />} />
          
          {/* Dynamic route for specific coins */}
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;