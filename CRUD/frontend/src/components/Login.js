import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button">Entrar</button>
      </form>
    </div>
  );
};

export default Login;