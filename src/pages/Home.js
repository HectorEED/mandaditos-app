import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import RepartidorCard from '../components/RepartidorCard';

function Home() {
  const [repartidores, setRepartidores] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerRepartidores = async () => {
      const querySnapshot = await getDocs(collection(db, 'repartidores'));
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRepartidores(lista);
      setCargando(false);
    };

    obtenerRepartidores();
  }, []);

  const repartidoresFiltrados = repartidores.filter(r =>
    r.zona.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <input
        style={styles.buscador}
        type="text"
        placeholder="Buscar por zona (ej: Centro)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando ? (
        <p style={styles.mensaje}>Cargando repartidores...</p>
      ) : repartidoresFiltrados.length === 0 ? (
        <p style={styles.mensaje}>No se encontraron repartidores en esa zona.</p>
      ) : (
        <div style={styles.grid}>
          {repartidoresFiltrados.map(r => (
            <RepartidorCard key={r.id} repartidor={r} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  buscador: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '24px',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  mensaje: {
    textAlign: 'center',
    color: '#888',
    marginTop: '40px',
    fontSize: '16px',
  }
};

export default Home;