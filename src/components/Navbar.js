import React from 'react';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <h1 style={styles.titulo}>Mandaditos Cd. Mante</h1>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#1a73e8',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  logo: {
    height: '40px',
    width: 'auto',
  },
  titulo: {
    color: 'white',
    fontSize: '18px',
    fontWeight: '700',
  }
};

export default Navbar;