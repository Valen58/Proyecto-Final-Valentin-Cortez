
import React, { useState } from 'react';

const UserRegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {

    if (!name.trim() || !email.trim()) {
      alert('Por favor, complete todos los campos.');
      return;
    }


    onRegister({ name, email });
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default UserRegistrationForm;
