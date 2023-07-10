const tasksModel = require('../models/tasksModel');

// Função para Retornar todas as Tarefas
const getAll = async (_request, response) => {
    const tasks = await tasksModel.getAll();

    return response.status(200).json(tasks);
}

// Função para Cadastrar uma Tarefa
const addTask = async (request, response) => {
     const createdTask = await tasksModel.addTask(request.body);

    return response.status(201).json(createdTask);
};

module.exports = {
    getAll,
    addTask
};