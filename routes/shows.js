const express = require('express');
const router = express.Router();

const showsController = require('../controllers/shows');

router.get('/', showsController.getAll);

router.get('/:id', showsController.getSingle);

router.post('/', showsController.createShow);

router.put('/:id', showsController.updateShow);

router.delete('/:id', showsController.deleteShow);

module.exports = router;