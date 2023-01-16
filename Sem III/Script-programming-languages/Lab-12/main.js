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