const express = require('express');
const tasksController = require('./controllers/tasksController');
const router = express.Router();
const taskMiddleware = require ('./middleware/tasksMiddleware');

router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddleware.validarValor, tasksController.addTask);

router.get('/', (req, res) => res.status(200).send('O router ta funcionando!'));

module.exports = router;