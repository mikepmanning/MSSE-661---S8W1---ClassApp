const TASKS_API = `${BASE_API_URL}/tasks`;


class TaskService {

    getTasks = () => {
    const response = _get(TASKS_API)
    .catch(function(error) { 
        console.error("Failed getting tasks", error);
        return null;
    });

        return response;
    }

    deleteTask = (taskId) => {
        const response = _delete(`${TASKS_API}/${taskId}`)
        .then(function(res) {
            alert("Successfully deleted task.")
            window.location.href = IN_TODO_HTML;
        })  
        .catch(function(error) {
            console.error("Failed to delete task: ", error);
            return null;
        })
    }

    updateTask = async (id, name, status) => {

        const task = {
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
        
        window.location.href = IN_TODO_HTML;
    }

    createTask = async (name, status) => {
        const task = {
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
        
        window.location.href = IN_TODO_HTML;
    }
}

const taskService = new TaskService();