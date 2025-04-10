const express = require('express');
const router = express.Router();
const db = require('./db');
const { authorize } = require('./auth.middleware');

// Rota para listar todos os funcionários
router.get('/funcionarios', authorize('funcionario'), (req, res) => {
  db.query('SELECT id, nome, email FROM usuarios WHERE role = "funcionario"', (err, results) => {
    if (err) {
      console.error('Erro ao buscar funcionários:', err);
      return res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
    res.json(results);
  });
});

// Rota para adicionar um funcionário
router.post('/funcionarios', authorize('funcionario'), (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.query(
    'INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, "funcionario")',
    [nome, email, senha],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
      res.json({ message: 'Funcionário cadastrado com sucesso', id: result.insertId });
    }
  );
});

// Rota para editar um funcionário
router.put('/funcionarios/:id', authorize('funcionario'), (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  db.query(
    'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ? AND role = "funcionario"',
    [nome, email, senha, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar funcionário' });
      res.json({ message: 'Funcionário atualizado com sucesso' });
    }
  );
});

// Rota para excluir um funcionário
router.delete('/funcionarios/:id', authorize('funcionario'), (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuarios WHERE id = ? AND role = "funcionario"', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir funcionário' });
    res.json({ message: 'Funcionário excluído com sucesso' });
  });
});

module.exports = router;