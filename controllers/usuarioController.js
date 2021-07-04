const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
  // revisa si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if(usuario){
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }
    usuario = new Usuario(req.body);

    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    
    await usuario.save();

    // crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    }

    // firmar el JWT
    jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600 // 1 hora
    }, (error, token) => {
      if(error) throw error;
      res.json({ token });
    });

    //  msg: 'Usuario creado correctamente'

  } catch (error) {
    console.log('Error crearUsuario', error);
    res.status(400).send('Hubo un error');
  }
}