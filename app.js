const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const btnRoll = document.querySelector('.btn-roll');
const imgDice = document.querySelector('.dice');

const playerOne = document.querySelector('.player-0-panel');
const playerTwo = document.querySelector('.player-1-panel');

const player = {
   player1: {
      global: 0,
      current: 0,
      active: true
   },
   player2: {
      global: 0,
      current: 0,
      active: false
   }
}
let finished = false;

function switchPlayer() {
   player.player1.active = !player.player1.active;
   player.player2.active = !player.player2.active;

   player.player1.active ? playerOne.classList.add('active') : playerOne.classList.remove('active');
   player.player2.active ? playerTwo.classList.add('active') : playerTwo.classList.remove('active');
}

function updateScore() {
   document.querySelector(`#current-0`).innerHTML = player.player1.current;
   document.querySelector(`#score-0`).innerHTML = player.player1.global;
   document.querySelector(`#current-1`).innerHTML = player.player2.current;
   document.querySelector(`#score-1`).innerHTML = player.player2.global;

   if (player.player1.global > 3) {
      document.querySelector(`#name-0`).innerHTML = 'WINNER!';
      finished = true;
      btnRoll.removeEventListener('click', rollDice);
      btnHold.removeEventListener('click', holdAmount);
   }

   if (player.player2.global > 99) {
      document.querySelector(`#name-1`).innerHTML = 'WINNER!';
      finished = true;
      btnRoll.removeEventListener('click', rollDice);
      btnHold.removeEventListener('click', holdAmount);
   }
}

function rollDice() {
   let activePlayer;
   if (player.player1.active) {
      activePlayer = player.player1;
   } else {
      activePlayer = player.player2;
   }

   const dice = Math.floor(Math.random() * Math.floor(5)) + 1;
   if (dice === 1) {
      activePlayer.current = 0;
      switchPlayer();
   } else {
      activePlayer.current += dice;
   }
   imgDice.src = `dice-${dice}.png`;
   updateScore();
}

function holdAmount() {
   player.player1.global += player.player1.current;
   player.player1.current = 0;
   player.player2.global += player.player2.current;
   player.player2.current = 0;
   updateScore();
   finished ? '' : switchPlayer();
}

function renderNewGame() {
   player.player1.global = 0;
   player.player1.current = 0;
   player.player2.global = 0;
   player.player2.current = 0;
   finished = false;
   document.querySelector(`#name-0`).innerHTML = 'Player 1';
   document.querySelector(`#name-1`).innerHTML = 'Player 2';
   btnRoll.addEventListener('click', rollDice);
   btnHold.addEventListener('click', holdAmount);
   updateScore();
}

btnNew.addEventListener('click', renderNewGame);
window.onload = renderNewGame;