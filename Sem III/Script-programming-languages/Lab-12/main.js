// Exc 1 - Copy code to check it's functionality
function validateText() {
    var val = document.forms["formularz"].tekst.value;
    var val2 = document.getElementById("textfield").value;
    var label = document.getElementById("valLabel");

    const reg = /^[a-zA-Z]{3,}$/g;

    (!reg.test(val)) ? label.innerHTML = "niepoprawnie" : label.innerHTML = "";
}

function validateCheckBox() {
    var label = document.getElementById("valLabel");

    if (document.forms.formularz.elements["zaznacz"].checked) {
        label.style.backgroundColor = "#ffff00";
    } else {
        label.style.backgroundColor = "#ffffff";
    }
}

// Exc 3 - Add actions to a button
// Content selectors
var paragraphSelector = document.getElementById("action-paragraph");
var divBackground = document.querySelector("#action-div");

// Hover in event
document.getElementById("action-button").addEventListener("mouseover", () => {
    divBackground.style.backgroundColor = "hsl(240, 3%, 94%)";
    paragraphSelector.style.fontSize = "18px";
    paragraphSelector.style.fontStyle = "oblique";
    paragraphSelector.style.backgroundColor = "hsl(204, 8%, 76%)";
    paragraphSelector.style.color = "hsl(0, 100%, 100%)";
});

// Hover out event
document.getElementById("action-button").addEventListener("mouseleave", () => {
    divBackground.style.backgroundColor = "hsl(0, 100%, 100%)";
    paragraphSelector.style.fontSize = "16px";
    paragraphSelector.style.fontStyle = "normal";
    paragraphSelector.style.backgroundColor = "hsl(0, 100%, 100%)";
    paragraphSelector.style.color = "hsl(0, 0%, 0%)";
})

// Button down event
document.getElementById("action-button").addEventListener("mousedown", () => {
    paragraphSelector.style.color = "hsl(60, 100%, 61%)";
});

// Button up event
document.getElementById("action-button").addEventListener("mouseup", () => {
    paragraphSelector.style.color = "hsl(0, 100%, 100%)";
});