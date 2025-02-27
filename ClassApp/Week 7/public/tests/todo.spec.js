const taskApiServiceStub = {
    tasks: [
        {
            _id: 1,
            name: 'First Test Task',
            status: 'pending',
            created_date: '2020-04-14 22:50:32',
        },
    ],
    getTasks: () => this.tasks,
    addTask: (formData) => {},
    deleteTask: (taskId) => {},
};

const tasksService = new TaskService();
const todoTest = new ToDo(tasksService);

describe('Todo App', () => {
    it('should initialize some HTML', () => {
        spyOn(todoTest, 'init');
        todoTest.init();

        expect(todoTest.init).toHaveBeenCalled();
    });

    let id;
    it('should add a task', async () => {
        const newTask = {
            _id: 1,
            name: 'Third Test Task',
            status: 'pending',
            created_date: '2020-04-14 22:50:32',
        };

        const addTaskServiceSpy = spyOn(tasksService, 'createTask');

        await todoTest._addTask(newTask);


        expect(addTaskServiceSpy).toHaveBeenCalled();
        expect(todoTest.tasks.length).toBe(1);
        id = newTask._id;
    });

    it('should update a task', async () => {
        const updatedTask = {
            _id: id,
            name: 'Third Test Task Updated',
            status: 'pending',
            created_date: '2020-04-14 22:50:32',
        };

        const updateTaskServiceSpy = spyOn(tasksService, 'updateTask');

        await todoTest._updateTask(updatedTask._id, updatedTask.name, updatedTask.status);


        expect(updateTaskServiceSpy).toHaveBeenCalled();
        expect(todoTest.tasks.length).toBe(1);
    })

    it('should delete a task', async () => {
        const existingTask = {
            _id: id,
            name: 'Third task',
            status: 'pending',
            created_date: '2020-04-14 22:50:32',
        };
        const deleteTaskServiceSpy = spyOn(tasksService, 'deleteTask');

        await todoTest._deleteTask(existingTask._id);

        expect(deleteTaskServiceSpy).toHaveBeenCalled();
        expect(todoTest.tasks.length).toBe(0);


    });

    
});