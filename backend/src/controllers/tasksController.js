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

// Função para Deletar uma Tarefa
const deleteTask = async (request,response) => {
    const { id } = request.params;

    await tasksModel.deleteTask(id);
    return response.status(204).json();
};

// Função para Atualizar uma Tarefa
const updateTask = async (request, response) => {
    const { id } = request.params;
    await tasksModel.updateTask(id, request.body);
    return response.status(204).json();
};

module.exports = {
    getAll,
    addTask,
    deleteTask,
    updateTask
};