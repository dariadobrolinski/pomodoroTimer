const timeDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const beep = document.getElementById('beep');
const circle = document.getElementById('progressCircle');

const radius = 110;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

let isRunning = false;
let isWork = true;
let timer;
let totalTime = 25 * 60;
let timeLeft = totalTime;

const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const updateCircle = () => {
  const progress = (timeLeft / totalTime);
  const offset = circumference * (1 - progress);
  circle.style.strokeDashoffset = offset;
};

const updateDisplay = () => {
  timeDisplay.textContent = formatTime(timeLeft);
  statusDisplay.textContent = isWork ? 'Work time :)' : 'Break time!';
  updateCircle();
};

const switchMode = () => {
  isWork = !isWork;
  totalTime = isWork ? 25 * 60 : 5 * 60;
  timeLeft = totalTime;
  updateDisplay();
};

const startTimer = () => {
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      beep.play();
      switchMode();
    }
  }, 1000);
};

const stopTimer = () => clearInterval(timer);

startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
    startStopBtn.textContent = 'Stop';
  } else {
    stopTimer();
    startStopBtn.textContent = 'Start';
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  isRunning = false;
  isWork = true;
  totalTime = 25 * 60;
  timeLeft = totalTime;
  updateDisplay();
  startStopBtn.textContent = 'Start';
});

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && taskInput.value.trim()) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.margin = '0 8px 0 0';
    li.appendChild(checkbox);
    const span = document.createElement('span');
    span.textContent = taskInput.value;
    li.appendChild(span);
    taskList.appendChild(li);
    taskInput.value = '';
  }
});

updateDisplay();