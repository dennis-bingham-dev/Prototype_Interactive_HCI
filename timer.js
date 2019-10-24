// Create variables for storing data
let mainTimer = document.getElementById('inner-content'),
    play = document.getElementById('bt-play'),
    pause = document.getElementById('bt-pause'),
    lap = document.getElementById('bt-lap'),
    reset = document.getElementById('bt-reset'),
    timerList = document.getElementById('timer-list'),
    lapList = document.getElementById('lap-list'),
    newTimer = document.getElementById('new-timer');

let timers = [];

function generateTimer() {
  return {
    timerID: timers.length,
    intervalID: null,
    startTime: null,
    elapsedTimeSincePause: null,
    runningTotal: null,
  };
}

// add a timer by default
let focusedTimer = generateTimer();
timers.push(focusedTimer);

function convertTimeToDisplay(time) {
  let millis = time % 1000;
  let seconds = Math.floor(time / 1000) % 60;
  let minutes = Math.floor(time / 1000 / 60) % 60;
  let hours = Math.floor(time / 1000 / 3600) % 60;
  
  let hourString = `${(hours < 10) ? '0' : ''}${hours}`;
  let minuteString = `${(minutes < 10) ? '0' : ''}${minutes}`;
  let secondString = `${(seconds < 10) ? '0' : ''}${seconds}`;
  let millisString = `${(millis < 100) ? '0' : ''}${(millis < 10) ? '0' : ''}${millis}`;
  
  return `${hourString}:${minuteString}:${secondString}.${millisString}`;
}

function updateTimerView(timer) {
  mainTimer.innerText = convertTimeToDisplay(timer.elapsedTimeSincePause);
}

function updateTimer(timer) {
  timer.elapsedTimeSincePause = (new Date()).valueOf() - timer.startTime + timer.runningTotal;
}

// This sets the timeout for the timer to update every second.
function startTimer(timer) {
  timer.startTime = (new Date()).valueOf();
  
  timer.intervalID = setInterval(() => {
    updateTimer(timer);
    updateTimerView(timer);
  }, 10);
}

function stopTimer(timer) {
  clearInterval(timer.intervalID);
  timer.intervalID = null;
  timer.startTime = null;
  timer.runningTotal = timer.elapsedTimeSincePause;
}

// this starts the timer.
play.addEventListener('click', () => {
  startTimer(focusedTimer);
});

// this pauses the timer and clears the timeout for the time being.
pause.addEventListener('click', () => {
  stopTimer(focusedTimer);
});

// this will add the laps to the lap section of the prototype.
lap.addEventListener('click', () => {
  if (focusedTimer.intervalID !== null) {
    let divLap = document.createElement('div');
    divLap.classList.add('lap-display');
    divLap.innerText = convertTimeToDisplay(focusedTimer.elapsedTimeSincePause);
    lapList.appendChild(divLap);
  }
});

// this resets the timer and sets the appropriate variables.
reset.addEventListener('click', () => {
  mainTimer.innerText = '00:00:00.000';
  lapList.innerHTML = '';
  
  stopTimer(focusedTimer);
  focusedTimer = generateTimer();
});

