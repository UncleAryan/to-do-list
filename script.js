const taskForm = document.querySelector('form');
const taskInput = document.getElementById('taskInput');
const taskUL = document.getElementById('taskList');


let tasks = getTasks();
updateTaskList();

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
} );

function addTask() {
    const taskText = taskInput.value.trim();
    if(taskText.length > 0) {
        const taskObject = {
            text: taskText,
            completed: false
        };
        tasks.push(taskObject);
        updateTaskList();
        saveTasks();
        taskInput.value = "";
    } 
}

function updateTaskList() {
    taskUL.innerHTML = "";
    tasks.forEach((task, taskIndex) => {
        item = createTask(task, taskIndex);
        taskUL.append(item);
    });
}

function createTask(task, taskIndex) {
    const taskID = "task" + taskIndex;
    const taskLI = document.createElement("li");
    const taskText = task.text;
    
    taskLI.className = "task";
    taskLI.innerHTML = `
        <input type="checkbox" id="${taskID}">
        <label class="customCheckbox" for="${taskID}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-120q-100 0-170-70t-70-170v-240q0-100 70-170t170-70h240q100 0 170 70t70 170v240q0 100-70 170t-170 70H360Zm80-200 240-240-56-56-184 184-88-88-56 56 144 144Zm-80 120h240q66 0 113-47t47-113v-240q0-66-47-113t-113-47H360q-66 0-113 47t-47 113v240q0 66 47 113t113 47Zm120-280Z"/></svg>
        </label>
        <label for="${taskID}" class="taskText">
            ${taskText}
        </label>
        <button class="deleteBtn">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `;

    const deleteBtn = taskLI.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskIndex);
    });

    const checkBox = taskLI.querySelector("input");
    checkBox.addEventListener("change", () => {
        tasks[taskIndex].completed = checkBox.checked;
        saveTasks();
    });
    checkBox.checked = task.completed;

    return taskLI;
}

function deleteTask(taskIndex) {
    tasks = tasks.filter((_, i) => i !== taskIndex);
    saveTasks();
    updateTaskList();
}

function saveTasks() {
    const tasksJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJson);
}

function getTasks() {
    const tasks = localStorage.getItem("tasks") || "[]";
    return JSON.parse(tasks);
}