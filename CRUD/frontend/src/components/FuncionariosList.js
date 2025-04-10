import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FuncionariosList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  // Carregar a lista de funcionários ao montar o componente
  useEffect(() => {
    fetch('http://localhost:3001/api/funcionarios', {
      headers: {
        'x-user-role': 'funcionario', // Envie o papel do usuário no cabeçalho
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao buscar funcionários');
        }
        return res.json();
      })
      .then((data) => setFuncionarios(data))
      .catch((err) => console.error('Erro ao buscar funcionários:', err));
  }, []);

  // Função para excluir um funcionário
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/funcionarios/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id));
          alert('Funcionário excluído com sucesso!');
        } else {
          alert('Erro ao excluir funcionário');
        }
      } catch (err) {
        console.error('Erro ao excluir funcionário:', err);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="title">Gerenciar Funcionários</h2>
      <div className="button-group">
        <Link to="/funcionarios/novo" className="button">Adicionar Funcionário</Link>
        <button className="button" onClick={() => navigate(-1)}>Voltar</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.length > 0 ? (
            funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.email}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => navigate(`/funcionarios/editar/${funcionario.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="button"
                    onClick={() => handleDelete(funcionario.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                Nenhum funcionário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default FuncionariosList;