//const formTask = 
document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(event) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let fecha = document.getElementById('fecha').value;
    let inicioHora = document.getElementById('inicio').value;
    let finHora = document.getElementById('fin').value;

    const task = {
        title, //title: title,
        description, //description: description 
        fecha,
        inicioHora,
        finHora
    };

    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }



    getTask();
    document.getElementById('formTask').reset();



    event.preventDefault();
}

function getTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';


    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        let fecha = tasks[i].fecha;
        let inicioHora = tasks[i].inicioHora;
        let finHora = tasks[i].finHora;

        if (title.length == '' && description.length == '') {
            continue;
        } else {
            tasksView.innerHTML += `
        <div class="card mb-2 animated bounceIn">
        <div class="card-body">
        <b style="color: #34e251"> ${title.toUpperCase()} </b> 
        <b style="padding:8px">FECHA:</b> <kbd style="color:#e0f028;">${fecha}</kbd>
        <b style="color:#34e251;  padding: 10px;">INICIO:</b> ${inicioHora} 
        <b style="color: #E74C3C;  padding: 10px;">FIN:</b> ${finHora}
        <br>
        
        <p style="color:#01b7ee; font-family: 'Indie Flower', cursive;
        font-family: 'Bitter', serif;
        font-family: 'Quicksand', sans-serif; ">${description}</p>
        
        <a class="btn btn-danger btn-right animated rotateIn" onclick="deleteTask('${title}')">Borrar</a>
        </div>
        </div>

        `;
        }
    }
}
getTask();

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
}