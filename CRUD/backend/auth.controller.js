const db = require('./db');

exports.login = (req, res) => {
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
};

exports.registerFuncionario = (req, res) => {
  const { nome, email, senha, role } = req.body;

  db.query(
    'INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)',
    [nome, email, senha, role || 'funcionario'],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
      res.json({ message: 'Funcionário cadastrado com sucesso', id: result.insertId });
    }
  );
};
