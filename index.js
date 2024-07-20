var gameSeq = [];
var userSeq = [];

function chooseRandom(){
    var colours = ['red', 'blue', 'yellow', 'green'];
    var randomNo = Math.floor(Math.random() * 4);
    var randomColour = colours[randomNo];
    return randomColour;
}


function buttonAnimate(id){
    $(id).animate({opacity: "40%"}, 300);
    $(id).animate({opacity: "100%"}, 300);
}

var level = 1;

function addColour(){
    userSeq = [];
    randomColour = chooseRandom();
    gameSeq.push(randomColour);
    buttonAnimate("#" + randomColour);
    playSound(randomColour);
    $("h1").text("Level " + level);
    level += 1;
    console.log("game: " + gameSeq);
}



$(".btn").on("click", function click(){
    var userColour = this.id;
    
    userSeq.push(userColour);
    playSound(userColour);
    console.log("userSeq: " + userSeq);
    console.log("gameseqlen: " + gameSeq.length);
    console.log("userseqlen: " + userSeq.length);
    $("#" + this.id).addClass("pressed");

    setTimeout(function() {
        $("#" + userColour).removeClass("pressed");
    }, 100);

    checkAns(userSeq.length - 1);

})



function playSound(colour){
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}

$(document).on("keydown", function(event){
    if(event.key==="a"){
        addColour();
    }
})


function startOver(){
    gameSeq=[];
    level=1;
    $("h1").text("Press A Key to Start");
}


function checkAns(currentLevel){
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        console.log("success");

        if (userSeq.length === gameSeq.length) {
            setTimeout(function () {
                addColour();
            }, 1000);
        }
    } else {
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press A Key to Restart");
        startOver();
    }
}