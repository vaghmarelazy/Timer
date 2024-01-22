let sec = 0;
let min = 0;
let timer = false;
let timeinterval;

function timeupdate() {
    sec++;
    if (sec == 60) {
        sec = 0;
        min++
    }
    const formattedsec = sec < 10 ? `0${sec}` : sec;
    const formattedmin = min < 10 ? `0${min}` : min;

    const count = document.querySelector('.count');
    if (count) {
        count.innerText = `${formattedmin}:${formattedsec}`;
    }
}
function reset() {
    sec = 0;
    min = 0;
    const count = document.querySelector('.count');
    if (count) {
        count.innerHTML = '00:00';
    }
}
let start = document.querySelector(".playbtn");
let count = document.querySelector(".count");
let stopbtn = document.querySelector(".stop");
let changingbtn = document.querySelector('.stopbtn')
let resetbtn = document.querySelector(".reset");
if (count && stopbtn && resetbtn) {
    stopbtn.style.opacity = 0;
    resetbtn.style.opacity = 0;

    start.addEventListener('click', (e) => {
        start.style.opacity = 0;
        count.style.opacity = '';
        stopbtn.style.opacity = 1;
        resetbtn.style.opacity = 1;
        timer = !timer;

        if (timer) {
            clearInterval(timeinterval);
            // reset()
            timeinterval = setInterval(timeupdate, 1000);
        }
    });
    let clicks = 0;
    stopbtn.addEventListener('click', (e) => {
        timer = !timer;
        clicks++
        changingbtn.src = 'svg/play-circle.svg';
        if (clicks % 2 != 0) {
            document.querySelector(".s").innerHTML = 'RESUME';
            clearInterval(timeinterval);
        } else if (clicks % 2 == 0) {
            changingbtn.src = 'pause.svg';
            document.querySelector(".s").innerHTML = 'STOP';
            timeinterval = setInterval(timeupdate, 1000);
        }
    });
    resetbtn.addEventListener('click', () => {
        clearInterval(timeinterval);
        changingbtn.src = 'svg/pause.svg';
        document.querySelector(".s").innerHTML = 'STOP';

        reset();
        start.style.opacity = ''
        stopbtn.style.opacity = 0;
        resetbtn.style.opacity = 0;
        count.style.opacity = '';
        clicks = 0; 
    });
}
