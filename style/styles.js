// Set of colours
const colors = [
    '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF'
];

// Initialise score and elements
let score = 0;
let targetColor;

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector('[data-testid="colorOption');
const gameStatusElement = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameBtn = document.querySelector('[data-testid="newGameButton"]');

// Let set the utility function here...
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//shuffle the colours at every round
function generateNewRound() {
    const shuffled = shuffleArray([...colors]);
    targetColor = shuffled[Math.floor(Math.random() * shuffled.length)];
    return shuffled;
}

function renderColorOptions(options) {
    colorOptionsContainer.innerHTML = '';
    options.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-option';
        button.style.backgroundColor = color;
        button.dataset.testid = 'colorOption';
        button.dataset.color = color;
        button.addEventListener('click', handleColorClick);
        colorOptionsContainer.appendChild(button);
    });
}

function updateColorBox() {
    colorBox.style.backgroundColor = targetColor;
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Time to get an answer and hey congratulate them...
function handleColorClick(event) {
    const selectedColor = event.target.dataset.color;
    
    if (selectedColor === targetColor) {
        score++;
        updateScore();
        gameStatusElement.textContent = 'Correct! Well done!';
        gameStatusElement.style.color = '#2ecc71';
        
        const correctButton = event.target;
        correctButton.classList.add('celebrate');
       
        // Oya refresh for a set of new colours once the correct colour has been selected!
        setTimeout(() => {
            correctButton.classList.remove('celebrate');
            initGame();
        }, 500);
    } else {

        //stay and don't restart when a wrong colour is selected
        gameStatusElement.textContent = 'Wrong! Try again.';
        gameStatusElement.style.color = '#e74c3c';
        
        const wrongButton = event.target;
        wrongButton.classList.add('shake');
        setTimeout(() => wrongButton.classList.remove('shake'), 500);
    }
}

// Single initGame definition
function initGame() {
    const options = generateNewRound();
    renderColorOptions(options);
    updateColorBox();
    updateScore();
    gameStatusElement.textContent = '';
}

// Event listeners
newGameBtn.addEventListener('click', () => {
    score = 0;
    initGame();
});

// Initialise the gamebox and ready to play
initGame();