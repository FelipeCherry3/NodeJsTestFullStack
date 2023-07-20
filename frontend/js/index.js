
const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

//Consumindo API do Backend
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}

//Função responsavel por ler Input e Adicionar Task
const addTask = async (event) => {

    event.preventDefault();

    const task = { nome: inputTask.value };
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(task),
        
    });

    loadTask();

    inputTask.value = '';
}
//Deletar tarefa
const deleteTask = async(id) => {

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });
    alert('Tarefa deletada' + id);
    loadTask();
}
//Atualiza Tarefa
const updateTask = async({ id, nome, created_at, status }) => {

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({nome, status}),
    });

    alert('A tarefa ' + nome + 'Foi atualizada');
    loadTask();
}
//Formatação da Data
const formatedDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short'}
    const date = new Date(dateUTC).toLocaleString('pt-BR',options);
    return date;
}
//Criando elemento HTML utilizando parametros para modificação

const createElement = (tag, innerText = '', innerHTML ='') => {
    const element = document.createElement(tag);
    if(innerText) {
        element.innerText = innerText;
    }
    if(innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}


const createSelect = (value) => {
    const options= `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluido">concluido</option>
    `;
    const select = createElement('select', '', options);

    select.value = value;
    return select;

}

//Função responsavel por receber um objeto tipo task, desconstrui-lo e apartir disso
//Construir um bloco HTML de uma Linha (Row) na nossa lista de Tarefas com campos dinâmicos
const createRow = (task) => {

    const { id, nome, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', nome);
    const tdCreatedAt = createElement('td', formatedDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    select.addEventListener('change', ({target}) => updateTask({ ...task, status: target.value }));
    
    const editButton  = createElement('button','' ,'<span class="material-symbols-outlined">edit_note</span>');
    const deleteButton  = createElement('button','' ,'<span class="material-symbols-outlined">delete</span>');
    
    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = nome;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({...task, nome: editInput.value, status });
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    deleteButton.addEventListener('click', ()=> deleteTask(id));

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);



    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    
    return tr;
}

// Consome a API do Backend, Busca no Banco de Dados as Tarefas
const loadTask = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = '';
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}


addForm.addEventListener('submit', addTask);

loadTask();