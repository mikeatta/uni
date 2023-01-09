// Exc 1 - Create an alert pop-up on the webpage
let popUpDialog = "Hello world";
alert(popUpDialog);

// Exc 2 - Store string in variable & test string operations
console.log("Exc 2 - String operations");

let string = '“Pan Wołodyjowski” przedstawia losy pana Michała - najlepszej szabli Rzeczpospolitej.';

// Return string length
console.log(`Total string length : ${string.length}`);

// Return first index of the word
console.log(`First index of word at : ${string.indexOf("szabli")}`);

// Replace words in string
let replacedWordString = string.replace("najlepszej", "pierwszej");
console.log(`Altered string : ${replacedWordString}`);