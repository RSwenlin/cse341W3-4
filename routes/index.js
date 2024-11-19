const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello World');});

router.use('/shows', require('./shows'));

module.exports = router;