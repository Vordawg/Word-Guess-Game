var answers = ["ACURA", "AUDI", "BUICK", "CADILLAC", "CHEVROLET", "CHRYSLER",
    "DODGE", "FIAT", "FORD", "GENESIS", "HONDA", "HYUNDAI",
    "INFINITI", "JAGUAR", "JEEP", "LEXUS", "LINCOLN", "MASERATI",
    "MAZDA", "MITSUBISHI", "NISSAN", "PORSCHE", "SUBARU", "TESLA",
    "TOYOTA", "VOLKSWAGEN", "VOLVO"];
var goodGuess = [];
var badGuess = [];
var displayWord = "";
var wordToGuess = "";
var winTotal = 0;
var lossTotal = 0;

function setScreen() {
    document.getElementById("wins-text").innerHTML = winTotal;
    document.getElementById("losses-text").innerHTML = lossTotal;
    document.getElementById("word-to-guess-text").innerHTML = displayWord;

    var guessesRemaining = 10 - badGuess.length;
    document.getElementById("guess-remaining-text").innerHTML = guessesRemaining;

    var hangmanFile = "assets/images/" + badGuess.length + ".jpg";
    document.getElementById("hangmanImage").src = hangmanFile;

    document.getElementById("incorrectLetters-text").innerHTML = badGuess.toString();

}

function resetGame() {

    while (goodGuess.length > 0) {
        goodGuess.pop();
    }

    while (badGuess.length > 0) {
        badGuess.pop();
    }

    displayWord = "";

    wordToGuess = getNewWordToGuess();

    for (var loop = 0; loop < wordToGuess.length; loop++) {
        displayWord += "-"
    }

    setScreen();

    console.log("Display Word = " + displayWord);
}

function getRandomInt(max) {
    var randomNumber = Math.floor(Math.random() * Math.floor(max));
    return randomNumber;
}

function getNewWordToGuess() {
    var myRandomNumber = getRandomInt(answers.length);
    console.log(myRandomNumber);
    console.log(answers[myRandomNumber]);
    return answers[myRandomNumber];
}

function storeGuessedLetter(userInput) {
    if (wordToGuess.indexOf(userInput) >= 0) {
        if (goodGuess.indexOf(userInput) < 0) {
            goodGuess.push(userInput);
        }
    }
    else if (userInput.toUpperCase() != userInput.toLowerCase()) {
        if (badGuess.indexOf(userInput) < 0) {
            badGuess.push(userInput);
        }
    }
    else {
        alert("Please choose a letter between A - Z.");
    }
    console.log("Good Guess: " + goodGuess);
    console.log("Bad Guess:" + badGuess);
}

function updateDisplayWord() {
    displayWord = "";
    for (var loop = 0; loop < wordToGuess.length; loop++) {
        var individualLetter = wordToGuess.charAt(loop);

        if (goodGuess.indexOf(individualLetter) >= 0) {
            displayWord += individualLetter;
        }

        else {
            displayWord += "-";
        }

        console.log("Display Word = " + displayWord);
    }
    console.log("Display Word = " + displayWord);

    setScreen();
}

function checkGame() {
    setScreen();
    if (badGuess.length == 10) {
        alert('You did not guess the word in 10 tries. The word you had to guess is "' + wordToGuess + '"');
        lossTotal++;
        resetGame();
    }
    else if (displayWord == wordToGuess) {
        alert("You win");
        winTotal++;
        resetGame();
    }
    else {
        // Do Nothing
    }

}

// Initialze the game
resetGame();

document.onkeyup = function (event) {
    var keyPressed = event.key.toUpperCase();
    console.log("Key Pressed = " + keyPressed);

    storeGuessedLetter(keyPressed);

    updateDisplayWord();

    checkGame();
}