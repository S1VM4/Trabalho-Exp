import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/pacientes')
      .then((res) => res.json())
      .then((data) => setPacientes(data))
      .catch((err) => console.error(err));
  }, []);

  const deletarPaciente = (id) => {
    if (window.confirm("Deseja mesmo excluir este paciente?")) {
      fetch(`http://localhost:3001/api/pacientes/${id}`, { method: 'DELETE' })
        .then(() => setPacientes(pacientes.filter(p => p.id !== id)));
    }
  };

  return (
    <div className="container">
      <h1 className="title">Pacientes</h1>
      <div className="button-group">
        <Link to="/novo" className="button">Novo Paciente</Link>
        <button className="button" onClick={() => navigate('/funcionarios')}>Gerenciar Funcionários</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.status}</td>
              <td>
                <Link to={`/editar/${p.id}`} className="button">Editar</Link>
                <Link to={`/detalhes/${p.id}`} className="button">Ver Detalhes</Link>
                <button onClick={() => deletarPaciente(p.id)} className="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacientesList;