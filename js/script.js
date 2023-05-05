/**
 * This function handles handling the on click event for the slider
 * @param  {boolean} pageLoad Weather the function is being called on page load
 */
function slideBall(pageLoad=false) {
    
    const slider = document.querySelector(".slider");
    const ball = document.querySelector(".ball");
    const sun = document.querySelector(".ball :nth-child(1)")
    const moon = document.querySelector(".ball :nth-child(2)")
    const text = document.querySelector(".slider p")

    if (pageLoad) {
        // When a page is being loaded, check if the user has dark 
        // mode enabled. If so, set the slider to the correct position
        if (document.documentElement.classList.contains("night")) {
            slider.classList.add("nightmode");
            sun.classList.toggle("hidden");
            moon.classList.toggle("hidden");
            ball.style.left = "60px";
            text.innerHTML = "night"
        }
        return;
    }

    // Always toggle the sun and moon icons
    sun.classList.toggle("hidden");
    moon.classList.toggle("hidden");

    if (slider.classList.contains("nightmode")) {
        // If the slider is in night mode, move it to day mode
        document.documentElement.classList.remove("night");
        localStorage.setItem('dark', 'false');
        slider.classList.remove("nightmode");
        ball.style.left = "-22px"
        setTimeout(() => {
            text.innerHTML = "day"
        }, 120);
    } else {
        // Else the slider is in day mode, move it to night mode
        document.documentElement.classList.add("night");
        localStorage.setItem('dark', 'true');
        slider.classList.add("nightmode");
        ball.style.left = "60px";
        setTimeout(() => {
            text.innerHTML = "night"
        }, 120);
    }
}

/**
 * This function handles the typing animation for the home page about section.
 * It is called recursively to type out the text and then backspace it.
 * @param  {int} i The current index of the string
 * @param  {boolean} writing Whether the function is currently writing or backspacing
 */
function typedText(i, writing) {
    var content = '(root@portfolio) - [~]<br># ./runAbout.sh';
    var start = 34;
    var speed = 250;
    const pElement = document.querySelector("#home-about .edit");
    // Ensure that the element exists (may not be on homepage)
    if (pElement != null) {
        // This block handles updating which mode the function is in
        if (i == content.length + 9) {
            writing = false;
            i = 41;
        } else if (i == start) {
            writing = true;
        }
        // This block handles the actual typing animation
        if (i <= content.length && writing) {
            // This handles writing
            pElement.innerHTML = content.substring(0, i) + "|";
            i++;
            setTimeout(typedText, speed, i, writing);
        } else if (i > start && !writing) {
            // This handles backspacing
            pElement.innerHTML = content.substring(0, i - 1) + "|";
            i--;
            setTimeout(typedText, speed, i, writing);
        } else {
            // This handles the blinking cursor at the end of the line
            if (pElement.innerHTML[pElement.innerHTML.length - 1] == "|") {
                pElement.innerHTML = content;
            }
            else {
                pElement.innerHTML = content + "|";
            }
            i++;
            setTimeout(typedText, 530, i, writing);
        }
    }
}

/**
 * This function handles the typing animation for the about page
 * @param  {int} i The current index of the string
 */
function runningText(i) {
    var content = 'Running...';
    var start = 7;
    var speed = 500;
    const pElement = document.querySelector("#about .edit");
    // Ensure that the element exists (may not be on about page)
    if (pElement != null) {
        // Loop the index
        if (i == content.length + 1) {
            i = start;
        }
        // Write the content
        pElement.innerHTML = content.substring(0, i);
        i++;
        // Call the function again
        setTimeout(runningText, speed, i);
    }
}

/**
 * This function handles the passive arrow animation
 * for the home page. Recursively called.
 */
function growArrow() {
    const arrow = document.querySelector("#arrow-down");
    // Ensure that the arrow exists (may not be on home page)
    if (arrow != null) {
        // If the arrow is already growing, shrink it
        if (arrow.classList.contains("grow")) {
            arrow.classList.remove("grow");
        } else {
            // Else grow it
            arrow.classList.add("grow");
        }
        // Call the function again
        setTimeout(growArrow, 2000);
    }
}

/**
 * This function handles closing a mac-window when the close button is clicked.
 * It is called by the close button's onclick event.
 * @param {event} event The event that triggered the function 
 */
function closeWindow(event) {
    var caller = event.srcElement || event.target; // For IE and Others
    const macWindow = caller.parentElement.parentElement;
    if (!macWindow.classList.contains("hidden")) {
        macWindow.classList.add("hidden");
        macWindow.style.opacity = 0;
        setTimeout(() => {
            macWindow.style.zIndex = 1;
        }, 500);
    }
    
}

/**
 * This function enables the mac windows zIndex position to be changed so they
 * can simulate a stack of windows in a desktop environment
 * @param {int} index The index of the window to bring to the front
 */
function bringToFront(index) {
    const windows = document.querySelectorAll('.windows-stacked .mac-window');
    // Ensure that the mac window hasn't been closed
    if (!windows[index].classList.contains("hidden")) {
        // Ensure the mac window isn't already at the front
        if (windows[index].style.zIndex != 4) {
            // If it isn't, bring it to the front and lower the zIndex of the other windows
            // Uses modulus to loop the index and ensures that the zIndex is always between 2 and 4
            windows[(index + 1) % 3].style.zIndex  -= windows[(index + 1) % 3].style.zIndex < 3 ? 0 : 1;
            windows[(index + 2) % 3].style.zIndex -= windows[(index + 2) % 3].style.zIndex < 3 ? 0 : 1;
        } 
        // Bring the window to the front
        windows[index].style.zIndex = 4; 
    }
}
/**
 * This function handles swapping between the projects on the projects page. 
 * @param {int} index The index of the project to swap to 
 */
function swapProject(index) {
    const windows = document.querySelectorAll('#projects .mac-window');
    const textBoxes = document.querySelectorAll('.text-box');
    const textArrows = document.querySelectorAll('.text-arrow');
    // Ensure that the mac window isn't already being displayed
    if (windows[index].classList.contains("hidden")) {
        // Get the index of the window that is currently active
        const activeIndex = windows[(index + 1) % 3].classList.contains("hidden") ? (index + 2) % 3 : (index + 1) % 3;

        // Show the selected window
        windows[index].classList.remove("hidden");
        textArrows[index].classList.remove("hidden")
        textBoxes[index].classList.add("active");

        // Hide the active window
        windows[activeIndex].classList.add("hidden");
        textArrows[activeIndex].classList.add("hidden")
        textBoxes[activeIndex].classList.remove("active");
    }
}

/**
 * This function is a placeholder for the contact form. It will be
 * implemented in future. 
 * @param {event} event The event that triggered the function
 */
function sendForm(event) {
    const x = 2;
}

/**
 * This function just calls the other passive animations
 * and intitial check for dark mode.
 */
function passiveAnimations() {
    slideBall(true)
    typedText(34, false);
    runningText(7);
    growArrow();
}

// This is called when the JS file is loaded, checking if
// the user has dark mode enabled and applying it if so.
// This is done here to prevent a flash of light mode on page load. 
if (localStorage.getItem('dark') == 'true') {
    document.documentElement.classList.add("night");
}