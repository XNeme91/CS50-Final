// Initalize variables
const pomodoro = document.getElementById("pomo");
const long_break = document.getElementById("long");

let intervalId = null;
let seconds = 3600;
const timer = document.getElementById("timer");
const timerControls = document.querySelector("#timer-controls");
let timerStart = false;
let onBreak = false;

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

// idk copilot just did this
function convertSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Adjust display of controls
// fill when hover
timerControls.addEventListener("mouseover", (event) => {
    if (!timerStart) {
        timerControls.src = "src/play-circle-fill.svg";
    } else {
        timerControls.src = "src/pause-circle-fill.svg";
    }
});

// unfill when not hover
timerControls.addEventListener("mouseout", (event) => {
    if (!timerStart) {
        timerControls.src = "src/play-circle.svg";
    } else {
        timerControls.src = "src/pause-circle.svg";
    }
});

// Start timer when play button is clicked
timerControls.addEventListener("click", () => {
    // If timer is running, stop it
    // and change icon to play
    // vice versa

    if (timerStart) {
        timerStart = false;
        clearInterval(intervalId);
        timerControls.src = "src/play-circle-fill.svg";
        console.log(timerStart);
    } else {
        timerStart = true;
        updateTimer();
        timerControls.src = "src/pause-circle-fill.svg";
        console.log(timerStart);
    }
});

// Update timer every second if timer is running
function updateTimer() {
    intervalId = setInterval( () => {
        seconds--;
        timer.innerHTML = convertSecondsToTime(seconds);

        if (seconds == 0) {
            if (onBreak) {
                seconds = 3600;
                onBreak = false;
                timer.innerHTML = convertSecondsToTime(seconds);
            } else {
                seconds = 1200;
                onBreak = true;
                timer.innerHTML = convertSecondsToTime(seconds);
            }
        }
    }, 1000)
}

