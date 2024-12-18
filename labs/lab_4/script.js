// script.js

// Данные
const tasks = new Map(); // Хранилище задач
const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

// Элементы
const calendar = document.getElementById('calendar');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const tasksPopup = document.getElementById('tasks-popup');
const popupDate = document.getElementById('popup-date');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const closePopupBtn = document.getElementById('close-popup');

// Функции
function updateCalendar() {
    calendar.innerHTML = '';
    // Используем currentMonth и currentYear для отображения текущего месяца и года
    currentMonthSpan.textContent = `${new Date(currentYear, currentMonth).toLocaleString('ru', { month: 'long' })} ${currentYear}`;
  
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date().toDateString();
  
    // Пустые ячейки до первого дня
    for (let i = 0; i < (firstDay || 7) - 1; i++) {
      calendar.innerHTML += '<div></div>';
    }
  
    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = new Date(currentYear, currentMonth, day).toDateString();
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.textContent = day;
  
      if (dateStr === today) {
        dayDiv.classList.add('current');
      }
      if (tasks.has(dateStr)) {
        dayDiv.classList.add('tasks');
      }
  
      dayDiv.addEventListener('click', () => openTaskPopup(dateStr));
      calendar.appendChild(dayDiv);
    }
  }
  

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
}

function openTaskPopup(dateStr) {
  popupDate.textContent = dateStr;
  taskList.innerHTML = '';

  const dateTasks = tasks.get(dateStr) || [];
  if (dateTasks.length === 0) {
    taskList.innerHTML = '<li>Планов нет</li>';
  } else {
    dateTasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task;
      taskList.appendChild(li);
    });
  }

  tasksPopup.classList.remove('hidden');
  addTaskBtn.onclick = () => addTask(dateStr);
}

function addTask(dateStr) {
  const newTask = taskInput.value.trim();
  if (newTask) {
    if (!tasks.has(dateStr)) {
      tasks.set(dateStr, []);
    }
    tasks.get(dateStr).push(newTask);
    taskInput.value = '';
    openTaskPopup(dateStr);
    updateCalendar();
  }
}

function closePopup() {
  tasksPopup.classList.add('hidden');
}

// События
prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));
closePopupBtn.addEventListener('click', closePopup);

// Инициализация
updateCalendar();
