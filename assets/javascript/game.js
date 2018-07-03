// Some Global Variables
var randQuestion;
var questionOrder
var wrong = 0;
var correct = 0;
var total = 0;
var time = 30;
var clockRunning = false;

// JSON API that doesn't require an API Key
var queryURL = "https://opentdb.com/api.php?amount=30&difficulty=easy&type=multiple";
//Get Request tp retreive JSON trivia objects from the Database.
function startGame(){

// Query the database
$.ajax({
  url: queryURL,
  method: "GET"
  // .then AJAX 
}).then(function(response) {
  console.log(response);
  // The API has 15 trivia questions , we pick a random one here.
  randQuestion = response.results[Math.floor(Math.random()*15)+1];
    console.log(randQuestion);
    randOrder();
    guess();
    endGame();
    

});
}
startGame();
//DOM EVENT delegation for the non created click see working movie app exercise 10
//make ajax call on document.ready()
//AND make ajax call on after the guess
//the way you have the ajax call once
//so you need to put it inside of its own function so you can call it in multuple places
//$(document).on("click", randOrder);


console.log(randQuestion);



// Time Remaining Function
function run() {
    time = 30;
    if (!clockRunning) {
        clockRunning = true;
        time = 30;
        intervalId = setInterval(decrement,1000);
    }

}
// Decrement / Count  Function 
function decrement() {
    time--;
    $('#timer').html('Time Remaining: ' +time+ ' Seconds');

    if (time === 0){
        stop();
        wrong++;
        total++;
        alert('Times Up!, ' + randQuestion.correct_answer + ' was correct');
        startGame();
        randOrder();
        run();
    }


}
//Function to reset the timer.
function stop(){
    clockRunning = false;
    clearInterval(intervalId);

}

run();
//Random Anwser Order Function
function randOrder(){
    
    // Change the HTML to show the current question and category.
    $('#category').html('Category: ' +randQuestion.category);
    $('#question').html(randQuestion.question);
    // Mixes the anwsers around using with a 1/4 probabilty. 
    questionOrder = Math.floor(Math.random()*4)+1;
    // Creates Divs for wrong and correct anwsers
    if(questionOrder === 1){
        $('#anwsers').html("<div class='delegation'>" +"<div id='wrong1'>" + randQuestion.incorrect_answers[0] + "</div>" + "<div id='correct'>" + randQuestion.correct_answer +
        '</div>' + "<div id='wrong2'>" +  randQuestion.incorrect_answers[1] + '</div>' + "<div id='wrong3'>" +  randQuestion.incorrect_answers[2] + '</div>'+ '</div>');
    }else if (questionOrder === 2){
        $('#anwsers').html("<div class='delegation'>" +"<div id='correct'>" + randQuestion.correct_answer + '</div>' + "<div id='wrong1'>" + randQuestion.incorrect_answers[0] + '</div>' 
         + "<div id='wrong2'>" + randQuestion.incorrect_answers[1] + '</div>' + "<div id='wrong3'>" + randQuestion.incorrect_answers[2] + '</div>'+ '</div>');
    }else if (questionOrder === 3){
        $('#anwsers').html("<div class='delegation'>" + "<div id='wrong1'>" +randQuestion.incorrect_answers[0] + '</div>' + "<div id='wrong2'>" + randQuestion.incorrect_answers[1] + '</div>' + "<div id='correct'>" + randQuestion.correct_answer +
        '</div>' + "<div id='wrong3'>" + randQuestion.incorrect_answers[2] + '</div>' + '</div>');
    }else{
        $('#anwsers').html("<div class='delegation'>" +"<div id='wrong1'>" + randQuestion.incorrect_answers[0] + '</div>' + "<div id='wrong2'>" + randQuestion.incorrect_answers[1] + '</div>' + "<div id='wrong3'>" + randQuestion.incorrect_answers[2] + '</div>' + "<div id='correct'>" + randQuestion.correct_answer + '</div>'+ '</div>');
    }
}
// On Click Function for Anwsers
// If We Click the #correct we display correct, if we click #wrong we display correct and say it was incorrect.
function guess(){
    $('#wrong1').click(function(){
        wrong++;
        total++;
        alert('Wrong!, ' + randQuestion.correct_answer+ ' was correct')
        startGame();
        randOrder();
        run();
        
    });
    $('#wrong2').click(function(){
        wrong++;
        total++;
        alert('Wrong!, ' + randQuestion.correct_answer+ ' was correct')
        startGame();
        randOrder();
        run();
        
    });
    $('#wrong3').click(function(){
        wrong++;
        total++;
        alert('Wrong!, ' + randQuestion.correct_answer+ ' was correct')
        startGame();
        randOrder();
        run();
        
    });
    $('#correct').click(function(){
        correct++;
        total++;
        alert('Correct!, ' + randQuestion.correct_answer+ ' was correct')
        startGame();
        randOrder();
        run();
        
    });
    
    
}
// End Game Condition Win / Loss
//After 10 questions display the wrong and correct amount
// Create button that resets the game.

function endGame(){
    if (total === 10){
        stop();
        $('#category').html('Game Over!');
        $('#timer').html('Look at you Go!');
        $('#question').html('Wrong: ' + wrong + '<br>' + 'Correct: ' + correct);
        $('#anwsers').html("<div class='delegation'>" + 'Thanks For Playing! You got ' + correct + ' anwsers correct' + ' and ' + wrong + ' anwsers wrong!' + '<br>' + "<strong>" + 'Click me to Play Again' +  "</strong>" + '</div>');
        $('.delegation').click(function(){
            total = 0;
            wrong = 0;
            correct = 0;
            startGame();
            randOrder();
            run();
        
        });
    }

}

//Event delegation to handle events that are dynamically generated. 
// Good reference if you need refresher https://learn.jquery.com/events/event-delegation/
$('#anwsers').on("click", ".delegation", startGame);