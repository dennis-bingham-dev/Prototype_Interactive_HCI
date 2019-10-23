// Create variables for storing data
let mainTimer = document.getElementById('inner-content'),
    play = document.getElementById('play'),
    pause = document.getElementById('pause'),
    lap = document.getElementById('lap'),
    reset = document.getElementById('reset'),
    seconds = 0,
    minutes = 0,
    hours = 0;

// function for adding time to the timer.
function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  mainTimer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
                          + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
                          + ":" + (seconds > 9 ? seconds : "0" + seconds);

  timer();
}

// This sets the timeout for the timer to update every second.
function timer() {
  t = setTimeout(add, 1000);
}

// this starts the timer.
play.onclick = timer;

// this pauses the timer and clears the timeout for the time being.
pause.onclick = () => {
  clearTimeout(t);
}

// this resets the timer and sets the appropriate variables.
reset.onclick = () => {
  mainTimer.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
}
