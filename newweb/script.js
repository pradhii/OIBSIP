function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText);
  document.getElementById('pendingTasks').appendChild(taskItem);
  input.value = '';
}

function createTaskElement(taskText, isCompleted = false, timeStamp = null) {
  const li = document.createElement('li');

  const row = document.createElement('div');
  row.className = 'task-row';

  const span = document.createElement('span');
  span.textContent = taskText;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
    }
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();

  row.appendChild(span);
  row.appendChild(actions);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(row);

  if (!isCompleted) {
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Mark Complete';
    completeBtn.onclick = () => {
      li.remove();
      const completedItem = createTaskElement(
        span.textContent,
        true,
        new Date().toLocaleString()
      );
      document.getElementById('completedTasks').appendChild(completedItem);
    };
    actions.appendChild(completeBtn);
  }

  const timestamp = document.createElement('div');
  timestamp.className = 'timestamp';
  timestamp.textContent = timeStamp
    ? `Completed on: ${timeStamp}`
    : `Added on: ${new Date().toLocaleString()}`;

  li.appendChild(timestamp);

  return li;
}
