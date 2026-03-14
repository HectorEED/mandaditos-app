import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>🛵 Mandaditos de la Ciudad</h1>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#ff6b35',
    padding: '16px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    color: 'white',
    fontSize: '22px',
    fontWeight: 'bold',
  }
};

export default Navbar;