
document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const restartButton = document.getElementById('restart');

  const cards = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥭', '🍎', '🍌', '🍇', '🍓', '🍍', '🥭'];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  function shuffleCards() {
      return cards.sort(() => Math.random() - 0.5);
  }

  function createCardElement(cardValue) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <div class="card-inner">
              <div class="card-front">${cardValue}</div>
              <div class="card-back"></div>
          </div>
      `;
      card.addEventListener('click', () => flipCard(card));
      return card;
  }


  
  function initializeGame() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffleCards();
    shuffledCards.forEach(cardValue => {
        const card = createCardElement(cardValue);
        gameBoard.appendChild(card);
    });
}


  function flipCard(card) {
      if (lockBoard || card === firstCard) return;

      card.classList.add('flipped');
      if (!firstCard) {
          firstCard = card;
          return;
      }

      secondCard = card;
      checkForMatch();
  }

  function checkForMatch() {
      lockBoard = true;
      const isMatch = firstCard.innerText === secondCard.innerText;

      setTimeout(() => {
          if (isMatch) {
              firstCard.removeEventListener('click', flipCard);
              secondCard.removeEventListener('click', flipCard);
          } else {
              firstCard.classList.remove('flipped');
              secondCard.classList.remove('flipped');
          }
          resetBoardState();
      }, 1000);
  }

  function resetBoardState() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
  }

  restartButton.addEventListener('click', initializeGame);

  initializeGame();
});

