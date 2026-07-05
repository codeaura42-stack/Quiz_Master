const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const answerElement = document.getElementById("answer");
const nextButton = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");

let questions = [];
let currentIndex = 0;
let answerVisible = false;

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

    answerVisible = false;

    answerElement.textContent = "Correct Answer: ********";

    showAnswerBtn.textContent = "Show Answer";
}

showAnswerBtn.addEventListener("click", () => {

    const currentQuestion = questions[currentIndex];

    if (!answerVisible) {

        answerElement.textContent =
            "Correct Answer: " + currentQuestion.correct_answer;

        showAnswerBtn.textContent = "Hide Answer";

        answerVisible = true;

    } else {

        answerElement.textContent =
            "Correct Answer: ********";

        showAnswerBtn.textContent = "Show Answer";

        answerVisible = false;
    }

});

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