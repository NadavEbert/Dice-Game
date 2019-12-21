var scores, currentScore, currentPlayer, dice, domDice;
currentPlayer = 0;
currentScore = 0;
scores = [ 0, 0 ];
var domDice = document.querySelector('.dice-img');

document.querySelector('.btn-roll').addEventListener('click', function() {
	roll();
	showDice();
	if (dice > 1) {
		currentScore += dice;
		manipulateDom('addCurrentScore');
	} else {
		currentScore = 0;
		scores[currentPlayer] = 0;
		manipulateDom(' ');
		switchCurrentPlayer();
	}
});

function roll() {
	dice = Math.floor(Math.random() * 6) + 1;
	console.log(dice);
}

document.querySelector('.btn-hold').addEventListener('click', function() {
	scores[currentPlayer] += currentScore;
	manipulateDom('switchPlayer');
	switchCurrentPlayer();
	currentScore = 0;
});

function manipulateDom(action) {
	var domScore = document.querySelector('.active .player-score');
	var domCurrentScore = document.querySelector('.active .score');
	if (action === 'addCurrentScore') {
		domCurrentScore.textContent = currentScore;
	} else if (action === 'switchPlayer') {
		domScore.textContent = scores[currentPlayer];
		domCurrentScore.textContent = '0';
		//domScore.style.animationName = 'pop-score';
		animateScore();
		setTimeout(function() {
			console.log('hey');
			hideDice();
		}, 1000);
		reset();
	} else {
		domScore.textContent = '0';
		domCurrentScore.textContent = '0';
		animateScore();
		hideDice();
		reset();
	}

	function animateScore() {
		var animatedScore = domScore;
		animatedScore.classList.add('animate');
		console.log(animatedScore);

		setTimeout(function() {
			console.log(animatedScore);
			animatedScore.classList.remove('animate');
			console.log('works');
		}, 1500);
	}
}

function switchCurrentPlayer() {
	currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
}

function reset() {
	var domPlayer = document.querySelectorAll('.container-player');
	domPlayer[0].classList.toggle('active');
	domPlayer[1].classList.toggle('active');
}
function showDice() {
	domDice.style.display = 'block';
	domDice.innerHTML = '<img src="img/dice-' + dice + '.png" alt="image of rolled dice">';
}
function hideDice() {
	domDice.style.display = 'none';
}
