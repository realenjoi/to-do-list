function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.setAttribute("data-status", "active");
    li.classList.add("task-enter");

    // Force the browser to apply the initial style
    requestAnimationFrame(() => {
        li.classList.add("task-enter-active");
    });


    // Create a span to hold just the text
    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;

    // Create a container for the buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editTask(li, textSpan);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = () => {
        li.setAttribute("data-status", "completed");
        applyFilter();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
        li.classList.add("task-exit");
        requestAnimationFrame(() => {
            li.classList.add("task-exit-active");
        });
        setTimeout(() => li.remove(), 300);
    };

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(completeBtn);
    buttonGroup.appendChild(deleteBtn);



    // Add buttons to the button group
    buttonGroup.appendChild(completeBtn);
    buttonGroup.appendChild(deleteBtn);

    // Add both the text and button group to the list item
    li.appendChild(textSpan);
    li.appendChild(buttonGroup);

    document.getElementById("taskList").appendChild(li);
    input.value = "";

    applyFilter();
}

function editTask(li, textSpan) {
    // Create an input field with current text
    const input = document.createElement("input");
    input.type = "text";
    input.value = textSpan.textContent;
    input.classList.add("edit-input");

    // Replace the text span with the input field
    li.replaceChild(input, textSpan);
    input.focus();

    // Save on Enter key
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveEdit(li, input);
        }
    });

    // Or save on blur (clicking away)
    input.addEventListener("blur", function () {
        saveEdit(li, input);
    });
}

function saveEdit(li, input) {
    const newSpan = document.createElement("span");
    newSpan.textContent = input.value;
    li.replaceChild(newSpan, input);
}


// Detect when the user presses Enter in the input box
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
let currentFilter = "all";

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "X";
deleteBtn.onclick = () => li.remove();

li.appendChild(completeBtn);
li.appendChild(deleteBtn);

document.getElementById("taskList").appendChild(li);
input.value = "";

applyFilter();


function setFilter(filter) {
    currentFilter = filter;
    applyFilter();
}

function applyFilter() {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        const status = task.getAttribute("data-status");
        if (
            currentFilter === "all" ||
            (currentFilter === "active" && status === "active") ||
            (currentFilter === "completed" && status === "completed")
        ) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

// Pressing Enter adds task
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

