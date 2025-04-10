const authorize = (role) => (req, res, next) => {
  const userRole = req.headers['x-user-role']; // O papel do usuário será enviado no cabeçalho

  if (!userRole || userRole !== role) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  next();
};

module.exports = { authorize };