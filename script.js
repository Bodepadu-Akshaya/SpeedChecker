const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'apple', 'banana', 'cherry', 'grape', 'orange', 'mango', 'python',
  'laptop', 'keyboard', 'monitor', 'rocket', 'wizard', 'storm',
  'lightning', 'forest', 'river', 'mountain', 'planet', 'ocean',
  'castle', 'pirate', 'turtle', 'pencil', 'coffee', 'camera'
];

let randomWord;
let score = 0;
let time = 60;

let difficulty = localStorage.getItem('difficulty') || 'medium';
difficultySelect.value = difficulty;

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function updateTime() {
  time--;
  timeEl.innerText = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time's up!</h1>
    <p>Your final score is <strong>${score}</strong></p>
    <button onclick="location.reload()">Play Again</button>
  `;
  endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', (e) => {
  const insertedText = e.target.value.trim();

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';

    time += difficulty === 'hard' ? 2 : difficulty === 'medium' ? 4 : 6;
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
