class ToDo {
    tasks = [];
    taskService;

    constructor(taskService) {
        this.taskService = taskService;
    }

    init() {
        this.render();
    }

    renderListParent = () => {
        const ul = document.createElement('ul');
        ul.id = 'tasks-list';
        return ul;
    }

    renderListRowItem = (task) => {
        const listGroupItem = document.createElement('li');
        listGroupItem.id = `task-${task._id}`;
        listGroupItem.className = 'task-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'task-name';
        const taskName = document.createTextNode(task.name);
        nameSpan.appendChild(taskName);

        const statusSpan = document.createElement('span');
        statusSpan.className = 'task-status';
        const taskStatus = document.createTextNode(task.status);
        statusSpan.appendChild(taskStatus);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date'; 
        const date = new Date(task.created_date);
        const dateString = document.createTextNode(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
        dateSpan.appendChild(dateString);

        // Add update button
        const updateButton = document.createElement('button');
        updateButton.className = 'update-button';
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', () => {
            todo.showUpdateModal(task);
        });
  
        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            todo._deleteTask(task._id);
        });

        listGroupItem.append(nameSpan);
        listGroupItem.append(statusSpan);
        listGroupItem.append(dateSpan);
        listGroupItem.append(updateButton);
        listGroupItem.append(deleteButton);
           
        return listGroupItem;
    }

    renderList = () => {
        const tasksDiv = document.getElementById('tasks');
        const loadingDiv = tasksDiv.childNodes[0];
        const fragment = document.createDocumentFragment();
        const ul = document.createElement('ul');
        ul.id = 'tasks-list';

        this.tasks.map((task) => {
            const listGroupRowItem = this.renderListRowItem(task);
            ul.appendChild(listGroupRowItem);
        });

        fragment.appendChild(ul);
        tasksDiv.replaceChild(fragment, loadingDiv);
    }

    renderMsg = () => {
        const tasksDiv = document.getElementById('tasks');
        const loadingDiv = tasksDiv.childNodes[0];
        const listParent = document.getElementById('tasks-list');
        const msgDiv = this._createMsgElement('Create some new tasks!');

        if (tasksDiv) {
            tasksDiv.replaceChild(msgDiv, loadingDiv);
        } else {
            tasksDiv.replaceChild(msgDiv, listParent);
        }
    };

    _createMsgElement = (msg) => {
        const msgDiv = document.createElement('div');
        const text = document.createTextNode(msg);
        msgDiv.id = 'user-message';
        msgDiv.appendChild(text);

        return msgDiv;
    }

    render = async () => {
        const tasks = await this.taskService.getTasks();

        try {
            if (tasks.length) {
                this.tasks = tasks;
                this.renderList();
            } else {
                this.renderMsg();
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }

    showUpdateModal(task) {
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
        submitButton.onclick = () => {
            console.log("submit button clicked to update")
            try {
                this.updateTaskFromModal();
            } catch (error) {
                console.error("Error in createTaskFromModal:", error);
            };
        }
      
        modal.style.display = 'block';
    }
    
    hideModal() {
        const modal = document.getElementById('updateTaskModal');
        modal.style.display = 'none';
    }
    
    async updateTaskFromModal() {
        const nameInput = document.getElementById('taskNameInput');
        const statusSelect = document.getElementById('taskStatusSelect');
        const taskIdInput = document.getElementById('taskIdInput');
        
        const taskId = taskIdInput.value;
        const updatedName = nameInput.value;
        const updatedStatus = statusSelect.value;
      
        await this.taskService.updateTask(taskId, updatedName, updatedStatus);
      
        hideModal();
    }

    async _updateTask(taskId, name, status) {
        await this.taskService.updateTask(taskId, name, status);
    }
    
    showCreateModal() {
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

        submitButton.onclick = () => {
            try {
                this.createTaskFromModal();
            } catch (error) {
                console.error("Error in createTaskFromModal:", error);
            }
        }
    
        modal.style.display = 'block';
    }
    
    createTaskFromModal() {
        const nameInput = document.getElementById('taskNameInput');
        const statusSelect = document.getElementById('taskStatusSelect');
        
        const updatedName = nameInput.value;
        const updatedStatus = statusSelect.value;
      
        _addTask(updatedName, updatedStatus);
      
        todo.hideModal();
    }

    async _addTask(name, status) {
        const task = await this.taskService.createTask(name, status);
        this.tasks.push(task);
    }

    async _deleteTask(taskId) {
        await this.taskService.deleteTask(taskId);
        this.tasks = this.tasks.filter(task => {
            return typeof task !== 'undefined' && task._id !== taskId;
        });
    }


}

const todo = new ToDo(taskService);