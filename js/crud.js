const BASE_URL = "http://54.202.68.64:8000/tasks/";
const taskslist = document.getElementById("taskslist");

let page = 1

async function fetchTasks(URL) {
  const response = await fetch(URL);
  const tasks = await response.json();
  const results = tasks["results"]

  renderedTasksListString = ""
  for (let task of results) {
      renderedTasksListString = renderedTasksListString + renderTasksList(task)
  }
  taskslist.innerHTML = renderedTasksListString
  return tasks
}


async function fetchTask(task_id){
    const response = await fetch(`${BASE_URL}${task_id}/`);
    const task = await response.json();
    return task
}


async function createTask(task) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
    
        const json = await response.json();
        return json;
        
    } catch (error) {
        throw new Error(error)
    }
}


async function deleteTask(task_id) {
    try {
        await fetch(`${BASE_URL}${task_id}`, {
            method: "DELETE"
        })
    } catch (error) {
        throw new Error(error)
    }
}

async function updateTask(task_id, task) {
    try {
        const response = await fetch(`${BASE_URL}${task_id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        const json = await response.json();
        return json;

    } catch (error) {
        throw new Error(error);
    }
}

