let toggle1 = 0;

function main() {
  const taskValue = document.getElementById("task").value.trim();
  if (taskValue !== "") {
    const existingTasks = document.querySelectorAll(".task-wrapper .task-item-before, .task-wrapper .task-item-after");
    for (let task of existingTasks) {
      if (task.textContent === taskValue) {
        return;
      }
    }

    const taskWrapper = document.createElement("ul");
    taskWrapper.className = "task-wrapper";

    const toggle = document.createElement("li");
    toggle.className = "toggle-before";
    toggle.textContent = "";

    const emptyItem = document.createElement("div");
    emptyItem.className = "empty-div";
    emptyItem.textContent = "";

    const taskItem = document.createElement("li");
    taskItem.className = "task-item-before";
    taskItem.textContent = taskValue;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", function () {
      taskWrapper.remove();
      emptyItem.remove();
      saveTasks();
    });

    toggle.addEventListener("click", function () {
      if (toggle1 === 0) {
        toggle.className = "toggle-after";
        toggle1 = 1;
        taskItem.className = "task-item-after";
      } else {
        toggle.className = "toggle-before";
        toggle1 = 0;
        taskItem.className = "task-item-before";
      }
      saveTasks();
    });

    taskWrapper.appendChild(taskItem);
    taskWrapper.appendChild(toggle);
    taskWrapper.appendChild(deleteBtn);
    document.getElementById("main").appendChild(emptyItem);
    document.getElementById("main").appendChild(taskWrapper);
    document.getElementById("task").value = "";

    saveTasks();
  }
}

function saveTasks() {
  const tasks = [];
  const taskWrappers = document.querySelectorAll(".task-wrapper");
  taskWrappers.forEach(wrapper => {
    const taskItem = wrapper.querySelector(".task-item-before, .task-item-after");
    const toggle = wrapper.querySelector(".toggle-before, .toggle-after");
    tasks.push({
      value: taskItem.textContent,
      completed: taskItem.className === "task-item-after"
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskWrapper = document.createElement("ul");
    taskWrapper.className = "task-wrapper";

    const toggle = document.createElement("li");
    toggle.className = task.completed ? "toggle-after" : "toggle-before";
    toggle.textContent = "";

    const emptyItem = document.createElement("div");
    emptyItem.className = "empty-div";
    emptyItem.textContent = "";

    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "task-item-after" : "task-item-before";
    taskItem.textContent = task.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", function () {
      taskWrapper.remove();
      emptyItem.remove();
      saveTasks();
    });

    toggle.addEventListener("click", function () {
      if (toggle.className === "toggle-before") {
        toggle.className = "toggle-after";
        taskItem.className = "task-item-after";
      } else {
        toggle.className = "toggle-before";
        taskItem.className = "task-item-before";
      }
      saveTasks();
    });

    taskWrapper.appendChild(taskItem);
    taskWrapper.appendChild(toggle);
    taskWrapper.appendChild(deleteBtn);
    document.getElementById("main").appendChild(emptyItem);
    document.getElementById("main").appendChild(taskWrapper);
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    main();
  }
});

window.onload = loadTasks;
