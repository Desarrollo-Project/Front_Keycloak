import React, { useState } from "react";
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Navegación

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !firstName || !lastName || !email || !password) {
      alert("Todos los campos obligatorios deben ser completados.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5187/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al registrar usuario: ${errorMessage}`);
      }

      // Redirigir al usuario después de iniciar sesión correctamente
      navigate('/');

      } catch (error) {
    if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage("Ocurrió un error desconocido.");
    }
  }};

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro de Usuario</h1>
      <div>
        <label>
          <FaUser style={{ marginRight: "8px" }} />
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa un nombre de usuario único"
        />
      </div>
      <div>
        <label>
          <FaUser style={{ marginRight: "8px" }} />
          Nombre
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Ingresa tu nombre"
        />
      </div>
      <div>
        <label>
          <FaUser style={{ marginRight: "8px" }} />
          Apellido
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ingresa tu apellido"
        />
      </div>
      <div>
        <label>
          <FaEnvelope style={{ marginRight: "8px" }} />
          Correo Electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@ejemplo.com"
        />
      </div>
      <div>
        <label>
          <FaKey style={{ marginRight: "8px" }} />
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crea una contraseña segura"
        />
      </div>
      <button type="submit">Registrar</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;