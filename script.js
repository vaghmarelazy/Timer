let sec = 0;
let min = 0;
let timer = false;
let timeinterval;

const count = document.querySelector('.count');
const start = document.querySelector(".playbtn");
const stopbtn = document.querySelector(".stop");
const changingbtn = document.querySelector('.stopbtn');
const resetbtn = document.querySelector(".reset");

stopbtn.style.opacity = 0;
resetbtn.style.opacity = 0;

function timeupdate() {
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
    }
    const formattedSec = sec < 10 ? `0${sec}` : sec;
    const formattedMin = min < 10 ? `0${min}` : min;

    if (count) {
        count.innerText = `${formattedMin}:${formattedSec}`;
    }
}

function reset() {
    sec = 0;
    min = 0;
    if (count) {
        count.innerHTML = '00:00';
    }
}

function toggleTimer() {
    start.style.opacity = timer ? 0 : '';
    count.style.opacity = timer ? '' : 1;
    stopbtn.style.opacity = timer ? 1 : 0;
    resetbtn.style.opacity = timer ? 1 : 0;
}

start.addEventListener('click', () => {
    timer = !timer;
    toggleTimer();
    start.style.opacity = 0

    if (timer) {
        clearInterval(timeinterval);
        timeinterval = setInterval(timeupdate, 1000);
    } else {
        clearInterval(timeinterval);
    }
});

let clicks = 0;
stopbtn.addEventListener('click', () => {
    timer = !timer;
    clicks++;
    changingbtn.src = clicks % 2 !== 0 ? 'svg/play-circle.svg' : 'svg/pause.svg';
    document.querySelector(".s").innerHTML = clicks % 2 !== 0 ? 'RESUME' : 'STOP';
    clearInterval(timeinterval);

    if (timer) {
        timeinterval = setInterval(timeupdate, 1000);
    }
});

resetbtn.addEventListener('click', () => {
    reset();
    clearInterval(timeinterval);
    changingbtn.src = 'svg/pause.svg';
    document.querySelector(".s").innerHTML = 'STOP';

    start.style.opacity = '';
    stopbtn.style.opacity = 0;
    resetbtn.style.opacity = 0;
    count.style.opacity = '';
    clicks = 0;
    timer = false;
    start.style.opacity = ''; // Ensure start button is hidden after clicking reset button
});

// count.addEventListener('mouseover', () => {
//     if (timer && resetbtn.style.opacity === '1') {
//         start.style.opacity = 0;
//     }
// });

// count.addEventListener('mouseout', () => {
//     start.style.opacity = timer ? 0 : '';
// });
