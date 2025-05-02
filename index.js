// Initalize variables
const pomodoro = document.getElementById("pomo");
const long_break = document.getElementById("long");

let seconds = 0;
const timer = document.getElementById("timer");
const timerControls = document.querySelector("#timer-controls");
let timerStart = false;

// Change display timer only when timer is not running
pomodoro.addEventListener("click", () => {
    if (timerStart) {
        return;
    }
    seconds = 3600;
    timer.innerHTML = convertSecondsToTime(seconds);
});

long_break.addEventListener("click", () => {
    if (timerStart) {
        return;
    }
    seconds = 1200;
    timer.innerHTML = convertSecondsToTime(seconds);
});


function convertSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

timerControls.addEventListener("mouseover", (event) => {
    if (!timerStart) {
        timerControls.src = "src/play-circle-fill.svg";
    } else {
        timerControls.src = "src/pause-circle-fill.svg";
    }
    
});

timerControls.addEventListener("mouseout", (event) => {
    if (!timerStart) {
        timerControls.src = "src/play-circle.svg";
    } else {
        timerControls.src = "src/pause-circle.svg";
    }
});