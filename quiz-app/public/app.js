let currentQuestionIndex = 0;
let questions = [];

// Fetch quiz questions from the server when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions();
});

async function fetchQuestions() {
    const response = await fetch('http://localhost:5000/api/quiz');
    questions = await response.json();

    // Shuffle questions to display them in random order
    questions = shuffleArray(questions);

    showQuestion(currentQuestionIndex);
}

// Shuffle function to randomize question order
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

function showQuestion(index) {
    if (index >= questions.length) {
        // Quiz is completed
        document.getElementById('quiz-box').innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>You have answered all the questions!</p>
            <button id="restart-quiz" onclick="restartQuiz()">Restart Quiz</button>
        `;
        return;
    }

    const question = questions[index];
    document.getElementById('question').innerText = question.question;
    document.getElementById('option1').innerText = question.options[0];
    document.getElementById('option2').innerText = question.options[1];
    document.getElementById('option3').innerText = question.options[2];
    document.getElementById('option4').innerText = question.options[3];
    document.getElementById('result').innerText = '';

    // Reset button styles for the next question
    resetButtonStyles();

    // Hide the "Next Question" button until an answer is selected
    document.getElementById('next-button').style.display = 'none';
}

function resetButtonStyles() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('green', 'red');
        option.disabled = false; // Enable buttons again
    });
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    const selectedButton = document.getElementById(`option${selectedOption}`);
    const selectedAnswer = selectedButton.innerText;

    // Disable all options after selection
    disableOptions();

    if (selectedAnswer === question.correctAnswer) {
        // Correct answer - Highlight in green
        selectedButton.classList.add("green");
        document.getElementById('result').innerText = 'Correct!';
        document.getElementById('result').classList.add('correct');
        document.getElementById('result').classList.remove('incorrect');
    } else {
        // Incorrect answer - Highlight selected in red and correct answer in green
        selectedButton.classList.add("red");
        highlightCorrectAnswer(question.correctAnswer);
        document.getElementById('result').innerText = 'Incorrect!';
        document.getElementById('result').classList.add('incorrect');
        document.getElementById('result').classList.remove('correct');
    }

    // Show the "Next Question" button after answer selection
    document.getElementById('next-button').style.display = 'block';
}

function highlightCorrectAnswer(correctAnswer) {
    for (let i = 1; i <= 4; i++) {
        const optionButton = document.getElementById(`option${i}`);
        if (optionButton.innerText === correctAnswer) {
            optionButton.classList.add("green");
        }
    }
}

function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true; // Disable options after selection
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        // End of quiz
        showQuestion(currentQuestionIndex); // This will trigger the quiz completion logic
    }
}

function restartQuiz() {
    // Reset quiz to start from the first question
    currentQuestionIndex = 0;

    // Restore the original quiz-box structure
    document.getElementById('quiz-box').innerHTML = `
        <h1>Quiz App</h1>
        <div id="question"></div>
        <div id="options">
            <button class="option" id="option1" onclick="checkAnswer(1)"></button>
            <button class="option" id="option2" onclick="checkAnswer(2)"></button>
            <button class="option" id="option3" onclick="checkAnswer(3)"></button>
            <button class="option" id="option4" onclick="checkAnswer(4)"></button>
        </div>
        <div id="result"></div>
        <button id="next-button" onclick="nextQuestion()" style="display: none;">Next Question</button>
    `;

    // Re-fetch questions and restart the quiz
    fetchQuestions();
}
