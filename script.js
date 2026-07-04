const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const answerElement = document.getElementById("answer");
const nextButton = document.getElementById("nextBtn");

let questions = [];
let currentIndex = 0;

// Load questions from JSON
fetch("quiz_questions_500_plus.json")
    .then(response => response.json())
    .then(data => {
        questions = shuffleArray(data); // Shuffle questions once
        showQuestion();
    })
    .catch(error => {
        console.error("Error loading questions:", error);
    });

// Display the current question
function showQuestion() {

    if (currentIndex >= questions.length) {
        // All questions have been shown
        questions = shuffleArray(questions);
        currentIndex = 0;
    }

    const currentQuestion = questions[currentIndex];

    questionElement.textContent = currentQuestion.question;

    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
    });

    answerElement.textContent = "Correct Answer: " + currentQuestion.correct_answer;
}

// Next button
nextButton.addEventListener("click", () => {
    currentIndex++;
    showQuestion();
});

// Fisher-Yates Shuffle
function shuffleArray(array) {

    let newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}