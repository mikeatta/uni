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