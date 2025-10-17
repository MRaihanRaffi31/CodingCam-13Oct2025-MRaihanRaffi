let taskDB = [];

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
        }

        taskDB.push(newTask);

        renderTasks();
    }
}
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = 'No task added yet';

    taskDB.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date} <button onclick="deleteTask(${index})">Delete</button></li>`;
    });
}


function deleteTask(index) {
    taskDB.splice(index, 1);
    renderTasks();
}

function filterTasks() {
    // Belum diimplementasikan          
}

function validateInput(task, date) {
    if (task.trim() === '') {
        alert('Please enter a task.');
        return false;
    }

    if (date.trim() === '') {
        alert('Please enter a date.');
        return false;
    }

    return true;
}   