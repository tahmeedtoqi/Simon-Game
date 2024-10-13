var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Function to play sound
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to generate the next sequence
function nextSequence() {
    userClickedPattern = [];  // Reset user input for the new level
    level++;
    $("h1").text("Level " + level);  // Update level display

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate and play sound for the chosen color
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log("Generated pattern:", gamePattern);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success!");

        // If the user completed the pattern
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);  // Move to the next sequence after a delay
        }
    } else {
        console.log("Wrong!");
        playSound("wrong");  // Play wrong sound
        $("h1").text("Game Over, Press Any Key to Restart");  // Update h1 with game over message

        startOver();  // Reset the game
    }
}

// Function to start the game
function startGame() {
    if (!started) {
        level = 0;
        gamePattern = [];
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
}

// Function to restart the game after Game Over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Detect button clicks
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // Play sound and animate the button
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check the user's answer
    checkAnswer(userClickedPattern.length - 1);
});

// Start the game on keypress or click
$(document).one("keydown", function () {
    startGame();
});

$(document).one("click", function () {
    startGame();
});
