const express = require('express');
const conectarDB = require('./config/db');
require('dotenv').config({
  path: 'variables.env'
});

// crear el servidor
const app = express();

// conectar a la DB
conectarDB();

// habilitar express.json
app.use(express.json({
  extended: true
}));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app
app.listen(PORT, () => console.log(`Listening in the port ${PORT}`));