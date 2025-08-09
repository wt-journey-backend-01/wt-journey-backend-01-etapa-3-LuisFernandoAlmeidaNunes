const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('', agentesController.getAllAgentes);

router.get('/:id', agentesController.getAgenteById);

router.post('', agentesController.createAgente);

router.put('/:id', agentesController.editAgente);

router.patch('/:id', agentesController.editAgenteProperty);

router.delete('/:id', agentesController.deleteAgenteById);

module.exports = router