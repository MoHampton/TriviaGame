/*Longest variable EVER... ends at 208.  Heavy usage of invoking a function as a method*/ 
var trivia = {
   //User Correct Answers
	correct: 0,
   //User Incorrect Answers
	incorrect: 0,
   //User Ran Out of Time 
	timeOut: 0,
   //Tracks How Many Questions
	questionNumber: 0,
	
   //Array of questions to include gifs
	questions:
		[
			{
				question: "What is Big's first Name?",
				answerA: 'Elliot',
				answerB: 'Jack',
				answerC: 'John',
				answerD: 'Aaron',
				correct: 'John',
				img: 'John2.gif'

			},
			{
				question: 'How does Berger break up with Carrie?',
				answerA: 'On the phone',
				answerB: 'Voicemail',
				answerC: 'An email',
				answerD: 'A post-it',
				correct: 'A post-it',
				img: 'post-it.gif'
			},
			{
				question: 'What makes Carrie have a panic attack?',
				answerA: 'The idea of marriage',
				answerB: 'Seeing Big with another woman',
				answerC: "Seeing Miranda's baby",
				answerD: 'Money',
				correct: 'The idea of marriage',
				img: 'OMG.gif'
			},
			{
				question: 'How did Charlotte and Trey meet?',
				answerA: 'On a blind date',
				answerB: "Samantha's Party",
				answerC: 'In the street after Charlotte fell',
				answerD: 'At a museum opening',
				correct: 'In the street after Charlotte fell',
				img: 'charlotte.gif'
			},
			{
				question: "What is it about Carrie that makes Aidan say he can't date her ?",
				answerA: 'He finds her odd',
				answerB: 'She is a smoker',
				answerC: "She doesn't make enough money",
				answerD: "She doesn't like dogs",
				correct: 'She is a smoker',
				img: 'smoker.gif'
			},
			{
				question: 'What does Carrie wear on the opening credits?',
				answerA: 'A stylish tutu',
				answerB: 'A striking pant suit',
				answerC: 'A revealing black dress',
				answerD: 'A tasteful summer dress',
				correct: 'A stylish tutu',
				img: 'happy.gif'
			},
			{
				question: "The ladies' drink of choice is...?",
				answerA: 'Martini',
				answerB: 'Margaritas',
				answerC: 'Cosmos',
				answerD: 'Moscow Mules',
				correct: 'Cosmos',
				img: 'cosmos.gif'
			}
		],

	//Displays Remaining Time 
	beginCountdown: function(time) {
		$('.timer').html('Time Remaining: ' + time);
		counter = setInterval(function () {
			time--;
			$('.timer').html('Time Remaining: ' + time);

			//When time runs out
			if(time === 0) {
				//Increase number of timed out questions; display on HTML
				trivia.timeOut++;
				trivia.results('timeOut');
			}
		},1000);
	},

	//Stop countdowns between questions
   stopCountdown: function() {
		clearInterval(counter);
	},

	//Display Questions
	game: function() {
		//If questions are unanwered
		if (trivia.questionNumber < trivia.questions.length) {
			//Begin countdown for 30 seconds
			trivia.beginCountdown(30);

			//Create new variable to make it easier to reference questionNumber
			number = trivia.questionNumber;

			//Adds numbers to displayed questions
			quizNumber = number + 1;

			//Display question
			$('.show-question').append('<h2 class="question question-' + quizNumber + '">' + quizNumber + ') ' + trivia.questions[number].question + '</h2>');

			//Disply answers
			$('.show-question').append('<div class="answer question-' + quizNumber + ' answerA" data-answer="' + trivia.questions[number].answerA + '">A) ' + trivia.questions[number].answerA + '</div>');
			$('.show-question').append('<div class="answer question-' + quizNumber + ' answerB" data-answer="' + trivia.questions[number].answerB + '">B) ' + trivia.questions[number].answerB + '</div>');
			$('.show-question').append('<div class="answer question-' + quizNumber + ' answerC" data-answer="' + trivia.questions[number].answerC + '">C) ' + trivia.questions[number].answerC + '</div>');
			$('.show-question').append('<div class="answer question-' + quizNumber + ' answerD" data-answer="' + trivia.questions[number].answerD + '">D) ' + trivia.questions[number].answerD + '</div>');
			
			//When an answer is clicked
			$('.answer').click(function() {
				//Log the answer into a variable
				answer = $(this).data('answer');

				//If answer is correct, increase correct answers and show results page
				if (answer == trivia.questions[number].correct) {
					trivia.correct++;
					trivia.results('correct');
				}
				//Else if answer is incorrect, increase incorrect answers and show results page
				else {
					trivia.incorrect++;
					trivia.results('incorrect');
				}
			});
		}

		//Else end game
		else {
			trivia.endGame();
		}
	},

	//Results page. Result parameter: 'correct', 'incorrect', or 'missed'. Calls nextQuestion() after 4 seconds.
	results: function(result) {
		//Stops countdown...
		trivia.stopCountdown();

		$('.show-question, .timer').empty();

		if (result == 'correct') {
			$('.show-question').append('<h2>Correct!</h2>');
		}
		else if (result == 'incorrect') {
			$('.show-question').append('<h2>Incorrect!</h2>');
		}
		else if (result == 'timeOut') {
			$('.show-question').append('<h2>Oh No! You ran out of time!</h2>');
		}

     $('.show-question').append('<div style="text-align: center;">Correct Answer: ' + trivia.questions[number].correct + '.</div><br>');
		$('.show-question').append('<div class="results-img"><img src="assets/images/' + trivia.questions[number].img + '" alt="' + trivia.questions[number].correct + '"></div>');

		setTimeout(trivia.nextQuestion,4000);
	},

	//Reset 'show-question' area, display next question by calling trivia.game(), and reset timer
	nextQuestion: function() {
		trivia.stopCountdown();
		$('.show-question').empty();
		trivia.questionNumber++;
		trivia.game();
	},

	//Ends game and display stats
	endGame: function() {
		$('.timer').empty();
		$('.show-question').append('<h2>Done (just like the series).</h2>');
		$('.show-question').append('<h3>Correct: ' + trivia.correct + '</h3>');
		$('.show-question').append('<h3>Incorrect: ' + trivia.incorrect + '</h3>');
		$('.show-question').append('<h3>Timed Out: ' + trivia.timeOut + '</h3>');
		$('.button').html('<div class="reset-game"><button type="button" class="btn btn-primary" id="reset-game">Another Round?</button></div>');
		
		//Researching how to make a gif appear...maybe toggle?
		$('.img').html('../images/finale2.gif');

		//Onclick event for 'another round?' button
		$('#reset-game').click(function() {
			trivia.resetGame();
		});
	},

	resetGame: function() {
		//Reset variables
		trivia.correct = 0;
		trivia.incorrect = 0;
		trivia.missed = 0;
		trivia.questionNumber = 0;

		//Removes 'show-question' and 'button' areas and calls game()
		$('.show-question, .button').empty();
		trivia.game();
	}
};

window.onload = function(){
	//When 'start game' button is clicked
	$('#start-game').on('click', function() {
		//Begin game
		trivia.game();

		//Removes intro 'p', 'image' & 'button'
		$('#start-game').remove();
		$ ('#intro').remove();


	});
};

//Theme Music (Still researching a fix//
/* $('#play_audio').click(function () {                     
           var times = 4;
           var loop = setInterval(repeat, 500);

       function repeat() {
           times--;
           if (times === 0) {
               clearInterval(loop);
           }

           var audio = document.createElement("audio");
           audio.src = "SATCMovieTunes.mp3";


           audio.play();
       }

       repeat();           
   });  */

// Music!!!
var music = new Audio('assets/images/SATCMovieTunes.mp3');
music.play();
music.volume = 0.3;