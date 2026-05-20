/**
 * ============================================
 * NCERT QUIZ PLATFORM - MAIN APPLICATION
 * ============================================
 * Handles all navigation, quiz logic, and state management
 */

// ============================================
// STATE MANAGEMENT
// ============================================
const appState = {
    currentScreen: 'home',
    selectedClass: null,
    selectedSubject: null,
    currentQuestion: 0,
    userAnswers: {},
    answeredQuestions: {},
    quizStarted: false,
    quizQuestions: [],
    score: 0,
    attemptedQuestions: 0
};

// ============================================
// SCREEN NAVIGATION
// ============================================
function switchScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        appState.currentScreen = screenName;

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================
// HOME SCREEN LOGIC
// ============================================
document.getElementById('start-quiz-btn')?.addEventListener('click', () => {
    initializeClassSelection();
    switchScreen('class-selection');
});

// ============================================
// CLASS SELECTION LOGIC
// ============================================
function initializeClassSelection() {
    const classesGrid = document.getElementById('classes-grid');
    classesGrid.innerHTML = '';

    // Get available classes from quizDatabase
    const availableClasses = Object.keys(quizDatabase).map(Number).sort((a, b) => a - b);

    availableClasses.forEach(classNum => {
        const btn = document.createElement('button');
        btn.className = 'class-btn';
        btn.textContent = `Class ${classNum}`;
        btn.addEventListener('click', () => selectClass(classNum, btn));
        classesGrid.appendChild(btn);
    });
}

function selectClass(classNum, btnElement) {
    // Update active state
    document.querySelectorAll('.class-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Store selection and proceed
    appState.selectedClass = classNum;
    initializeSubjectSelection(classNum);
    switchScreen('subject-selection');
}

// ============================================
// SUBJECT SELECTION LOGIC
// ============================================
function initializeSubjectSelection(classNum) {
    const subjectsGrid = document.getElementById('subjects-grid');
    const header = document.getElementById('selected-class-display');
    subjectsGrid.innerHTML = '';
    header.textContent = `Class ${classNum}`;

    // Define subjects available in quizDatabase
    const availableSubjects = Object.keys(quizDatabase[classNum] || {});

    // Subject icons for visual appeal
    const subjectIcons = {
        'Physics': '⚛️',
        'Chemistry': '🧪',
        'Mathematics': '📐',
        'Biology': '🔬',
        'English': '📚',
        'History': '📜',
        'Geography': '🗺️',
        'Science': '🔭'
    };

    availableSubjects.forEach(subject => {
        const btn = document.createElement('button');
        btn.className = 'subject-btn';
        btn.innerHTML = `
            <span class="subject-icon">${subjectIcons[subject] || '📖'}</span>
            <span>${subject}</span>
        `;
        btn.addEventListener('click', () => selectSubject(classNum, subject));
        subjectsGrid.appendChild(btn);
    });
}

function selectSubject(classNum, subject) {
    appState.selectedClass = classNum;
    appState.selectedSubject = subject;
    appState.quizQuestions = quizDatabase[classNum][subject];
    appState.userAnswers = {};
    appState.answeredQuestions = {};
    appState.currentQuestion = 0;
    appState.score = 0;
    appState.attemptedQuestions = 0;
    appState.quizStarted = true;

    initializeQuiz();
    switchScreen('quiz');
}

// ============================================
// QUIZ INITIALIZATION & RENDERING
// ============================================
function initializeQuiz() {
    const quizTitle = document.getElementById('quiz-title');
    quizTitle.textContent = `${appState.selectedSubject} - Class ${appState.selectedClass}`;

    renderQuestion();
    updateProgress();
}

function renderQuestion() {
    const question = appState.quizQuestions[appState.currentQuestion];
    const questionNumber = appState.currentQuestion + 1;

    // Update question info
    document.getElementById('question-number').textContent = `Question ${questionNumber}`;
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('progress-text').textContent = `Question ${questionNumber} of ${appState.quizQuestions.length}`;
    document.getElementById('question-indicator').textContent = `${questionNumber}/${appState.quizQuestions.length}`;

    // Clear and render options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.dataset.optionIndex = index;

        // Check if this option was previously selected
        if (appState.userAnswers[appState.currentQuestion] !== undefined) {
            const selectedIndex = appState.userAnswers[appState.currentQuestion];
            if (selectedIndex === index) {
                optionBtn.classList.add('selected');
            }

            // If answered, show correct/incorrect states
            if (question.correctOption === index) {
                optionBtn.classList.add('correct');
            } else if (selectedIndex === index) {
                optionBtn.classList.add('incorrect');
            }

            // Disable all options after selection
            optionBtn.style.pointerEvents = 'none';
            optionBtn.style.opacity = '0.8';
        } else {
            optionBtn.addEventListener('click', () => selectOption(index));
        }

        optionsContainer.appendChild(optionBtn);
    });

    // Update navigation buttons
    updateNavigationButtons();
    updateProgress();
}

function selectOption(optionIndex) {
    const question = appState.quizQuestions[appState.currentQuestion];
    const optionBtns = document.querySelectorAll('.option-btn');

    // Store the answer
    appState.userAnswers[appState.currentQuestion] = optionIndex;

    // Remove previous selections
    optionBtns.forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });

    // Add feedback
    const selectedBtn = optionBtns[optionIndex];
    selectedBtn.classList.add('selected');

    // Check if correct
    if (optionIndex === question.correctOption) {
        selectedBtn.classList.add('correct');
        if (!appState.answeredQuestions[appState.currentQuestion]) {
            appState.score++;
            appState.answeredQuestions[appState.currentQuestion] = true;
        }
    } else {
        selectedBtn.classList.add('incorrect');
        // Also show the correct answer
        optionBtns[question.correctOption].classList.add('correct');
    }

    // Disable all options after selection
    optionBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.8';
    });
}

function updateNavigationButtons() {
    const totalQuestions = appState.quizQuestions.length;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Previous button
    prevBtn.disabled = appState.currentQuestion === 0;
    prevBtn.onclick = () => goToPreviousQuestion();

    // Next button
    if (appState.currentQuestion === totalQuestions - 1) {
        nextBtn.textContent = 'Submit Quiz →';
        nextBtn.onclick = () => submitQuiz();
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = () => goToNextQuestion();
    }
}

function goToNextQuestion() {
    if (appState.currentQuestion < appState.quizQuestions.length - 1) {
        appState.currentQuestion++;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToPreviousQuestion() {
    if (appState.currentQuestion > 0) {
        appState.currentQuestion--;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const totalQuestions = appState.quizQuestions.length;
    const progress = ((appState.currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

// ============================================
// QUIZ SUBMISSION & RESULTS
// ============================================
function submitQuiz() {
    const totalQuestions = appState.quizQuestions.length;
    const percentage = Math.round((appState.score / totalQuestions) * 100);

    // Store results
    const results = {
        score: appState.score,
        total: totalQuestions,
        percentage: percentage,
        subject: appState.selectedSubject,
        class: appState.selectedClass
    };

    displayResults(results);
    switchScreen('results');
}

function displayResults(results) {
    const scoreNumber = document.getElementById('score-number');
    const correctCount = document.getElementById('correct-count');
    const accuracyPercent = document.getElementById('accuracy-percent');
    const totalCount = document.getElementById('total-count');
    const resultsTitle = document.getElementById('results-title');
    const resultsMessage = document.getElementById('results-message');

    scoreNumber.textContent = results.percentage;
    correctCount.textContent = results.score;
    accuracyPercent.textContent = results.percentage + '%';
    totalCount.textContent = results.total;

    // Dynamic messaging based on performance
    if (results.percentage >= 80) {
        resultsTitle.textContent = '🎉 Excellent Performance!';
        resultsMessage.textContent = 'Outstanding! You have mastered this topic.';
    } else if (results.percentage >= 60) {
        resultsTitle.textContent = '✨ Good Job!';
        resultsMessage.textContent = 'Nice work! Keep practicing to improve further.';
    } else if (results.percentage >= 40) {
        resultsTitle.textContent = '👍 Keep Practicing!';
        resultsMessage.textContent = 'Good effort! Review the topics and try again.';
    } else {
        resultsTitle.textContent = '📚 Let\'s Learn More!';
        resultsMessage.textContent = 'Don\'t worry! Practice makes perfect. Try again!';
    }

    // Animate score circle
    animateScoreCircle(results.percentage);
}

function animateScoreCircle(percentage) {
    const circle = document.getElementById('score-circle');
    circle.style.animation = 'none';
    setTimeout(() => {
        circle.style.animation = 'popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 10);
}

// ============================================
// RESULTS SCREEN ACTIONS
// ============================================
document.getElementById('restart-btn')?.addEventListener('click', () => {
    appState.quizStarted = false;
    appState.currentQuestion = 0;
    appState.selectedSubject = null;
    appState.userAnswers = {};
    appState.answeredQuestions = {};
    appState.score = 0;
    initializeSubjectSelection(appState.selectedClass);
    switchScreen('subject-selection');
});

document.getElementById('home-btn')?.addEventListener('click', () => {
    appState.quizStarted = false;
    appState.currentQuestion = 0;
    appState.selectedClass = null;
    appState.selectedSubject = null;
    appState.userAnswers = {};
    appState.answeredQuestions = {};
    appState.score = 0;
    switchScreen('home');
});

// ============================================
// QUIT BUTTON
// ============================================
document.getElementById('quit-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to quit this quiz? Your progress will be lost.')) {
        appState.quizStarted = false;
        appState.currentQuestion = 0;
        appState.userAnswers = {};
        appState.answeredQuestions = {};
        appState.score = 0;
        switchScreen('home');
    }
});

// ============================================
// BACK BUTTONS
// ============================================
document.getElementById('back-from-class')?.addEventListener('click', () => {
    switchScreen('home');
});

document.getElementById('back-from-subject')?.addEventListener('click', () => {
    initializeClassSelection();
    switchScreen('class-selection');
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (event) => {
    if (!appState.quizStarted) return;

    if (event.key === 'ArrowRight' && appState.currentQuestion < appState.quizQuestions.length - 1) {
        goToNextQuestion();
    } else if (event.key === 'ArrowLeft' && appState.currentQuestion > 0) {
        goToPreviousQuestion();
    }
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ NCERT Quiz Platform loaded successfully');
    console.log('Available classes:', Object.keys(quizDatabase).map(Number).sort((a, b) => a - b));
    const totalQuestions = Object.values(quizDatabase).reduce((sum, cls) => {
        return sum + Object.values(cls).reduce((subSum, questions) => subSum + questions.length, 0);
    }, 0);
    console.log('Total questions in database:', totalQuestions);
    console.log('Ready to use! Click "Start Quiz Now" to begin.');
});