import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const CONTRASEÑA = 'mandaditos2024';

function Admin() {
  const [acceso, setAcceso] = useState(false);
  const [intentoContraseña, setIntentoContraseña] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    zona: '',
    vehiculo: '',
    horario: '',
    descripcion: '',
    foto: '',
    calificacion: 5,
  });

  const verificarContraseña = () => {
    if (intentoContraseña === CONTRASEÑA) {
      setAcceso(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarRepartidor = async () => {
    if (!form.nombre || !form.telefono || !form.zona || !form.vehiculo || !form.horario) {
      alert('Llena todos los campos obligatorios');
      return;
    }

    setGuardando(true);
    try {
      await addDoc(collection(db, 'repartidores'), {
        ...form,
        calificacion: parseFloat(form.calificacion),
        reseñas: [],
      });
      setExito(true);
      setForm({
        nombre: '',
        telefono: '',
        zona: '',
        vehiculo: '',
        horario: '',
        descripcion: '',
        foto: '',
        calificacion: 5,
      });
      setTimeout(() => setExito(false), 3000);
    } catch (error) {
      alert('Error al guardar, intenta de nuevo.');
    }
    setGuardando(false);
  };

  if (!acceso) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <h2 style={styles.loginTitulo}>Panel de Administrador</h2>
          <p style={styles.loginSubtitulo}>Ingresa la contraseña para continuar</p>
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={intentoContraseña}
            onChange={e => setIntentoContraseña(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verificarContraseña()}
          />
          <button style={styles.btnPrincipal} onClick={verificarContraseña}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Agregar Repartidor</h2>

      {exito && (
        <div style={styles.alertaExito}>
          ✅ Repartidor agregado correctamente
        </div>
      )}

      <div style={styles.form}>
        <div style={styles.campo}>
          <label style={styles.label}>Nombre *</label>
          <input style={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez" />
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>Teléfono * (con código de país)</label>
          <input style={styles.input} name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ej: 528311234567" />
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>Zona *</label>
          <input style={styles.input} name="zona" value={form.zona} onChange={handleChange} placeholder="Ej: Centro" />
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>Vehículo *</label>
          <select style={styles.input} name="vehiculo" value={form.vehiculo} onChange={handleChange}>
            <option value="">Selecciona...</option>
            <option value="Moto">Moto</option>
            <option value="Bicicleta">Bicicleta</option>
            <option value="Auto">Auto</option>
            <option value="A pie">A pie</option>
          </select>
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>Horario *</label>
          <input style={styles.input} name="horario" value={form.horario} onChange={handleChange} placeholder="Ej: 9:00 - 21:00" />
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>Descripción</label>
          <textarea style={{ ...styles.input, resize: 'none' }} name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Ej: Mandados rápidos por toda la zona" rows={3} />
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>URL de foto (opcional)</label>
          <input style={styles.input} name="foto" value={form.foto} onChange={handleChange} placeholder="https://..." />
        </div>

        <div style={styles.campo}>
          <label style={styles.label}>Calificación inicial (1-5)</label>
          <input style={styles.input} name="calificacion" type="number" min="1" max="5" step="0.1" value={form.calificacion} onChange={handleChange} />
        </div>

        <button
          style={{ ...styles.btnPrincipal, opacity: guardando ? 0.6 : 1 }}
          onClick={agregarRepartidor}
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : '+ Agregar Repartidor'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
  loginCard: { backgroundColor: 'white', borderRadius: '12px', padding: '32px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' },
  loginTitulo: { color: '#1a73e8', fontSize: '20px', fontWeight: '700', margin: 0, textAlign: 'center' },
  loginSubtitulo: { color: '#888', fontSize: '14px', margin: 0, textAlign: 'center' },
  container: { maxWidth: '600px', margin: '0 auto', padding: '24px 16px' },
  titulo: { color: '#1a73e8', fontSize: '22px', fontWeight: '700', marginBottom: '20px' },
  alertaExito: { backgroundColor: '#e6f4ea', color: '#2d7a3a', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  campo: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#444' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  btnPrincipal: { backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
};

export default Admin;