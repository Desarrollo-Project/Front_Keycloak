import { FaUser, FaKey } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navegación

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook de navegación

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch("http://localhost:5187/auth/login", { // Cambiado a API Gateway
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al iniciar sesión: ${errorMessage}`);
      }

      setMessage("Inicio de sesión exitoso.");
      
      // Redirigir al usuario después de iniciar sesión correctamente
      navigate('/inicio');

    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Ocurrió un error desconocido.");
      }
    }
  };

  const goToRegister = () => {
    navigate('/register'); // Navega al formulario de registro
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h1 style={styles.title}>Iniciar Sesión</h1>
      <div style={styles.field}>
        <label style={styles.label}>
          <FaUser style={{ marginRight: '8px' }} />
          Usuario
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>
          <FaKey style={{ marginRight: '8px' }} />
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>
        Iniciar Sesión
      </button>
      <button type="button" style={styles.registerButton} onClick={goToRegister}>
        Registrarse
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: 'auto',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#343a40',
  },
  field: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#495057',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  registerButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
    fontSize: '14px',
  },
};

export default Login;