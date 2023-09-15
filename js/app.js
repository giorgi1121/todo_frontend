fetchTasks(BASE_URL)


const addTaskForm = document.getElementById("addTaskForm");
const addTaskButton = document.getElementById("add-task");
const updateTaskButton = document.getElementById("update-task");

const creatingCheckbox = document.getElementById("creatingCheckbox");
const checkboxDiv = document.getElementById("checkbox-div");
let checkboxValue = checkboxDiv.getAttribute("data-value");


function updateCheckboxValue() {
    if (creatingCheckbox.checked) {
        checkboxValue = "True";
    } else {
        checkboxValue = "False";
    }
    checkboxDiv.setAttribute("data-value", checkboxValue);
    return checkboxValue;
}


creatingCheckbox.addEventListener("click", updateCheckboxValue);



addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault()
})

addTaskButton.addEventListener("click", async function(e) {
    const formData = new FormData(addTaskForm);
    const task = {
        title: formData.get("title"),
        /* description: formData.get("description") */
        completed: updateCheckboxValue()
    }
    await createTask(task);
    fetchTasks(BASE_URL);
    addTaskForm.reset();
})

updateTaskButton.addEventListener("click", async function(e){
    const formData = new FormData(addTaskForm);
    const task = {
        title: formData.get("title"),
        /* description: formData.get("description") */
        completed: updateCheckboxValue()
    }
    const task_id = formData.get("task-id");
    await updateTask(task_id, task);
    fetchTasks(BASE_URL);
    addTaskForm.reset();
    addTaskForm.classList.remove("editing");
})


taskslist.addEventListener("click", async (e) => {
    if (e.target.nodeName === "BUTTON") {
        const action = e.target.getAttribute("data-action")
        const li = e.target.parentNode;
        const task_id = li.getAttribute("data-task-id");
        if (action === "delete"){
            await deleteTask(task_id);
            fetchTasks(BASE_URL)
        }

        if (action === "update") {
            const task = await fetchTask(task_id);

            const titleInputElement = document.getElementById("task-title");
            /* const descriptionInputElement = document.getElementById("task-description") */
            const taskIdInputElement = document.getElementById("task-id")
            
            titleInputElement.value = task.title
            /* descriptionInputElement.value = task.description */
            taskIdInputElement.value = task.id
            addTaskForm.classList.add("editing");
        }
    }
})


taskslist.addEventListener("click", async (e) => {
    if (e.target.nodeName === "INPUT") {
        const action = e.target.getAttribute("data-action")
        const div = e.target.parentNode;
        const task_id = div.getAttribute("data-div-task-id");

        if (action === "completed") {
            const task = await fetchTask(task_id);
            await updateTask(task_id, {...task, completed: !task.completed});
            fetchTasks(BASE_URL);
        }
    }
})


async function setupPagination() {
    const tasks = await fetchTasks(BASE_URL);
    let links = tasks["links"]
    let next = links.next;
    let previous = links.previous;
    
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("previous");

    nextButton.addEventListener("click", async () => {
        if (next) {
            
            let newTasks = await fetchTasks(next);
            links = newTasks["links"]
            next = links.next;
            previous = links.previous;
        }
    });

    previousButton.addEventListener("click", async () => {
        if (previous){
            let newTasks = await fetchTasks(previous);
            links = newTasks["links"]
            next = links.next;
            previous = links.previous;
        }
 })
};

// Call the setupPagination function to set up event listeners
setupPagination();








    /* const response = await fetch(`${BASE_URL}?limit=5&offset=5`);
    const tasks = await response.json();
    const results = tasks["results"]
    renderedTasksListString = ""
    for (let task of results) {
        renderedTasksListString = renderedTasksListString + renderTasksList(task)
    }
    taskslist.innerHTML = renderedTasksListString
    } */




    /* fetch(BASE_URL).then(response => {
        tasks_json = response.json().then(tasks => {
          renderedTasksListString = ""
          for (let task of tasks){
            renderedTasksListString = renderedTasksListString + renderTasksList(task)
          }

          taskslist.innerHTML = renderedTasksListString
        })
    }) */













    /* function handelRequest(response){
        const tasks_json = response.json();
        tasks_json.then(handelJson)
    }
    
    function handelJson(tasks){
        let renderedTaskListString = ""
        for (let task of tasks){
            renderedTaskListString = renderedTaskListString + renderTasksList(task)
        }
        taskslist.innerHTML = renderedTaskListString
    }
 */

