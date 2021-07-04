const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
// api/usuarios

router.get('/', () => {

});

// crea un usuario
router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
  ],
  usuarioController.crearUsuario);

router.put('/', () => {

});

router.delete('/', () => {

});

module.exports = router;