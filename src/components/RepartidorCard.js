import React from 'react';

function RepartidorCard({ repartidor }) {
  const abrirWhatsApp = () => {
    window.open(`https://wa.me/${repartidor.telefono}`, '_blank');
  };

  return (
    <div style={styles.card}>
      <div style={styles.info}>
        <h2 style={styles.nombre}>{repartidor.nombre}</h2>
        <p style={styles.detalle}>📍 Zona: {repartidor.zona}</p>
        <p style={styles.detalle}>🛵 Vehículo: {repartidor.vehiculo}</p>
        <p style={styles.detalle}>🕐 Horario: {repartidor.horario}</p>
        <p style={styles.detalle}>⭐ {repartidor.calificacion}</p>
      </div>
      <button style={styles.boton} onClick={abrirWhatsApp}>
        Contactar por WhatsApp
      </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  nombre: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '8px',
  },
  detalle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '4px',
  },
  boton: {
    backgroundColor: '#25d366',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default RepartidorCard;