const primaryOrange = getComputedStyle(document.querySelector(':root')).getPropertyPriority('--primary-orange')
const secondaryOrange = getComputedStyle(document.querySelector(':root')).getPropertyPriority('--secondary-orange')
const primaryGrey = getComputedStyle(document.querySelector(':root')).getPropertyPriority('--primary-grey')

const primaryOrangeNight = '#05f240';
const secondaryOrangeNight = 'transparent';
const primaryBlackNight = 'green';
const primaryWhiteNight = '#0e3807';


function swapColours(nightMode) {
    var r = document.querySelector(':root');
    if (nightMode == true) {
        r.style.setProperty('--primary-orange', primaryOrangeNight);
        r.style.setProperty('--secondary-orange', secondaryOrangeNight);
        r.style.setProperty('--primary-black', primaryBlackNight);
        r.style.setProperty('--primary-white', primaryWhiteNight);
        r.style.setProperty('--primary-grey', primaryBlackNight);
        r.style.setProperty('--header-slogan', primaryOrangeNight);
    } else {
        r.style.setProperty('--primary-orange', primaryOrange);
        r.style.setProperty('--secondary-orange', secondaryOrange);
        r.style.setProperty('--primary-grey', primaryGrey);
        r.style.setProperty('--primary-black', 'black');
        r.style.setProperty('--header-slogan', 'black')
        r.style.setProperty('--primary-white', 'white');
    }
    console.log(getComputedStyle(document.querySelector(':root')).getPropertyPriority('--primary-orange'))
}

function slideBall() {
    const slider = document.querySelector(".slider");
    const ball = document.querySelector(".ball");
    const sun = document.querySelector(".ball :nth-child(1)")
    const moon = document.querySelector(".ball :nth-child(2)")
    const text = document.querySelector(".slider p")

    sun.classList.toggle("hidden");
    moon.classList.toggle("hidden");
    
    if (slider.classList.contains("nightmode")) {
        slider.classList.remove("nightmode");
        ball.style.left = "-5px"
        swapColours(false)
        setTimeout(() => {
            text.innerHTML = "day"
        }, 120);

    } else {
        slider.classList.add("nightmode");
        ball.style.left = "50px";
        swapColours(true)
        setTimeout(() => {
            text.innerHTML = "night"
        }, 120);
    }
}


function typedText(i, writing) {
    var txt = '(root@portfolio) - [~]<br># ./runAbout.sh';
    var start = 34;
    var speed = 250;
    const text = document.querySelector("#home-about .edit");
    if (text != null) {
        if (i == txt.length + 9) {
            writing = false;
            i = 41;
        } else if (i == start) {
            writing = true;
        }
        if (i <= txt.length && writing) {
            text.innerHTML = txt.substring(0, i) + "|";
            i++;
            setTimeout(typedText, speed, i, writing);
        } else if (i > start && !writing) {
            text.innerHTML = txt.substring(0, i - 1) + "|";
            i--;
            setTimeout(typedText, speed, i, writing);
        } else {
            if (text.innerHTML[text.innerHTML.length - 1] == "|") {
                text.innerHTML = txt;
            }
            else {
                text.innerHTML = txt + "|";
            }
            i++;
            setTimeout(typedText, 530, i, writing);
        }
    }
}

function runningText(i) {
    var txt = 'Running...';
    var start = 7;
    var speed = 500;
    const text = document.querySelector("#about .edit");
    if (text != null) {
        if (i == txt.length + 1) {
            i = start;
        }
        if (text != null) {
            text.innerHTML = txt.substring(0, i);
            i++;
        }
        setTimeout(runningText, speed, i);
    }
}

function growArrow() {
    const arrow = document.querySelector("#arrow-down");
    if (arrow != null) {
        if (arrow.classList.contains("grow")) {
            arrow.classList.remove("grow");
        } else {
            arrow.classList.add("grow");
        }
        setTimeout(growArrow, 2000);
    }
}


function closeWindow(e) {
    const test = 1;
    var caller = e.srcElement || e.target; // For IE and Others
    if (!caller.parentElement.parentElement.classList.contains("hidden")) {
        caller.parentElement.parentElement.classList.add("hidden");
        caller.parentElement.parentElement.style.opacity = 0;
        setTimeout(() => {
            caller.parentElement.parentElement.style.zIndex = 1;
        }, 500);
    }
    
}

function bringToFront(index) {
    const windows = document.querySelectorAll('.windows-stacked .mac-window');
    if (!windows[index].classList.contains("hidden")) {
        if (windows[index].style.zIndex != 4) {
            windows[(index + 1) % 3].style.zIndex  -= windows[(index + 1) % 3].style.zIndex < 3 ? 0 : 1;
            windows[(index + 2) % 3].style.zIndex -= windows[(index + 2) % 3].style.zIndex < 3 ? 0 : 1;
        } 
        windows[index].style.zIndex = 4; 
    }
}

function passiveAnimations() {
    typedText(34, false);
    runningText(7);
    growArrow();
}