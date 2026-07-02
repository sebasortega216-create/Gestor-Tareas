import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire('Error', 'Ingresa tu correo primero', 'error');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire('Correo enviado', 'Revisa tu bandeja de entrada', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-container" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Recuperar Contraseña</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '1.5rem' }}>
          Ingresa tu correo electrónico y recibirás un enlace para restablecer tu contraseña.
        </p>
        <form onSubmit={handleReset}>
          <label style={{ color: 'white' }}>Correo Electrónico</label>
          <input type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Enviar enlace
          </button>
        </form>
        <button onClick={() => navigate('/login')} className="btn" style={{ width: '100%', marginTop: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.7)' }}>
          Volver al Login
        </button>
      </div>
    </div>
  );
};