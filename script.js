var scores, currentScore, currentPlayer, dice, domDice, btnRoll, btnHold, btnNewGame, playerContainers;
initGame();
domDice = document.querySelector('.dice-img');
btnRoll = document.querySelector('.btn-roll');
btnHold = document.querySelector('.btn-hold');
btnNewGame = document.querySelector('.btn-new');
playerContainers = document.querySelectorAll('.container-player');
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
	initGame();
	if (!playerContainers[0].classList.contains('active')) {
		switchCurrentPlayer();
		switchCurrentPlayerDom();
	}
});

function manipulateDom(action) {
	showDice();
	var domScore = document.querySelector('.active .player-score');
	var domCurrentScore = document.querySelector('.active .score');
	if (action === 'addCurrentScore') {
		domCurrentScore.textContent = currentScore;
	} else if (action === 'hold') {
		domScore.textContent = scores[currentPlayer];
		domCurrentScore.textContent = '0';
		hideDice();
		animate(domScore);
		switchCurrentPlayerDom();
	} else if (action === 'winner') {
		var winnerH1 = document.querySelector('.active .player-name h1');
		winnerH1.textContent = 'winner!';
		document.querySelector('.active .dot').style.display = 'none';
		domScore.textContent = currentScore + scores[currentPlayer];
		domCurrentScore.textContent = '0';
		animate(domScore);
		disableButtons();
	} else {
		domScore.textContent = '0';
		domCurrentScore.textContent = '0';
		animate(domScore);
		setTimeout(hideDice, 1000);
		switchCurrentPlayerDom();
	}

	function animate(element) {
		element.classList.add('animate');

		setTimeout(function() {
			element.classList.remove('animate');
		}, 1500);
	}
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
function initGame() {
	currentPlayer = 0;
	currentScore = 0;
	scores = [ 0, 0 ];
	dice = 0;
}
