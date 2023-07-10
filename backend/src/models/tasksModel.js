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

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};
const updateTask = async (id, task) => {
    const query = 'UPDATE tasks SET nome = ?, status = ? WHERE id = ?';
    const {nome, status} = task;
    
    const updatedTask = await connection.execute(query, [nome, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    addTask,
    deleteTask,
    updateTask
};