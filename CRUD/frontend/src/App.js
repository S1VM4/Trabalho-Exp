import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PacientesList from './components/PacientesList';
import PacienteForm from './components/PacienteForm';
import Login from './components/Login';
import FuncionariosList from './components/FuncionariosList';
import FuncionarioForm from './components/FuncionarioForm';
import PacienteDetail from './components/PacienteDetail'; // Certifique-se de importar o componente


function App() {
  const user = JSON.parse(localStorage.getItem('user')); // Recupera o usuário logado

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas acessíveis por funcionários */}
        {user?.role === 'funcionario' ? (
          <>
            <Route path="/" element={<PacientesList />} />
            <Route path="/novo" element={<PacienteForm />} />
            <Route path="/editar/:id" element={<PacienteForm />} />
            <Route path="/funcionarios" element={<FuncionariosList />} />
            <Route path="/funcionarios/novo" element={<FuncionarioForm />} />
            <Route path="/funcionarios/editar/:id" element={<FuncionarioForm />} />
            <Route path="/detalhes/:id" element={<PacienteDetail />} />
          </>
        ) : (
          // Redireciona para login se não autenticado
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;