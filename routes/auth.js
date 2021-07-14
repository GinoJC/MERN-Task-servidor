const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// api/auth
router.get('/', auth, authController.usuarioAutenticado);

// login de usuario
router.post('/', authController.autenticarUsuario);

router.put('/');

router.delete('/');

module.exports = router;