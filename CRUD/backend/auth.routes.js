const express = require('express');
const router = express.Router();
const db = require('./db'); // Conexão com o banco de dados

// Rota de login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o usuário existe no banco de dados
  db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

    const user = results[0];
    res.json({
      id: user.id,
      nome: user.nome,
      role: user.role,
    });
  });
});

module.exports = router;