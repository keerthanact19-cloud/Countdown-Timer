let timer;
let targetTime = 0;
let paused = false;
let remainingTime = 0;

const form = document.getElementById("timerForm");
const dateTime = document.getElementById("dateTime");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!dateTime.value) {
        message.textContent = "Please select a date and time.";
        return;
    }

    targetTime = new Date(dateTime.value).getTime();

    if (targetTime <= Date.now()) {
        message.textContent = "Please select a future date and time.";
        return;
    }

    clearInterval(timer);
    paused = false;
    pauseBtn.textContent = "Pause";
    message.textContent = "";

    updateTimer();

    timer = setInterval(updateTimer, 1000);
});

function updateTimer() {
    if (paused) {
        return;
    }

    remainingTime = targetTime - Date.now();

    if (remainingTime <= 0) {
        clearInterval(timer);

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        message.textContent = "Countdown completed!";
        return;
    }

    const totalSeconds = Math.floor(remainingTime / 1000);

    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
}

pauseBtn.addEventListener("click", function () {
    if (!targetTime) {
        message.textContent = "Please start the countdown first.";
        return;
    }

    if (remainingTime <= 0) {
        return;
    }

    paused = !paused;

    if (paused) {
        pauseBtn.textContent = "Resume";
        message.textContent = "Countdown paused.";
    } else {
        pauseBtn.textContent = "Pause";
        message.textContent = "";
        targetTime = Date.now() + remainingTime;
    }
});

resetBtn.addEventListener("click", function () {
    clearInterval(timer);

    targetTime = 0;
    remainingTime = 0;
    paused = false;

    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";

    dateTime.value = "";
    pauseBtn.textContent = "Pause";
    message.textContent = "";
});