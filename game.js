let levelList = ["red", "green", "blue", "yellow"];
let currentLevel = 0;
let gamePattern = [];
let playerPattern = [];
let started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + currentLevel);
    $("h3").addClass("d-none");
    $(".pre").remove();
    $(".pre-txt").remove();
    $(".point-txt").remove();
    generateLevel();
    started = true;
  }
});

$(".btn").click(function () {
  let selectedColour = $(this).attr("id");
  playerPattern.push(selectedColour);

  playSound(selectedColour);
  onClickAnimation(selectedColour);

  validateLevel(playerPattern.length - 1);
});

function validateLevel(currentPattern) {
  if (gamePattern[currentPattern] === playerPattern[currentPattern]) {
    if (playerPattern.length === gamePattern.length) {
      setTimeout(function () {
        generateLevel();
      }, 1000);
    }
  } else {
    if (started) {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h3").removeClass("d-none");
      $("#level-title").text("You reach Level " + currentLevel);
      $("#level-sub-title").text("Press Any Key to Restart");
      gamePattern.reverse();
      $.each(gamePattern, function (index, value) {
          $(".level-sub-title").after("<div class='pre " + value + "'></div>");
          if (index != gamePattern.length - 1) {
            $(".level-sub-title").after("</div><div class='point-txt'>></div>");
          }
      });
      $(".level-sub-title").after("<div class='pre-txt'>All Level is :</div>");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);

      startOver();
    }
  }
}

function generateLevel() {
  playerPattern = [];
  currentLevel += 1;
  $("#level-title").text("Level " + currentLevel);
  let levelRandom = Math.floor(Math.random() * levelList.length);
  let nextLevel = levelList[levelRandom];
  gamePattern.push(nextLevel);
  $("#" + nextLevel).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(nextLevel);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function onClickAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  currentLevel = 0;
  gamePattern = [];
  started = false;
}