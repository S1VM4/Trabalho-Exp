import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FuncionarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/funcionarios/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Erro ao carregar funcionário');
          }
          return res.json();
        })
        .then((data) => {
          setNome(data.nome || '');
          setEmail(data.email || '');
          setSenha('');
        })
        .catch((err) => console.error('Erro ao carregar funcionário:', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:3001/api/funcionarios/${id}`
        : 'http://localhost:3001/api/funcionarios';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'funcionario',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        alert(id ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!');
        navigate('/funcionarios');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao salvar funcionário');
      }
    } catch (err) {
      console.error('Erro ao salvar funcionário:', err);
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="container">
      <h2 className="title">{id ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input"
          required
        />
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
          required={!id}
        />
        <div className="button-group">
          <button type="submit" className="button">
            {id ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
          <button type="button" className="button" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioForm;