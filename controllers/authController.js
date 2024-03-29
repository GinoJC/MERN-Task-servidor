const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
  // revisa si hay errores
  const errores = validationResult(req);
  if(!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if(!usuario) {
      return res.status(400).json({msg: 'El usuario no existe'});
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if(!passCorrecto) {
      return res.status(400).json({msg: 'Password Incorrecto'});
    }

    // Si todo es correcto, crear y firmar el JWT
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

  } catch (error) {
    console.log(error);
  }
}

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json({usuario});
  } catch (error) {
    console.log('Error usuarioAutenticado', error);
    res.status(500).json({msg: 'Hubo un error al obtener el usuario autenticado'});
  }
}