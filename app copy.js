const play = document.querySelector('#play-icon')
const pause = document.querySelector('#pause-icon')
const time = document.querySelector('#time')
const reset = document.querySelector('#pomodoro--reset')
const short = document.querySelector('#duration--short')
const btn__settings = document.querySelector('#pomodoro--settings')
const configuration = document.querySelector('#pomodoro--configuration')
const close__settings = document.querySelector('#btn--close')
const save__settings = document.querySelector('#save--configuration')

let seconds = 0;
let timer = null;


// function for timer
function stopwatch() {
    if(seconds % 60 == 0){
        minutes--;
    }
    if(seconds == 0){
        seconds = 60;
    }
    seconds--;
    if(minutes <= 0 && seconds <= 0){
        watchreset()
    }

    watchinner()
}


// start the timer
function watchstart() {

    //remove label start and show label pause
    play.classList.add('hidden');
    pause.classList.remove('hidden');

    // if timer 
    if(timer !== null){
        clearInterval(timer)
    }

    // counter interval 1000 miliseconds
    timer = setInterval(stopwatch, 1000);
}


// function for pause timer
function watchstop() {

    // stop the timer
    clearInterval(timer);
    
    //show the start label and hide the pause label
    play.classList.remove('hidden');
    pause.classList.add('hidden');
}

// function for reset the timer to original value
function watchreset() {
    clearInterval(timer);
    play.classList.remove('hidden');
    pause.classList.add('hidden');
    [minutes, seconds] = [document.querySelector('#input--pomodoro').value,0];
    watchconfigurationsclose();
    watchinner()

}

// function for write on the html document the seconds
function watchinner() {
    
    // establish the clock format
    let s = seconds < 10 ? "0" + seconds : seconds;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let o = minutes % 60;
    
    if(m >= 60){
        let q = o < 10 ? "0" + o : o;
        time.innerHTML = Math.trunc(m/60) + ":" + q + ":" + s ;
    }
    // insert the seconds on html document
    if(m < 60){
        time.innerHTML = m + ":" + s;
    }
}

function watchconfigurations() {
    configuration.classList.add('highlight')
    document.body.style.overflow = 'hidden';
}

function watchconfigurationsclose() {
    configuration.classList.remove('highlight')
}

play.addEventListener('click', watchstart)
pause.addEventListener('click', watchstop)
reset.addEventListener('click', watchreset)
btn__settings.addEventListener('click', watchconfigurations)
close__settings.addEventListener('click', watchconfigurationsclose)
save__settings.addEventListener('click', watchreset)
watchreset()