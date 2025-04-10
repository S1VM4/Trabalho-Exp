const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

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