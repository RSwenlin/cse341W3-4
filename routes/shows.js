const express = require('express');
const router = express.Router();

const showsController = require('../controllers/shows');

router.get('/', showsController.getAll);

router.get('/:id', showsController.getSingle);


module.exports = router;