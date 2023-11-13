const play = document.querySelector('#play-icon')
const pause = document.querySelector('#pause-icon')
const time = document.querySelector('#time')
const reset = document.querySelector('#pomodoro--reset')
const pomodoro = document.querySelector('#duration--pomodoro')
const short = document.querySelector('#duration--short')
const long = document.querySelector('#duration--long')
const btn__settings = document.querySelector('#pomodoro--settings')
const configuration = document.querySelector('#pomodoro--configuration')
const close__settings = document.querySelector('#btn--close')
const save__settings = document.querySelector('#save--configuration')
const input__short = document.querySelector('#duration--short')
const audio = new Audio();
audio.src = './sound_1.mp3';

let seconds = 0;
let timer = null;
let pomodoro__cicle = 1;

// function for timer
function stopwatch() {
    
    // if seconds == 0 less 1 minute and seconds = 60
    if(seconds == 0){
        minutes--;
        seconds = 60;
    }

    // less 1 second
    seconds--;

    // if minutes and seconds are same than 0 reset the clock
    if(minutes <= 0 && seconds <= 0){
        if(timer__state == 'pomodoro'){
            if (pomodoro__cicle % 2 != 0){
                watchshort()
            }
            if (pomodoro__cicle == 7){
                watchlong()
                pomodoro__cicle = 1;
            }
        }
        if((timer__state == 'short' || timer__state == 'long') && pomodoro__cicle % 2 == 0){
            watchpomodoro()
        }
        audio.play();
        watchreset()
        watchstart()
        pomodoro__cicle += 1;
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
    [minutes, seconds] = [document.querySelector('#input--' + timer__state).value,0];
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

function watchpomodoro() {
    timer__state = 'pomodoro';
    watchreset();
    pomodoro.classList.add('background');
    long.classList.remove('background');
    short.classList.remove('background');
}

function watchshort() {
    timer__state = 'short';
    watchreset();
    short.classList.add('background');
    pomodoro.classList.remove('background');
    long.classList.remove('background');
}

function watchlong() {
    timer__state = 'long';
    watchreset();
    long.classList.add('background');
    pomodoro.classList.remove('background');
    short.classList.remove('background');
}

play.addEventListener('click', watchstart)
pause.addEventListener('click', watchstop)
reset.addEventListener('click', watchreset)
btn__settings.addEventListener('click', watchconfigurations)
close__settings.addEventListener('click', watchconfigurationsclose)
save__settings.addEventListener('click', watchreset)
pomodoro.addEventListener('click', watchpomodoro)
short.addEventListener('click', watchshort)
long.addEventListener('click', watchlong)
watchpomodoro()
watchreset()
