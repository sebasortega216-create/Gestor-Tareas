import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import Swal from 'sweetalert2';

const provider = new GoogleAuthProvider();

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire('¡Registro exitoso!', 'Bienvenido', 'success');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleReset = async () => {
    if (!email) {
      Swal.fire('Error', 'Ingresa tu correo primero', 'error');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire('Correo enviado', 'Revisa tu bandeja de entrada', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-container" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {isRegister ? 'Registro' : 'Iniciar Sesión'}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isRegister ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <button onClick={handleGoogle} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
          Entrar con Google
        </button>

        <button onClick={handleReset} className="btn" style={{ width: '100%', marginTop: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.7)' }}>
          Olvidé mi contraseña
        </button>

        <button onClick={() => setIsRegister(!isRegister)} className="btn" style={{ width: '100%', marginTop: '0.5rem', background: 'transparent', color: 'white' }}>
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  );
};