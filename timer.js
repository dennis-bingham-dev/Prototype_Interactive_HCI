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

function updateTimerView(timer) {
  let time = timer.elapsedTimeSincePause;
  let millis = time % 1000;
  let seconds = Math.floor(time / 1000) % 60;
  let minutes = Math.floor(time / 1000 / 60) % 60;
  let hours = Math.floor(time / 1000 / 3600) % 60;
  
  let hourString = `${(hours < 10) ? '0' : ''}${hours}`;
  let minuteString = `${(minutes < 10) ? '0' : ''}${minutes}`;
  let secondString = `${(seconds < 10) ? '0' : ''}${seconds}`;
  let millisString = `${(millis < 100) ? '0' : ''}${(millis < 10) ? '0' : ''}${millis}`;
  
  mainTimer.innerText = `${hourString}:${minuteString}:${secondString}.${millisString}`;
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
  if (document.getElementById('list-organizer') === null) {
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'list-organizer');

    let li = document.createElement('li');
    li.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
                      + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
                      + ":" + (seconds > 9 ? seconds : "0" + seconds);

    ul.appendChild(li);

    lapList.appendChild(ul);
  } else {
    let li = document.createElement('li');
    li.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
                      + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
                      + ":" + (seconds > 9 ? seconds : "0" + seconds);

    document.getElementById('list-organizer').appendChild(li);
  }
});

// delete lap list children.
function deleteChildren(e) {
  e.innerHTML = '';
}

// this resets the timer and sets the appropriate variables.
reset.addEventListener('click', () => {
  clearTimeout(t);
  mainTimer.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
  let ul = document.getElementById('list-organizer');
  deleteChildren(ul);
});

