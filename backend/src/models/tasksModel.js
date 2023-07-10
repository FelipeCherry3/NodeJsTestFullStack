const connection = require('./connection');


const getAll = async () => {
    const [tasks] = await connection.execute ('SELECT * FROM tasks');
    return tasks;
};

const addTask  = async (task) => {
    const { nome } = task;
    const query = 'INSERT INTO tasks (nome, status, created_at) values (?,?,?)';
    const dateUTC = new Date(Date.now()).toUTCString();

    const [createdTask] = await connection.execute(query, [nome, 'pendente', dateUTC]);

    return {insertId : createdTask.insertId};
};
module.exports = {
    getAll,
    addTask
};