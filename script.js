var scores, currentScore, currentPlayer, dice, domDice, btnRoll, btnHold, btnNewGame, playerContainers, domScores;
initGame();
domDice = document.querySelector('.dice-img');
btnRoll = document.querySelector('.btn-roll');
btnHold = document.querySelector('.btn-hold');
btnNewGame = document.querySelector('.btn-new');
playerContainers = document.querySelectorAll('.container-player');
domScores = document.querySelectorAll('.player-score');
btnRoll.addEventListener('click', function() {
	roll();

	if (dice > 1) {
		currentScore += dice;
		if (currentScore + scores[currentPlayer] >= 20) {
			manipulateDom('winner');
		} else manipulateDom('addCurrentScore');
	} else {
		currentScore = 0;
		scores[currentPlayer] = 0;
		manipulateDom(' ');
		switchCurrentPlayer();
	}
});

btnHold.addEventListener('click', function() {
	scores[currentPlayer] += currentScore;
	manipulateDom('hold');
	switchCurrentPlayer();
	currentScore = 0;
});
btnNewGame.addEventListener('click', function() {
	manipulateDom('new game');
	initGame();
});

function manipulateDom(action) {
	showDice();
	var activeDomScore = document.querySelector('.active .player-score');
	var activeDomCurrentScore = document.querySelector('.active .score');
	var activeH1 = document.querySelector('.active .player-name h1');
	var activeDot = document.querySelector('.active .dot');
	if (action === 'addCurrentScore') {
		activeDomCurrentScore.textContent = currentScore;
	} else if (action === 'hold') {
		activeDomScore.textContent = scores[currentPlayer];
		activeDomCurrentScore.textContent = '0';
		hideDice();
		animate(activeDomScore);
		switchCurrentPlayerDom();
	} else if (action === 'winner') {
		activeH1.textContent = 'winner!';
		activeDot.style.display = 'none';
		activeDomScore.textContent = currentScore + scores[currentPlayer];
		activeDomCurrentScore.textContent = '0';
		animate(activeDomScore);
		disableButtons();
	} else if (action === 'new game') {
		activeH1.textContent = 'player ' + (currentPlayer + 1);
		if (!playerContainers[0].classList.contains('active')) {
			switchCurrentPlayerDom();
		}
		domScores.forEach((score) => {
			score.textContent = '0';
		});
		activeDot.style.display = 'block';
		activateButtons();
		hideDice();
	} else {
		activeDomScore.textContent = '0';
		activeDomCurrentScore.textContent = '0';
		animate(activeDomScore);
		setTimeout(hideDice, 1000);
		switchCurrentPlayerDom();
	}
}

function animate(element) {
	element.classList.add('animate');
	setTimeout(function() {
		element.classList.remove('animate');
	}, 1500);
}

function switchCurrentPlayer() {
	currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
}

function switchCurrentPlayerDom() {
	playerContainers[0].classList.toggle('active');
	playerContainers[1].classList.toggle('active');
}
function showDice() {
	domDice.style.display = 'block';
	domDice.innerHTML = '<img src="img/dice-' + dice + '.png" alt="image of rolled dice">';
}
function hideDice() {
	domDice.style.display = 'none';
}
function roll() {
	dice = Math.floor(Math.random() * 6) + 1;
	console.log(dice);
}
function disableButtons() {
	btnRoll.style.display = 'none';
	btnHold.style.display = 'none';
}
function activateButtons() {
	btnRoll.style.display = 'inherit';
	btnHold.style.display = 'inherit';
}

function initGame() {
	currentPlayer = 0;
	currentScore = 0;
	scores = [ 0, 0 ];
	dice = 0;
}
