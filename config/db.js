const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('DB conectada');
  } catch (error) {
    console.log('Error al conectar con la DB', error);
    process.exit(1); // Detener la app
  }
}

module.exports = conectarDB;