import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('myform') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#input');
const tasks: Task[] = loadTask();
tasks.forEach(addListItem)

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('hello');

  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createAt: new Date(),
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
    console.log(tasks);
  });
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTask():Task [] {
  const taskJson = localStorage.getItem('TASKS');
  if (taskJson == null) return []
  return JSON.parse(taskJson);
}
