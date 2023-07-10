const express = require('express');
const tasksController = require('./controllers/tasksController');
const router = express.Router();
const taskMiddleware = require ('./middleware/tasksMiddleware');

router.get('/', (req, res) => res.status(200).send('O router ta funcionando!'));

// EndPoints Tasks 
router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddleware.validarNome, tasksController.addTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', 
    taskMiddleware.validarNome, 
    taskMiddleware.validarStatus, 
    tasksController.updateTask);



module.exports = router;