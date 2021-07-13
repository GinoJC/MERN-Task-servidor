const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/proyectos
router.get('/', auth, proyectoController.obtenerProyectos);

router.post('/', auth, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ], proyectoController.crearProyecto
);

router.put('/:id', auth, [
  check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], proyectoController.actualizarProyectos);

router.delete('/:id', auth, proyectoController.eliminarProyectos);

module.exports = router;