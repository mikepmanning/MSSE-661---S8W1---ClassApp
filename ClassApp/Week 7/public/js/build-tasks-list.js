// /**
//  * html structure
//  * 
//  * @example
//  * <ul class="tasks-list">
//  *  <li id="task-1">
//  *      <div>
//  *          <input type="checkbox" />
//  *          <span class="task-name">Task name</span>
//  *          <span class="task-status">pending</span>
//  *          <span class="task-date">date craeted</span>
//  *      </div>
//  *  </li>
//  * </ul>
//  */

// (async () => {
//     const tasks = await getTasks();
//     console.log(tasks);
    
//     const div = document.getElementById('tasks');
//     const loadingDiv = div.childNodes[1];

//     const ul = document.createElement('ul');

//     //replace 'loading' with list
//     div.replaceChild(ul, loadingDiv);

//     if (tasks == null) {
//         const block = document.createElement('div');
//         block.innerText = "No Tasks available";
//         ul.appendChild(block);
//     } else if (tasks.length) { // <- order is important here!

//         //create the list
//         tasks.map((task) => {
//             //building blocks
//             const li = document.createElement('li');
//             li.className = 'task-item';
//             const block = document.createElement('div');
//             block.className = 'task-item-block';

//             //content

//             const checkboxSpan = document.createElement('span');
//             const checkbox = document.createElement('input');
//             checkbox.setAttribute('type', 'checkbox');
//             checkboxSpan.className = 'task-checkbox';
//             checkboxSpan.appendChild(checkbox);

//             const nameSpan = document.createElement('span');
//             nameSpan.className = 'task-name';
//             nameSpan.innerText = task.name;

//             const statusSpan = document.createElement('span');
//             statusSpan.className = 'task-status';
//             statusSpan.innerText = task.status;

//             const dateSpan = document.createElement('span');
//             dateSpan.className = 'task-date'; 
//             const date = new Date(task.created_date);
//             dateSpan.innerText = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

//               // Add update button
//               const updateButton = document.createElement('button');
//               updateButton.className = 'update-button';
//               updateButton.innerText = 'Update';
//               updateButton.addEventListener('click', () => {
//                   showUpdateModal(task);
//               });
  
//               // Add delete button
//               const deleteButton = document.createElement('button');
//               deleteButton.className = 'delete-button';
//               deleteButton.innerText = 'Delete';
//               deleteButton.addEventListener('click', () => {
//                   deleteTask(task._id);
//               });

//             //add list item
//             block.appendChild(checkboxSpan);
//             block.appendChild(nameSpan);
//             block.appendChild(statusSpan);
//             block.appendChild(dateSpan);
//             block.appendChild(updateButton); 
//             block.appendChild(deleteButton);

//             li.appendChild(block);
//             ul.appendChild(li);

//         });
//     }
// })();