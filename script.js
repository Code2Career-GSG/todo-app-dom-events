const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function addTask() {
  const taskText = taskInput.value.trim();
  taskInput.value = "";
  if (!taskText) return;

  const li = document.createElement("li");
  li.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "complete-checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", function (e) {
  const target = e.target;
  const li = target.closest("li");
  if (!li) return;

  if (target.classList.contains("complete-checkbox")) {
    li.classList.toggle("completed");
  }

  if (target.classList.contains("delete-btn")) {
    li.remove();
  }
});
