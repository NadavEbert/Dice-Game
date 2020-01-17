var scores,
	holds,
	holdValue,
	nodeText,
	currentScore,
	currentPlayer,
	dice,
	domDice,
	btnRoll,
	btnHold,
	btnNewGame,
	playerContainers,
	finalScore,
	gameIsPlaying,
	domScores,
	domCurrentScores,
	domFinalScore,
	domRules,
	domExitRules,
	mainContainer,
	rulesContainer,
	domDotContainers,
	domDots,
	node,
	DEFAULT_FINAL_VALUE,
	HOLD_COUNT;
DEFAULT_FINAL_VALUE = 50;
HOLD_COUNT = 3;

domDice = document.querySelector('.dice-img');
btnRoll = document.querySelector('.btn-roll');
btnHold = document.querySelector('.btn-hold');
btnNewGame = document.querySelector('.btn-new');
playerContainers = document.querySelectorAll('.container-player');
domScores = document.querySelectorAll('.player-score');
domCurrentScores = document.querySelectorAll('.score');
domFinalScoreInput = document.getElementById('final-score');
domDots = document.querySelectorAll('.dot');
domRules = document.querySelector('.info');
domExitRules = document.querySelector('.exit');
mainContainer = document.querySelector('.main-container');
rulesContainer = document.querySelector('.container-rules');

initGame();
function containerToggler() {
	rulesContainer.classList.toggle('visible');
	rulesContainer.classList.toggle('invisible');
	mainContainer.classList.toggle('visible');
	mainContainer.classList.toggle('invisible');
}
function buttonAndDiceToggler() {
	document.querySelectorAll('.float').forEach(element => {
		element.classList.toggle('invisible');
		element.classList.toggle('visible');
	});
	if (domDice.style.display === 'block') {
		domDice.classList.toggle('visible');
		domDice.classList.toggle('invisible');
	}

}
domRules.addEventListener('click', function () {

	setTimeout(function () {
		mainContainer.style.display = 'none';
		rulesContainer.style.display = 'flex';
	}, 250);
	document.querySelectorAll('.float').forEach(element => {
		element.style.display = 'none';
	});
	buttonAndDiceToggler();
	containerToggler();
})

domExitRules.addEventListener('click', function () {

	setTimeout(function () {
		mainContainer.style.display = 'flex';
		rulesContainer.style.display = 'none';
	}, 250);

	setTimeout(function () {
		document.querySelectorAll('.float').forEach(element => {
			element.style.display = 'flex';
		});
		buttonAndDiceToggler();
	}, 400);

	containerToggler();
})

btnRoll.addEventListener('click', function () {
	finalScore = domFinalScoreInput.value;

	if (!finalScore) {
		finalScore = DEFAULT_FINAL_VALUE;
		domFinalScoreInput.value = DEFAULT_FINAL_VALUE;
	} else if (!gameIsPlaying) {
		finalScore = domFinalScoreInput.value;
		domFinalScoreInput.value = finalScore;
	}

	domFinalScoreInput.disabled = true;
	gameIsPlaying = true;
	holdValue = Math.floor(finalScore / 10);

	if (!btnHold.textContent.includes('+')) {
		nodeText = ' (+' + holdValue + ')';
		node = document.createTextNode(nodeText);
		//	btnHold.removeChild(node);
		btnHold.appendChild(node);
	}

	console.log('final score: ' + finalScore);
	roll();

	if (dice > 1) {
		currentScore += dice;
		if (currentScore + scores[currentPlayer] >= finalScore) {
			manipulateDom('winner');
		} else
			manipulateDom('addCurrentScore');
	} else {
		currentScore = 0;
		scores[currentPlayer] = 0;
		manipulateDom(' ');
		switchCurrentPlayer();
	}
});

btnHold.addEventListener('click', function () {
	if (holds[currentPlayer] > 0 && currentScore > 0) {

		if (scores[currentPlayer] + currentScore + holdValue >= finalScore) {
			//currentScore += holdValue;
			//manipulateDom('winner');
			//----insert message here-----
			return;
		}
		console.log('entered hold scope')
		scores[currentPlayer] += currentScore + holdValue;
		holds[currentPlayer]--;
		console.log('hold count: ' + holds[currentPlayer]);
		manipulateDom('hold');
		switchCurrentPlayer();
		currentScore = 0;

	}
});

btnNewGame.addEventListener('click', function () {
	manipulateDom('new game');
	initGame();
});

function manipulateDom(action) {
	showDice();
	var activeDomScore = document.querySelector('.active .player-score');
	var activeDomCurrentScore = document.querySelector('.active .score');
	var activeH1 = document.querySelector('.active .player-name h1');
	var activeDomDots = document.querySelectorAll('.active .dot');

	if (action === 'addCurrentScore') {
		activeDomCurrentScore.textContent = currentScore;
	} else if (action === 'hold') {
		activeDomScore.textContent = scores[currentPlayer];
		activeDomCurrentScore.textContent = '0';


		var holdsToRemove = HOLD_COUNT - holds[currentPlayer];
		for (var i = 0; i < holdsToRemove; i++) {
			if (activeDomDots[HOLD_COUNT - i - 1].classList.contains('hold'))
				activeDomDots[HOLD_COUNT - i - 1].classList.remove('hold');
		}
		hideDice();
		animate(activeDomScore);
		switchCurrentPlayerDom();
	} else if (action === 'winner') {
		activeH1.textContent = 'winner!';
		activeDomDots.forEach((dot) => {
			dot.style.display = 'none';
		});

		activeDomScore.textContent = currentScore + scores[currentPlayer];
		activeDomCurrentScore.textContent = '0';
		animate(activeDomScore);
		disableButtons();

	} else if (action === 'new game') {
		activeH1.textContent = 'player ' + (currentPlayer + 1);
		if (btnHold.textContent.includes('+')) btnHold.removeChild(node);
		if (!playerContainers[0].classList.contains('active')) {
			switchCurrentPlayerDom();
		}
		domScores.forEach((score) => {
			score.textContent = '0';
		});
		domCurrentScores.forEach((score) => {
			score.textContent = '0';
		});
		activeDomDots.forEach((dot) => {
			dot.style.display = 'block';
		});
		activateButtons();
		hideDice();
		initGame();
	} else {
		activeDomScore.textContent = '0';
		activeDomCurrentScore.textContent = '0';
		animate(activeDomScore);

		switchCurrentPlayerDom();
	}
}

function animate(element) {
	element.classList.add('animate');
	setTimeout(function () {
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
	domDice.classList.add('float');
	domDice.innerHTML = '<img src="img/dice-' + dice + '.png" alt="image of rolled dice">';
}
function hideDice() {
	domDice.style.display = 'none';
}
function roll() {
	dice = Math.floor(Math.random() * 6) + 1;
	console.log('roll: ' + dice);
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
	scores = [0, 0];
	holds = [HOLD_COUNT, HOLD_COUNT];
	dice = 0;
	gameIsPlaying = false;
	domDice.classList.remove('float');
	domFinalScoreInput.disabled = false;
	domDots.forEach((dot) => {
		for (var i = 0; i < HOLD_COUNT * 2; i++) dot.classList.add('hold');
	});
}
