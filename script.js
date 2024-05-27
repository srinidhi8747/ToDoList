let taskId = 1;

// Function to add a task
function addTask() {
    const table = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const taskName = document.getElementById('taskName').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskPriority = document.getElementById('taskPriority').value;

    newRow.innerHTML = `
        <td contenteditable="true">${taskName}</td>
        <td><input type="date" value="${taskDeadline}"></td>
        <td>
            <select>
                <option value="Completed" ${taskStatus === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="Pending" ${taskStatus === 'Pending' ? 'selected' : ''}>Pending</option>
            </select>
        </td>
        <td>
            <select>
                <option value="High" ${taskPriority === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${taskPriority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Low" ${taskPriority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
        </td>
        <td>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </td>
    `;

    taskId++;
    clearForm();
    saveTasks(); // Save tasks after adding a new one
}

// Function to clear the input form
function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskStatus').value = 'Completed';
    document.getElementById('taskPriority').value = 'High';
}

// Function to edit a task
function editTask(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].contentEditable = true;
    }
    button.textContent = 'Save';
    button.onclick = () => saveTask(button);
}

// Function to save edited task
function saveTask(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].contentEditable = false;
    }
    button.textContent = 'Edit';
    button.onclick = () => editTask(button);
    saveTasks(); // Save tasks after editing
}

// Function to delete a task
function deleteTask(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTasks(); // Save tasks after deleting
}

// Function to save tasks to local storage
function saveTasks() {
    const table = document.getElementById('todoTable');
    const rows = table.getElementsByTagName('tbody')[0].rows;
    const tasks = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const task = {
            name: cells[0].textContent,
            deadline: cells[1].children[0].value,
            status: cells[2].children[0].value,
            priority: cells[3].children[0].value
        };
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
    alert('Tasks saved successfully.'); // Alert message after saving tasks
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to initialize tasks when the page loads
window.onload = function() {
    const savedTasks = loadTasksFromLocalStorage();
    if (savedTasks.length > 0) {
        const table = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
        savedTasks.forEach(task => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td contenteditable="true">${task.name}</td>
                <td><input type="date" value="${task.deadline}"></td>
                <td>
                    <select>
                        <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
                        <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                    </select>
                </td>
                <td>
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>
                </td>
            `;
        });
    }
};
