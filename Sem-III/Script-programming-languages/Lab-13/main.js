// Exc 1 - Copy & edit code to only read text files
function doUpload(uploader) {
    var reader = new FileReader();

    // Get name and extension from uploaded file
    reader.readAsText(uploader.files[0], 'UTF-8');
    var fileName = uploader.files[0].name;
    fileExtension = fileName.slice(-4);

    // Validate file extension
    if (fileExtension !== ".txt") alert("Error. Wrong file extension!");
    else {
        reader.onprogress = function(evt) {
            console.log('Postęp wczytywania', evt);
        };
        reader.onload = function(evt) {
            document.getElementById("editor").innerHTML = evt.target.result;
        };
        reader.onerror = function(evt) {
            alert('Błąd wczytywania pliku!');
        };
    }
}

// Exc 2 - Timer function
function timer(action) {
    var time = document.getElementById("timer-label");
    var status = document.getElementById("timer-status");

    if (action == 1) {
        // Reset label
        time.innerHTML = "";
        status.innerHTML = "Timer running"
        start = new Date();
    }

    if (action == 0 && start > 0) {
        status.innerHTML = "Timer stopped"
        stop = new Date();
        sec = Math.abs(stop-start) / 1000;
        start = 0;
        time.innerHTML = sec;
    }
}