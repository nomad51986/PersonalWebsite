const textLines = [
    "Greetings, Professor Falken",
    "What game would you like to play?",
    "",
    "Chess",
    "Poker",
    "Desert warfare",
    "Theaterwide tactical warfare",
    "Global thermonuclear war"
];

const outputElement = document.getElementById("output");
const blinkingLine = document.querySelector(".blinking-line");

let currentIndex = 0;
let currentCharIndex = 0;

function typeText() {
    if (currentIndex < textLines.length) {
        const line = textLines[currentIndex];
        if (currentCharIndex <= line.length) {
            const character = line.charAt(currentCharIndex);
            outputElement.innerHTML += character;
            currentCharIndex++;
            blinkingLine.style.left = (currentCharIndex * 14) + "px"; 
            setTimeout(typeText, 50);
        } else {
            currentIndex++;
            currentCharIndex = 0;
            outputElement.innerHTML += "<br>";
            blinkingLine.style.left = "0"; // Reset the position to the beginning of the line
            setTimeout(typeText, 1000); // Delay before typing the next line
        }
    }
}

// Start the typing animation
typeText();
      

// Game
// Generate a random 4-digit code
const secretCode = generateRandomCode();
let feedbackHistory = '';
let remainingGuesses = 10; // Set the maximum number of guesses

function generateRandomCode() {
    return Math.floor(Math.random() * 9000 + 1000);
}

// Function to check the guess
function checkGuess() {
    if (remainingGuesses === 0) {
        alert('You have used all your guesses.');
        return;
    }

    const guess = document.getElementById('guessInput').value;
    const feedbackDiv = document.getElementById('feedback');
    
    if (guess.length !== 4 || !/^\d+$/.test(guess)) {
        feedbackDiv.innerHTML += '<span style="color: red;">Please enter a valid 4-digit number.</span><br>';
        return;
    }

    let feedback = '';

    for (let i = 0; i < 4; i++) {
        const secretDigit = secretCode.toString()[i];
        const guessDigit = guess.toString()[i];

        if (guessDigit === secretDigit) {
            feedback += '<span class="code" style="background-color: green;">' + guessDigit + '</span>';
        } else if (secretCode.toString().includes(guessDigit)) {
            feedback += '<span class="code" style="background-color: blue;">' + guessDigit + '</span>';
        } else {
            feedback += '<span class="code" style="background-color: red;">' + guessDigit + '</span>';
        }
    }

    feedbackHistory += 'Guess ' + (10 - remainingGuesses + 1) + ': ' + guess + '<br>' + feedback + '<br>';
    remainingGuesses--;

    feedbackDiv.innerHTML = feedbackHistory;

    if (guess == secretCode) {
        feedbackDiv.innerHTML += '<span style="color: green;">Nuclear Code accepted, launch Cancelled.</span><br>';
        document.getElementById('guessInput').disabled = true;
        document.getElementById('submitGuess').disabled = true;
    } else if (remainingGuesses === 0) {
        feedbackDiv.innerHTML += '<span style="color: red;">Access denied, Launch commencing in 3...2...1. The correct code was ' + secretCode + '.</span><br>';
        document.getElementById('guessInput').disabled = true;
        document.getElementById('submitGuess').disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const popupButton = document.getElementById("popupButton");
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeButton");

    // Function to show the popup
    function showPopup() {
        popup.style.display = "block";
    }

    // Function to close the popup
    function closePopup() {
        popup.style.display = "none";
    }

    // Event listener for the button click
    popupButton.addEventListener("click", showPopup);

    // Event listener for the close button click
    closeButton.addEventListener("click", closePopup);
});



