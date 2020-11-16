function nextSequence() {
  userArray = []; // reset user input array
  randNum = Math.floor(Math.random()*4);
  randChosenColour = buttonColours[randNum];
  seqArray.push(randChosenColour);
  $("#level-title").text("Level " + seqArray.length);
  $("#" + seqArray[seqArray.length-1]).fadeOut(100).fadeIn(100);
}

function checkSequence(inpColour) {
  correct = true;
  userArray.push(inpColour);
  userIndex = userArray.length;
  console.log("correct seq to match is: " + seqArray);
  for (var i=0;i<userIndex;i++) {
    if (userArray[i] !== seqArray[i]) {
      correct = false;
      console.log("Got a wrong sequence");
    }
  }

  if (correct && (userArray.length===seqArray.length)) {
    setTimeout(function() {
      nextSequence();
    }, 500);
  } else if (!correct) {
    endGame();
  }

}

// <--- CSS Changes --->
function changeBtnColour(button) {
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
  var randSound = new Audio("sounds/" + button.attr("id") + ".mp3");
  randSound.play();
}

// <-- Game Modes -->
function startGame() {
  seqArray = [];
  userArray = [];
  gameStatus = "ongoing";
  setTimeout(function() {
    nextSequence();
  }, 500);
  // setTimeout(function() {
  //   nextSequence();
  // }, 1000);
}

function endGame() {
  $("#level-title").text("Game Over, Press Any key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  gameStatus = "end";
  endSound.play();
}

// <-- Variables -->
var buttonColours = ["red", "blue", "green", "yellow"];
var randChosenColour;
var seqArray = [];
var userArray = [];
var gameStatus = "wait";
var endSound = new Audio("sounds/wrong.mp3");

// <-- Listeners -->
$(".btn").click(function() {
  // console.log($(this).attr("id"));
  changeBtnColour($(this));
  checkSequence($(this).attr("id"));
});

$(document).keydown(function () {
  if (gameStatus==="wait" || gameStatus==="end") {
    startGame();
  }
});
