let taskDB = [];

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
            completed: false
        };

        taskDB.push(newTask);
        taskInput.value = '';
        taskDate.value = '';
        renderTasks();
    }
}
    
function renderTasks(filteredList = null) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const data = filteredList || taskDB;

    if (data.length === 0) {
        taskList.innerHTML = '<li class="text-gray-400">No tasks available.</li>';
        return;
    }

    data.forEach((taskObj, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-100 p-2 rounded-md';

        const textSpan = document.createElement('span');
        textSpan.innerText = `${taskObj.task} - ${taskObj.date}`;
        textSpan.className = taskObj.completed ? 'line-through text-gray-400' : '';

        const controls = document.createElement('div');
        controls.className = 'flex gap-2';

        const completeBtn = document.createElement('button');
        completeBtn.innerText = taskObj.completed ? 'Undo' : 'Done';
        completeBtn.className = 'bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded';
        completeBtn.onclick = () => toggleComplete(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.className = 'bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded';
        deleteBtn.onclick = () => deleteTask(index);

        controls.appendChild(completeBtn);
        controls.appendChild(deleteBtn);

        li.appendChild(textSpan);
        li.appendChild(controls);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    taskDB.splice(index, 1);
    renderTasks();
}

function toggleComplete(index) {
    taskDB[index].completed = !taskDB[index].completed;
    renderTasks();
}

function deleteCompleted() {
    taskDB = taskDB.filter(task => !task.completed);
    renderTasks();
}

// ✅ Filter berdasarkan dropdown
function filterTasks() {
    const filterValue = document.getElementById('filter-option').value;
    const today = new Date().toISOString().split('T')[0];
    let filtered = [];

    if (filterValue === 'today') {
        filtered = taskDB.filter(task => task.date === today);
    } else if (filterValue === 'completed') {
        filtered = taskDB.filter(task => task.completed);
    } else if (filterValue === 'pending') {
        filtered = taskDB.filter(task => !task.completed);
    } else {
        filtered = taskDB; // all
    }

    renderTasks(filtered);
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
