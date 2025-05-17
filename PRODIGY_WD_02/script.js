let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapList = document.getElementById("lap-list");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const currentTime = Date.now();
  const timePassed = currentTime - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(timePassed);
}

startBtn.addEventListener("click", () => {
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 10);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  lapList.innerHTML = "";

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
});

lapBtn.addEventListener("click", () => {
  const lapTime = timeDisplay.textContent;
  const li = document.createElement("li");
  li.textContent = lapTime;
  lapList.appendChild(li);
});

