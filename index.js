// Initalize 
const pomodoro = document.getElementById("pomo");
const long_break = document.getElementById("long");

let timer = document.getElementById("timer");
let timerStart = false;

// Change display timer only when timer is not running
pomodoro.addEventListener("click", () => {
    if (timerStart) {
        return;
    }
    timer.innerHTML = convertSecondsToTime(3600);
});

long_break.addEventListener("click", () => {
    if (timerStart) {
        return;
    }
    timer.innerHTML = convertSecondsToTime(1200);
});

function convertSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

