const express = require('express')
const router = express.Router();
const casosController = require('../controllersController');

// define a rota para /agentes usando o método GET

// router.get('/:caso_id/agente', casosController.getAgenteDataByCasoId);

// router.get('/search', casosController.getCasosByWord);

router.get('', casosController.getAllCasos);

router.get('/:id', casosController.getCasoById);

router.post('', casosController.createCaso);

router.put('/:id', casosController.editCaso);

router.patch('/:id', casosController.editCasoProperty);

router.delete('/:id', casosController.deleteCasoById);


module.exports = router