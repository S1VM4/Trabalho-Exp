const express = require('express');
const cors = require('cors');
const funcionariosRoutes = require('./funcionarios.route');
const pacientesRoutes = require('./pacientes.routes');
const authRoutes = require('./auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Usar as rotas
app.use('/api', funcionariosRoutes);
app.use('/api', pacientesRoutes);
app.use('/api', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});