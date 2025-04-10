import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PacienteForm = () => {
  const [paciente, setPaciente] = useState({
    nome: '',
    data_internacao: '',
    data_alta: '',
    diagnostico: '',
    status: 'Internado',
    observacoes: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:3001/api/pacientes/${id}`)
        .then((res) => res.json())
        .then((data) => setPaciente(data))
        .catch((err) => console.error('Erro ao buscar paciente:', err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit
      ? `http://localhost:3001/api/pacientes/${id}`
      : 'http://localhost:3001/api/pacientes';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente)
      });
      navigate('/');
    } catch (err) {
      console.error('Erro ao salvar paciente:', err);
    }
  };

  return (
    <div className="container">
    <h2 className="title">{isEdit ? 'Editar Paciente' : 'Novo Paciente'}</h2>
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" value={paciente.nome} onChange={handleChange} className="input" required />

      <label htmlFor="data_internacao" className="label">Data de Internação</label>
      <input id="data_internacao" name="data_internacao" type="date" value={paciente.data_internacao} onChange={handleChange} className="input" required />

      <label htmlFor="data_alta" className="label">Data de Alta</label>
      <input id="data_alta" name="data_alta" type="date" value={paciente.data_alta} onChange={handleChange} className="input" />

      <textarea name="diagnostico" placeholder="Diagnóstico" value={paciente.diagnostico} onChange={handleChange} className="textarea" />

      <label htmlFor="status" className="label">Status</label>
      <select id="status" name="status" value={paciente.status} onChange={handleChange} className="select">
        <option value="Internado">Internado</option>
        <option value="Alta">Alta</option>
      </select>

      <textarea name="observacoes" placeholder="Observações" value={paciente.observacoes} onChange={handleChange} className="textarea" />

      <button type="submit" className="button">
        {isEdit ? 'Atualizar' : 'Cadastrar'}
      </button>
    </form>

        
      <button className="button" onClick={() => navigate('/')}>
      ← Voltar
    </button>
  </div>
  );
};

export default PacienteForm;
