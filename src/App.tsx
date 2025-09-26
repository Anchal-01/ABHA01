// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Enroll from './pages/Enroll';
import Verify from './pages/Verify';  // ✅ Import Verify
import './App.css';

// src/App.tsx

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>ABHA Health ID</h1>
          <p>Secure. Digital. Connected.</p>
        </header>

        {/* Main content centered */}
        <main className="app-main">
          <div className="centered-layout">  {/* 👈 This centers everything */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/verify" element={<Verify />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

// Home Component
function Home() {
  return (
    <div className="container">
      <div className="card-grid">
        {/* Enroll Card */}
        <Link to="/enroll" className="action-card">  {/* ✅ Use Link, not <a> */}
          <div className="card-icon">🪪</div>
          <h2>Enroll ABHA</h2>
          <p>Create your digital health identity.</p>
        </Link>

        {/* Verify Card */}
        <Link to="/verify" className="action-card">  {/* ✅ Use Link */}
          <div className="card-icon">🔍</div>
          <h2>Verify ABHA</h2>
          <p>Verify an existing ABHA number.</p>
        </Link>
      </div>
    </div>
  );
}


export default App;