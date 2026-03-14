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
    <div style={styles.pagina}>
      <div style={styles.hero}>
        <p style={styles.heroSubtitulo}>Encuentra tu repartidor de confianza</p>
        <input
          style={styles.buscador}
          type="text"
          placeholder="🔍  Buscar por zona (ej: Centro)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div style={styles.contenido}>
        {cargando ? (
          <p style={styles.mensaje}>Cargando repartidores...</p>
        ) : repartidoresFiltrados.length === 0 ? (
          <p style={styles.mensaje}>No se encontraron repartidores en esa zona.</p>
        ) : (
          repartidoresFiltrados.map(r => (
            <RepartidorCard key={r.id} repartidor={r} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  pagina: { backgroundColor: '#f0f4ff', minHeight: '100vh' },
  hero: { backgroundColor: '#1557b0', padding: '20px 16px 24px' },
  heroSubtitulo: { color: '#90caf9', fontSize: '13px', textAlign: 'center', margin: '0 0 12px' },
  buscador: { width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '8px', border: 'none', outline: 'none', boxSizing: 'border-box' },
  contenido: { padding: '16px' },
  mensaje: { textAlign: 'center', color: '#888', marginTop: '40px', fontSize: '15px' },
};

export default Home;