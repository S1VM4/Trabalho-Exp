const db = require('./db');

// Obter todos os pacientes
exports.getAll = (req, res) => {
  db.query('SELECT * FROM pacientes', (err, results) => {
    if (err) {
      console.error('Erro ao buscar pacientes:', err);
      return res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
    res.json(results);
  });
};

// Obter paciente por ID
exports.getById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM pacientes WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar paciente:', err);
      return res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(results[0]);
  });
};

// Criar um novo paciente
exports.create = (req, res) => {
  const { nome, data_internacao, data_alta, diagnostico, status, observacoes } = req.body;

  if (!nome || !data_internacao || !diagnostico || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  db.query(
    'INSERT INTO pacientes (nome, data_internacao, data_alta, diagnostico, status, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, data_internacao, data_alta || null, diagnostico, status, observacoes || null],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar paciente:', err);
        return res.status(500).json({ error: 'Erro ao criar paciente' });
      }
      res.status(201).json({ id: result.insertId, nome, data_internacao, data_alta, diagnostico, status, observacoes });
    }
  );
};

// Atualizar um paciente existente
exports.update = (req, res) => {
  const { nome, data_internacao, data_alta, diagnostico, status, observacoes } = req.body;

  if (!nome || !data_internacao || !diagnostico || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  db.query(
    'UPDATE pacientes SET nome = ?, data_internacao = ?, data_alta = ?, diagnostico = ?, status = ?, observacoes = ? WHERE id = ?',
    [nome, data_internacao, data_alta || null, diagnostico, status, observacoes || null, req.params.id],
    (err, result) => {
      if (err) {
        console.error('Erro ao atualizar paciente:', err);
        return res.status(500).json({ error: 'Erro ao atualizar paciente' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
      res.json({ id: req.params.id, nome, data_internacao, data_alta, diagnostico, status, observacoes });
    }
  );
};

// Excluir um paciente
exports.delete = (req, res) => {
  db.query('DELETE FROM pacientes WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir paciente:', err);
      return res.status(500).json({ error: 'Erro ao excluir paciente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json({ message: 'Paciente removido com sucesso' });
  });
};