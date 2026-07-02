import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }
    if (password.length < 8) {
      Swal.fire('Error', 'La contraseña debe tener mínimo 8 caracteres', 'error');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire('¡Registro exitoso!', 'Bienvenido', 'success');
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-container" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Crear Cuenta</h1>
        <form onSubmit={handleRegister}>
          <label style={{ color: 'white' }}>Correo</label>
          <input type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label style={{ color: 'white' }}>Contraseña</label>
          <input type="password" placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label style={{ color: 'white' }}>Confirmar</label>
          <input type="password" placeholder="Repite la contraseña" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Crear Cuenta
          </button>
        </form>
        <button onClick={() => navigate('/login')} className="btn" style={{ width: '100%', marginTop: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.7)' }}>
          Ya tengo cuenta
        </button>
      </div>
    </div>
  );
};