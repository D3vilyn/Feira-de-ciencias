const wordDisplay = document.getElementById('word-display');
const guessesDisplay = document.getElementById('guesses');
const keyboard = document.getElementById('keyboard');
const resetButton = document.getElementById('reset-button');

const words = [
    "ALGORITMO", "BACKEND", "COMPILADOR", "DADOS", "DESENVOLVEDOR",
    "FRAMEWORK", "FRONTEND", "GITHUB", "JAVASCRIPT", "LINGUAGEM",
    "NETWORK", "PROGRAMACAO", "SERVIDOR", "SOFTWARE", "TECNOLOGIA",
    "USUARIO", "VIRTUAL", "WEBHOOK", "API", "CLOUD", "DATABASE",
    "FIREWALL", "HTML", "HTTP", "KERNEL", "LINUX", "METODOLOGIA",
    "MOBILE", "NODEJS", "PYTHON", "REACT", "ROUTER", "SCRIPT",
    "SEGURANCA", "SQL", "SWIFT", "TYPESCRIPT", "UXUI", "VERSAO"
];
let chosenWord = '';
let guessedLetters = [];
let remainingGuesses = 6;

function chooseWord() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
    chooseWord();
    guessedLetters = [];
    remainingGuesses = 6;
    renderGame();
    createKeyboard();
}

function renderWord() {
    wordDisplay.innerHTML = chosenWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
}

function renderGuesses() {
    guessesDisplay.textContent = `Tentativas restantes: ${remainingGuesses}`;
}

function createKeyboard() {
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) { // ASCII for A-Z
        const letter = String.fromCharCode(i);
        const keyButton = document.createElement('button');
        keyButton.classList.add('key');
        keyButton.textContent = letter;
        keyButton.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(keyButton);
    }
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || remainingGuesses === 0) {
        return;
    }

    guessedLetters.push(letter);

    if (!chosenWord.includes(letter)) {
        remainingGuesses--;
    }

    renderGame();
    checkGameStatus();
    disableKey(letter);
}

function disableKey(letter) {
    const keyElement = Array.from(keyboard.children).find(key => key.textContent === letter);
    if (keyElement) {
        keyElement.disabled = true;
    }
}

function checkGameStatus() {
    const currentWord = chosenWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join('');

    if (currentWord.replace(/ /g, '') === chosenWord) {
        alert('Parabéns! Você ganhou!');
        disableKeyboard();
    } else if (remainingGuesses === 0) {
        alert(`Você perdeu! A palavra era: ${chosenWord}`);
        disableKeyboard();
    }
}

function disableKeyboard() {
    Array.from(keyboard.children).forEach(key => key.disabled = true);
}

function renderGame() {
    renderWord();
    renderGuesses();
}

resetButton.addEventListener('click', initializeGame);

initializeGame();
