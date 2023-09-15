function renderTasksList(task){
  /* return `
    <li data-task-id=${task.id} class=${task.completed ? "completed" : ""}> 
        <button data-action=completed>${task.completed ? "✅" : "☑️"}</button>
        id: ${task.id} title: ${task.title},  description: ${task.description}
        <button data-action=update>✏️</button>
        <button data-action=delete>❌</button>
    </li>`; */

    return `
    <li data-task-id=${task.id} class=${task.completed ? "completed" : ""}>
      <div class="checkbox-item" data-div-task-id=${task.id}>
        <input type="checkbox" class="checkbox1" data-action=completed>
        <div class="${task.completed ? "input-div" : ""}">  
        </div>
      </div>

      <h3>${task.title}</h3>
      <button data-action=update>✏️</button>
      <button data-action=delete>❌</button>
    </li>`
}