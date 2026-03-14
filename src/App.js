import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  const esAdmin = window.location.pathname === '/admin';

  return (
    <div>
      <Navbar />
      {esAdmin ? <Admin /> : <Home />}
    </div>
  );
}

export default App;