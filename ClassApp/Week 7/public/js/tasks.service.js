const TASKS_API = `${BASE_API_URL}/tasks`;

const getTasks = () => {
   const response = _get(TASKS_API)
   .catch(function(error) { 
    console.error("Failed getting tasks", error);
    return null;
});

    return response;
}

const deleteTask = (taskId) => {
    const response = _delete(`${TASKS_API}/${taskId}`)
    .then(function(res) {
        alert("Successfully deleted task.")
        window.location.href = "home.html";
    })  
    .catch(function(error) {
        console.error("Failed to delete task: ", error);
        return null;
    })
}

const updateTask = async (id, name, status) => {

    task = {
        name: name,
        status: status
    }

    const response = await _put(`${TASKS_API}/${id}`, task)

    if (response.ok) {
        console.log("Task updated successfully");
        alert("Successfully updated task.")
    } else {
        console.error("Failed to update task:", response.status);
        alert("Failed to update the task");
    }
    
    window.location.href = "home.html";
}

const createTask = async (name, status) => {
    task = {
        name: name,
        status: status
    }
    const response = await _post_with_token(`${TASKS_API}`, task)
    console.log(response);

    if (response.ok) {
        console.log("Task created successfully");
        alert("Successfully created task.")
    } else {
        console.error("Failed to create task:", response.status);
        alert("Failed to create the task");
    }
    
    window.location.href = "home.html";
}

function showUpdateModal(task) {
    const modal = document.getElementById('updateTaskModal');
    const nameInput = document.getElementById('taskNameInput');
    const statusSelect = document.getElementById('taskStatusSelect');
    const taskIdInput = document.getElementById('taskIdInput'); 
    const submitButton = document.getElementById("modalSubmitButton");
    const modalTitle = document.getElementById('modalTitle');
  
    modalTitle.innerText = 'Update Task';
    taskIdInput.value = task._id; 
    nameInput.value = task.name;
    statusSelect.value = task.status;
    submitButton.onclick = updateTaskFromModal;
  
    modal.style.display = 'block';
}

function hideModal() {
    const modal = document.getElementById('updateTaskModal');
    modal.style.display = 'none';
}

async function updateTaskFromModal() {
    const nameInput = document.getElementById('taskNameInput');
    const statusSelect = document.getElementById('taskStatusSelect');
    const taskIdInput = document.getElementById('taskIdInput');
    
    const taskId = taskIdInput.value;
    const updatedName = nameInput.value;
    const updatedStatus = statusSelect.value;
  
    await updateTask(taskId, updatedName, updatedStatus);
  
    hideModal();
  }

  function showCreateModal() {
    const modal = document.getElementById('updateTaskModal');
    const nameInput = document.getElementById('taskNameInput');
    const statusSelect = document.getElementById('taskStatusSelect');
    const taskIdInput = document.getElementById('taskIdInput'); 
    const submitButton = document.getElementById("modalSubmitButton");
    const modalTitle = document.getElementById('modalTitle');
  
    modalTitle.innerText = 'Create Task';
    taskIdInput.value = ''; 
    nameInput.value = '';
    statusSelect.value = 'pending';

    submitButton.onclick = createTaskFromModal;
  
    modal.style.display = 'block';
}

async function createTaskFromModal() {
    const nameInput = document.getElementById('taskNameInput');
    const statusSelect = document.getElementById('taskStatusSelect');
    
    const updatedName = nameInput.value;
    const updatedStatus = statusSelect.value;
  
    await createTask(updatedName, updatedStatus);
  
    hideModal();
  }