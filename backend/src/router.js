const express = require('express');

const router = express.Router();

router.get('/tasks', (request, response) => response.status(200).send('Olá, Mundo!'));
router.get('/', (req, res) => res.status(200).send('O router ta funcionando!'));
module.exports = router;