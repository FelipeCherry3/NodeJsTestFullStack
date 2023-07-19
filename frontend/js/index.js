const tbody = document.querySelector('tbody');
 
//Consumindo API do Backend
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks')
    const tasks = await response.json()
    return tasks;
}

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

const task =  {
    id: 1,
    tittle: 'Varrer o cu',
    created_at: '99 de Janeiro de 2023 00:99',
    status: 'desinformado'
}

const createRow = (task) => {

    const { id, tittle, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', tittle);
    const tdCreatedAt = createElement('td', created_at);
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const editButton  = createElement('button','' ,'<span class="material-symbols-outlined">edit_note</span>');
    const deleteButton  = createElement('button','' ,'<span class="material-symbols-outlined">delete</span>');
    
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    
    tbody.appendChild(tr);
}

createRow(task);