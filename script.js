const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "complete-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[idx].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  taskInput.value = "";
  if (!taskText) return;
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

loadTasks();
renderTasks();
