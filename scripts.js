const challenges = {
  symbols: {
    Parênteses: '()',
    Colchetes: '[]',
    Chaves: '{}',
  },
  currentChallenge: '()',
  lastIndex: -1,
  challengeDisplay: document.getElementById('challenge'),
  randomChallenge() {
    const { symbols } = challenges;
    const arrayOfChallenges = Object.keys(symbols);
    let randomIndex = Math.floor(Math.random() * 3);
    while(challenges.lastIndex === randomIndex) {
      randomIndex = Math.floor(Math.random() * 3);
    }
    const randomChallenge = arrayOfChallenges[randomIndex];
    const currentChallenge = challenges.symbols[randomChallenge];

    challenges.currentChallenge = currentChallenge;
    challenges.lastIndex = randomIndex;
    challenges.challengeDisplay.style.transform = 'scale(1)'

    challenges.challengeDisplay.textContent = challenges.currentChallenge;

    return currentChallenge;
  }
};

const game = {
  score: 0,
  fails: 0,
  scoreDisplay: document.getElementById('score'),
  failDisplay: document.getElementById('fails'),
  gameOverScreen: document.getElementById('game-over'),
  scoreGameOver: document.getElementById('score-gameover'),
  restartButton: document.getElementById('restart'),
  gameOver() {
    const score = Number(game.scoreDisplay.textContent);
    game.gameOverScreen.classList.remove('hidden');
    if (score === 1) game.scoreGameOver.textContent = `'Você acertou apenas uma vez :('`
    else game.scoreGameOver.textContent = `'Você acertou ${score} vezes!'`
  },
  gameOption(button) {
    const score = document.getElementById('score');
    const fails = document.getElementById('fails');
    button.addEventListener('click', () => {
      let option = button.textContent;
      option = challenges.symbols[option];
      if (option === challenges.currentChallenge) {
        score.textContent = Number(score.textContent) + 1;
      } else {
        game.fails += 1;
        fails.textContent = Number(fails.textContent) + 1;
      }

      if (game.fails >= 10) {
        game.gameOver();
      }

      challenges.challengeDisplay.style.transform = 'scale(0)'
      setTimeout(() => {
        challenges.randomChallenge();
      }, 100)

    })
  },
  restartGame() {
    game.fails = 0;
    game.score = 0;
    game.gameOverScreen.classList.toggle('hidden');
    game.scoreDisplay.textContent = game.score;
    game.failDisplay.textContent = game.fails;
  },
  startGame() {
    const { randomChallenge } = challenges;
    randomChallenge();

    const groupOfOptions = document.getElementById('options');
    groupOfOptions.childNodes.forEach((button) => game.gameOption(button));
    game.restartButton.onclick = game.restartGame;
  }
}


window.onload = game.startGame();