import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

function Estrellas({ calificacion }) {
  return (
    <span style={{ color: '#f4a400', fontSize: '13px' }}>
      {'★'.repeat(Math.round(calificacion))}{'☆'.repeat(5 - Math.round(calificacion))}
    </span>
  );
}

function RepartidorCard({ repartidor }) {
  const [mostrarFormReseña, setMostrarFormReseña] = useState(false);
  const [nombreReseña, setNombreReseña] = useState('');
  const [textoReseña, setTextoReseña] = useState('');
  const [reseñas, setReseñas] = useState(repartidor.reseñas || []);
  const [estrellasSeleccionadas, setEstrellasSeleccionadas] = useState(5);
  const [calificacionActual, setCalificacionActual] = useState(repartidor.calificacion);
  const [guardando, setGuardando] = useState(false);

  const abrirWhatsApp = () => {
    window.open(`https://wa.me/${repartidor.telefono}`, '_blank');
  };

  const llamar = () => {
    window.open(`tel:${repartidor.telefono}`);
  };

  const agregarReseña = async () => {
    if (!nombreReseña.trim() || !textoReseña.trim()) return;

    setGuardando(true);

    const nueva = {
      nombre: nombreReseña,
      texto: textoReseña,
      estrellas: estrellasSeleccionadas
    };

    const nuevasReseñas = [...reseñas, nueva];

    const promedio = nuevasReseñas.reduce((sum, r) => sum + r.estrellas, 0) / nuevasReseñas.length;
    const redondeado = Math.round(promedio * 10) / 10;

    try {
      const repartidorRef = doc(db, 'repartidores', repartidor.id);
      await updateDoc(repartidorRef, {
        reseñas: nuevasReseñas,
        calificacion: redondeado
      });

      setReseñas(nuevasReseñas);
      setCalificacionActual(redondeado);
      setNombreReseña('');
      setTextoReseña('');
      setEstrellasSeleccionadas(5);
      setMostrarFormReseña(false);
    } catch (error) {
      alert('Error al guardar la reseña, intenta de nuevo.');
    }

    setGuardando(false);
  };

  return (
    <div style={styles.card}>

      <div style={styles.header}>
        <div style={styles.fotoCirculo}>
          {repartidor.foto
            ? <img src={repartidor.foto} alt={repartidor.nombre} style={styles.foto} />
            : <span style={{ fontSize: '26px' }}>👤</span>
          }
        </div>
        <div style={{ flex: 1 }}>
          <p style={styles.nombre}>{repartidor.nombre}</p>
          <p style={styles.subNombre}>🛵 {repartidor.vehiculo} • {repartidor.zona}</p>
        </div>
        <div style={styles.calificacionBadge}>
          <p style={styles.calificacionNum}>{calificacionActual}</p>
          <Estrellas calificacion={calificacionActual} />
        </div>
      </div>

      <div style={styles.cuerpo}>

        <div style={styles.grid}>
          <div style={styles.infoBox}>
            <p style={styles.infoLabel}>Horario</p>
            <p style={styles.infoValor}>{repartidor.horario}</p>
          </div>
          <div style={styles.infoBox}>
            <p style={styles.infoLabel}>Vehículo</p>
            <p style={styles.infoValor}>{repartidor.vehiculo}</p>
          </div>
        </div>

        <p style={styles.descripcion}>{repartidor.descripcion}</p>

        <div style={styles.reseñasContainer}>
          <p style={styles.reseñasTitulo}>Reseñas ({reseñas.length})</p>

          {reseñas.length === 0 && (
            <p style={styles.sinReseñas}>Aún no hay reseñas. ¡Sé el primero!</p>
          )}

          {reseñas.map((r, i) => (
            <div key={i} style={styles.reseñaItem}>
              <div style={styles.reseñaHeader}>
                <span style={styles.reseñaNombre}>{r.nombre}</span>
                <span style={{ color: '#f4a400', fontSize: '11px' }}>
                  {'★'.repeat(r.estrellas || 5)}{'☆'.repeat(5 - (r.estrellas || 5))}
                </span>
              </div>
              <p style={styles.reseñaTexto}>{r.texto}</p>
            </div>
          ))}

          {mostrarFormReseña ? (
            <div style={styles.formReseña}>
              <input
                style={styles.inputReseña}
                placeholder="Tu nombre"
                value={nombreReseña}
                onChange={e => setNombreReseña(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#555' }}>Calificación:</span>
                {[1, 2, 3, 4, 5].map(n => (
                  <span
                    key={n}
                    onClick={() => setEstrellasSeleccionadas(n)}
                    style={{
                      fontSize: '22px',
                      cursor: 'pointer',
                      color: n <= estrellasSeleccionadas ? '#f4a400' : '#ddd'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                style={styles.textareaReseña}
                placeholder="Escribe tu reseña..."
                value={textoReseña}
                onChange={e => setTextoReseña(e.target.value)}
                rows={3}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{ ...styles.btnEnviar, opacity: guardando ? 0.6 : 1 }}
                  onClick={agregarReseña}
                  disabled={guardando}
                >
                  {guardando ? 'Guardando...' : 'Enviar'}
                </button>
                <button style={styles.btnCancelar} onClick={() => setMostrarFormReseña(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button style={styles.btnReseña} onClick={() => setMostrarFormReseña(true)}>
              + Escribir reseña
            </button>
          )}
        </div>

        <div style={styles.botonesGrid}>
          <button style={styles.btnWhatsapp} onClick={abrirWhatsApp}>WhatsApp</button>
          <button style={styles.btnLlamar} onClick={llamar}>Llamar</button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '16px' },
  header: { backgroundColor: '#1a73e8', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' },
  fotoCirculo: { width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#90caf9', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },
  foto: { width: '100%', height: '100%', objectFit: 'cover' },
  nombre: { color: 'white', fontSize: '16px', fontWeight: '700', margin: 0 },
  subNombre: { color: '#bbdefb', fontSize: '12px', margin: '2px 0 0' },
  calificacionBadge: { backgroundColor: 'white', borderRadius: '8px', padding: '4px 10px', textAlign: 'center', flexShrink: 0 },
  calificacionNum: { color: '#1a73e8', fontSize: '16px', fontWeight: '700', margin: 0 },
  cuerpo: { padding: '16px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' },
  infoBox: { backgroundColor: '#f0f4ff', borderRadius: '8px', padding: '8px 10px' },
  infoLabel: { color: '#888', fontSize: '11px', margin: 0 },
  infoValor: { color: '#222', fontSize: '13px', fontWeight: '600', margin: '2px 0 0' },
  descripcion: { color: '#555', fontSize: '13px', marginBottom: '14px' },
  reseñasContainer: { borderTop: '1px solid #eee', paddingTop: '12px', marginBottom: '14px' },
  reseñasTitulo: { color: '#333', fontSize: '13px', fontWeight: '600', margin: '0 0 8px' },
  sinReseñas: { color: '#aaa', fontSize: '12px', marginBottom: '8px' },
  reseñaItem: { backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '10px', marginBottom: '6px' },
  reseñaHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  reseñaNombre: { fontSize: '12px', fontWeight: '600', color: '#333' },
  reseñaTexto: { fontSize: '12px', color: '#666', margin: 0 },
  btnReseña: { width: '100%', background: 'none', border: '1px dashed #1a73e8', borderRadius: '8px', padding: '8px', color: '#1a73e8', fontSize: '13px', cursor: 'pointer' },
  formReseña: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' },
  inputReseña: { padding: '8px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' },
  textareaReseña: { padding: '8px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', resize: 'none' },
  btnEnviar: { flex: 1, backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '13px', cursor: 'pointer' },
  btnCancelar: { flex: 1, backgroundColor: '#eee', color: '#555', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '13px', cursor: 'pointer' },
  botonesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  btnWhatsapp: { backgroundColor: '#25d366', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' },
  btnLlamar: { backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' },
};

export default RepartidorCard;