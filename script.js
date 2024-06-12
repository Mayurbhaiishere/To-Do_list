let toggle1 = 0;

function main() {
  const taskValue = document.getElementById("task").value.trim();
  if (taskValue !== "") {
    const taskWrapper = document.createElement("div");

    taskWrapper.className = "task-wrapper";

    const toggle = document.createElement("radio");
    toggle.className = "toggle-before";
    toggle.textContent = "";

    const emptyItem = document.createElement("div");
    emptyItem.className = "empty-div";
    emptyItem.textContent = "";

    const taskItem = document.createElement("div");
    taskItem.className = "task-item-before";
    taskItem.textContent = taskValue;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", function () {
      taskWrapper.remove();
      emptyItem.remove();
    });

    toggle.addEventListener("click", function () {
      if (toggle1 == 0) {
        toggle.className = "toggle-after";
        toggle1 = 1;
        taskItem.className = "task-item-after";
      } else {
        toggle.className = "toggle-before";
        toggle1 = 0;
        taskItem.className = "task-item-before";
      }
    });

    document.getElementById("main").appendChild(emptyItem);
    taskWrapper.appendChild(taskItem);
    taskWrapper.appendChild(toggle);
    taskWrapper.appendChild(deleteBtn);
    document.getElementById("main").appendChild(taskWrapper);
    document.getElementById("task").value = "";
  }
}
document.getElementById("ok").addEventListener("click",main());
document.addEventListener("keydown",function (event) {
  let enter1 = event.key;
  if (enter1 == 'Enter') {
    main();
  }
});
