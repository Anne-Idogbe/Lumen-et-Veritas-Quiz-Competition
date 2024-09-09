document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');
    const quizSection = document.getElementById('quiz-section');
    const registrationSection = document.getElementById('registration-section');
    const schoolInfo = document.getElementById('school-info');
    const studentInfo = document.getElementById('student-info');
    const questionText = document.getElementById('question-text');
    const timerDisplay = document.getElementById('time-display');
    const quizForm = document.getElementById('quiz-form');
    const resultModal = document.getElementById('result-modal');
    const closeModalButton = document.getElementById('close-modal');

    const questions = [
        {
            question: "What is the name of the tallest mountain in Africa?",
            options: ["Kilimanjaro", "Ararat", "Everest", "Mount Olive"],
            answer: 0
        },
        {
            question: "What Country hosted the 2024 Olympic Games?",
            options: ["Germany", "France", "Spain", "Nigeria"],
            answer: 1
        },
        {
            question: "What planet is the Largest Planet?",
            options: ["Venus", "Jupiter", "Mars", "Saturn"],
            answer: 1
        },
        {
            question: "Which ocean is the largest?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: 3
        },
        {
            question: "Who wrote 'Harry Porter'?",
            options: ["J.K. Rowling", "William Shakespeare", "Mark Twain", "Charles Dickens"],
            answer: 0
        },
        {
            question: "What is the chemical symbol for Sodium Hydroxide?",
            options: ["H2O", "NaOH", "CO2", "He"],
            answer: 1
        },
        {
            question: "How many Countries are in Africa?",
            options: ["45", "64", "54", "60"],
            answer: 2
        },
        {
            question: "What Animal is refered to as the King of the Jungle?",
            options: ["Elephant", "Lion", "Leopard", "Tiger"],
            answer: 1
        },
        {
            question: "An Octopus has how many Tentacles?",
            options: ["6", "4", "8", "2"],
            answer: 2
        },
        {
            question: "What is the longest river in the World?",
            options: ["Congo", "Amazon", "Nile", "Zambezi"],
            answer: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 120; // Timer set for 2 minutes (120 seconds)
    let timerInterval;


    // Form validation error handling
    function showError(inputId, errorId, message) {
        document.getElementById(inputId).classList.add('border-red-500');
        const errorMessage = document.getElementById(errorId);
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError(errorId) {
        const errorMessage = document.getElementById(errorId);
        errorMessage.classList.add('hidden');
    }


    // Handle Registration
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const schoolName = document.getElementById('schoolName').value.trim();
        const studentName = document.getElementById('studentName').value.trim();

        // Validation
        let valid = true;

        if (schoolName === '') {
            showError("schoolName", 'school-name-error', 'School Name cannot be empty.');
            valid = false;
        } else {
            hideError('school-name-error');
        }

        if (studentName === '') {
            showError("studentName", 'student-name-error', 'Student Name cannot be empty.');
            valid = false;
        } else {
            hideError('student-name-error');
        }

        if (!valid) return; // Stop form submission if validation fails

        // Save registration details to local storage
        schoolInfo.textContent = schoolName;
        studentInfo.textContent = studentName;

        // Hide registration and show quiz section
        registrationSection.classList.add('hidden');
        quizSection.classList.remove('hidden');

        startQuiz();
    });

    // Start the quiz
    function startQuiz() {
        loadQuestion();
        startTimer();
    }

    // Load current question
    function loadQuestion() {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        document.getElementById('label1').textContent = question.options[0];
        document.getElementById('label2').textContent = question.options[1];
        document.getElementById('label3').textContent = question.options[2];
        document.getElementById('label4').textContent = question.options[3];
    }

    // Handle quiz submission
    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            if (answerIndex === questions[currentQuestion].answer) {
                score++;
            }

            // Move to next question or end quiz
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
                resetAnswers();
            } else {
                endQuiz();
            }
        } else {
            alert('Please select an answer');
        }
    });

    // Timer function
    function startTimer() {
        timerInterval = setInterval(function () {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }

    // Reset selected answers after each question
    function resetAnswers() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            selectedAnswer.checked = false;
        }
    }

    // Reset quiz state
    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        timeLeft = 120; // Reset to initial 2 minutes
        clearInterval(timerInterval);
        resetAnswers();
        loadQuestion(); // Reload the first question
        timerDisplay.textContent = "2:00"; // Reset the timer display
    }

    // Reset the registration form
    function resetRegistrationForm() {
        registrationForm.reset(); // Clears the form fields
        schoolInfo.textContent = ''; // Clear stored school info
        studentInfo.textContent = ''; // Clear stored student info
        hideError('school-name-error');
        hideError('student-name-error');
    }

    // End the quiz and show results in a modal
    function endQuiz() {
        clearInterval(timerInterval);

        // Hide quiz section
        quizSection.classList.add('hidden');

        // Get the school name and participant name
        const schoolName = document.getElementById('school-info').textContent;
        const studentName = document.getElementById('student-info').textContent;

        // Calculate percentage score
        const percentageScore = ((score / questions.length) * 100).toFixed(2); // Limit to 2 decimal places

        // Display the score, school name, and participant name in the modal
        const finalScoreText = `${schoolName}, ${studentName}, you scored ${percentageScore}% (${score} out of ${questions.length})`;
        document.getElementById('final-score').textContent = finalScoreText;

        // Show the result modal
        resultModal.classList.remove('hidden');

        // Handle closing the modal
        closeModalButton.addEventListener('click', function () {
            resultModal.classList.add('hidden');

            // Hide quiz section, show registration section, and reset the registration form
            quizSection.classList.add('hidden');
            registrationSection.classList.remove('hidden');
            resetRegistrationForm(); // Clear and reset the registration form
        });
    }
});
