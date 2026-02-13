// Moowre Python Learning Platform

// Question Bank - Categorized by topic
const QUESTION_BANK = {
    0: { // Lesson 0: Print & Variables
        title: "Print & Variables",
        category: "Python Basics",
        questions: [
            {
                type: 'multiple-choice',
                question: 'What will this code print?',
                code: 'print("Hello, World!")',
                choices: ['Hello, World!', '"Hello, World!"', 'print("Hello, World!")', 'SyntaxError'],
                correct: 0
            },
            {
                type: 'multiple-choice',
                question: 'Which statement correctly creates a variable named "age" with value 25?',
                choices: ['var age = 25', '25 = age', 'int age = 25', 'age = 25'],
                correct: 3
            },
            {
                type: 'fill-in',
                question: 'Complete the code to print "Python"',
                template: '___("Python")',
                answer: 'print',
                hint: 'Use the function to display text'
            },
            {
                type: 'multiple-choice',
                question: 'What is the output of this code?',
                code: 'x = 10\ny = 20\nprint(x + y)',
                choices: ['xy', '10 20', '1020', '30'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'Which line will cause an error?',
                choices: [
                    'x = 5',
                    'print(x)',
                    'my_var = "text"',
                    '2x = 10'
                ],
                correct: 3
            }
        ]
    },
    1: { // Lesson 1: Data Types
        title: "Data Types",
        category: "Python Basics",
        questions: [
            {
                type: 'multiple-choice',
                question: 'What data type is the value 42?',
                choices: ['str', 'bool', 'float', 'int'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'What type is the value True in Python?',
                choices: ['int', 'string', 'binary', 'bool'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'Which value is a float (decimal number)?',
                choices: ['"3.14"', 'False', '314', '3.14'],
                correct: 3
            },
            {
                type: 'fill-in',
                question: 'Convert the string "100" to an integer',
                template: '___("100")',
                answer: 'int',
                hint: 'Function name to convert to integer'
            },
            {
                type: 'multiple-choice',
                question: 'What does type(5.0) return?',
                choices: [
                    "<class 'int'>",
                    "<class 'number'>",
                    "<class 'decimal'>",
                    "<class 'float'>"
                ],
                correct: 3
            }
        ]
    },
    2: { // Lesson 2: Strings
        title: "String Operations",
        category: "Python Basics",
        questions: [
            {
                type: 'multiple-choice',
                question: 'What is the output?',
                code: 'text = "Python"\nprint(text[0])',
                choices: ['0', 'Python', 'Error', 'P'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'How do you get the length of string "Hello"?',
                choices: ['"Hello".length', 'size("Hello")', 'length("Hello")', 'len("Hello")'],
                correct: 3
            },
            {
                type: 'fill-in',
                question: 'Join "Hello" and "World" with a space',
                template: '"Hello" ___ " " ___ "World"',
                answer: '+ +',
                hint: 'Use the concatenation operator twice'
            },
            {
                type: 'multiple-choice',
                question: 'What does "PYTHON".lower() return?',
                choices: ['"PYTHON"', '"Python"', 'Error', '"python"'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'What does "abc" * 3 produce?',
                choices: ['Error', '"abc3"', '"aaa bbb ccc"', '"abcabcabc"'],
                correct: 3
            }
        ]
    },
    3: { // Lesson 3: If Statements
        title: "Conditional Logic",
        category: "Control Flow",
        questions: [
            {
                type: 'multiple-choice',
                question: 'What will this print if x = 5?',
                code: 'x = 5\nif x > 3:\n    print("Big")\nelse:\n    print("Small")',
                choices: ['Nothing', 'Both', 'Small', 'Big'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'Which operator checks if two values are equal?',
                choices: ['=', 'equals', '===', '=='],
                correct: 3
            },
            {
                type: 'fill-in',
                question: 'Complete the if statement to check if age is 18 or more',
                template: '___ age >= 18:\n    print("Adult")',
                answer: 'if',
                hint: 'Keyword to start a condition'
            },
            {
                type: 'multiple-choice',
                question: 'What is the output if score = 85?',
                code: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")',
                choices: ['A', 'C', 'Error', 'B'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'What does (5 > 3 and 2 < 1) evaluate to?',
                choices: ['True', 'Error', '1', 'False'],
                correct: 3
            }
        ]
    },
    4: { // Lesson 4: Loops
        title: "Loops & Iteration", 
        category: "Control Flow",
        questions: [
            {
                type: 'multiple-choice',
                question: 'How many times will this loop run?',
                code: 'for i in range(5):\n    print(i)',
                choices: ['Infinite', '6', '4', '5'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'What does range(3) produce?',
                choices: ['1, 2, 3', '0, 1, 2, 3', '1, 2', '0, 1, 2'],
                correct: 3
            },
            {
                type: 'fill-in',
                question: 'Loop through a list of fruits',
                template: '___ fruit ___ ["apple", "banana"]:\n    print(fruit)',
                answer: 'for in',
                hint: 'Use for...in syntax'
            },
            {
                type: 'multiple-choice',
                question: 'What happens with this code?',
                code: 'while True:\n    print("Hi")',
                choices: ['Prints once', 'Error', 'Prints nothing', 'Infinite loop'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'Which keyword skips to the next iteration?',
                choices: ['break', 'skip', 'next', 'continue'],
                correct: 3
            }
        ]
    },
    5: { // Lesson 5: Functions
        title: "Functions",
        category: "Functions & Scope",
        questions: [
            {
                type: 'multiple-choice',
                question: 'How do you define a function named "greet"?',
                choices: ['function greet():', 'func greet():', 'greet() def:', 'def greet():'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'What does this function return?',
                code: 'def add(a, b):\n    return a + b\n\nresult = add(3, 4)',
                choices: ['None', 'Error', '34', '7'],
                correct: 3
            },
            {
                type: 'fill-in',
                question: 'Complete the function to return the squared value',
                template: 'def square(x):\n    ___ x * x',
                answer: 'return',
                hint: 'Keyword to send back a value'
            },
            {
                type: 'multiple-choice',
                question: 'What is printed?',
                code: 'def hello():\n    print("Hi")\n\nhello()',
                choices: ['hello', 'Nothing', 'Error', 'Hi'],
                correct: 3
            },
            {
                type: 'multiple-choice',
                question: 'What happens if you call triple(5)?',
                code: 'def triple(n):\n    return n * 3',
                choices: ['Error', 'Returns "555"', 'Returns 3', 'Returns 15'],
                correct: 3
            }
        ]
    }
};

// State Management
let currentLesson = 0;
let currentQuestionIndex = 0;
let currentQuestions = [];
let shuffledChoices = [];
let correctAnswerIndex = 0;
let userAnswers = [];
let correctCount = 0;
let totalPoints = 0;
let streak = 0;
let completedLessons = new Set();

// Utility: Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('moowre_progress');
    if (saved) {
        const data = JSON.parse(saved);
        totalPoints = data.points || 0;
        streak = data.streak || 0;
        completedLessons = new Set(data.completed || []);
    }
    updateStats();
    updateDashboard();
}

// Save progress
function saveProgress() {
    const data = {
        points: totalPoints,
        streak: streak,
        completed: Array.from(completedLessons)
    };
    localStorage.setItem('moowre_progress', JSON.stringify(data));
}

// Update stats display
function updateStats() {
    document.getElementById('streak').textContent = streak;
    document.getElementById('points').textContent = totalPoints;
}

// Update dashboard
function updateDashboard() {
    const completed = completedLessons.size;
    const total = Object.keys(QUESTION_BANK).length;
    
    document.getElementById('completed-lessons').textContent = completed;
    document.getElementById('total-lessons').textContent = total;
    
    const progress = (completed / total) * 100;
    document.getElementById('overall-progress').style.width = progress + '%';
    
    // Update lesson cards
    document.querySelectorAll('.lesson-card').forEach(card => {
        const lessonId = parseInt(card.dataset.lesson);
        
        if (completedLessons.has(lessonId)) {
            card.classList.add('completed');
            card.classList.remove('locked');
            card.querySelector('.lesson-progress').textContent = '✅';
        } else if (lessonId === 0 || completedLessons.has(lessonId - 1)) {
            card.classList.remove('locked');
        }
    });
}

// View switching
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// Start lesson
function startLesson(lessonId) {
    const card = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (card.classList.contains('locked')) return;
    
    currentLesson = lessonId;
    currentQuestionIndex = 0;
    const lessonData = QUESTION_BANK[lessonId];
    currentQuestions = [...lessonData.questions];
    userAnswers = [];
    correctCount = 0;
    
    // Shuffle questions for variety
    currentQuestions.sort(() => Math.random() - 0.5);
    
    showView('quiz');
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    
    document.getElementById('quiz-progress').style.width = progress + '%';
    document.getElementById('question-text').textContent = question.question;
    
    const questionBody = document.getElementById('question-body');
    questionBody.innerHTML = '';
    
    if (question.code) {
        const codeDiv = document.createElement('div');
        codeDiv.className = 'code-display';
        codeDiv.textContent = question.code;
        questionBody.appendChild(codeDiv);
    }
    
    if (question.type === 'multiple-choice') {
        // Create shuffled choices with correct answer tracking
        const choicesWithIndex = question.choices.map((choice, idx) => ({
            text: choice,
            isCorrect: idx === question.correct
        }));
        
        // Shuffle the choices
        shuffledChoices = shuffleArray(choicesWithIndex);
        correctAnswerIndex = shuffledChoices.findIndex(c => c.isCorrect);
        
        // Display shuffled choices
        shuffledChoices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = () => selectChoice(index);
            questionBody.appendChild(btn);
        });
    } else if (question.type === 'fill-in') {
        const template = document.createElement('div');
        template.className = 'code-display';
        template.textContent = question.template;
        questionBody.appendChild(template);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'code-input';
        input.placeholder = 'Type your answer here...';
        input.id = 'fill-answer';
        questionBody.appendChild(input);
        
        if (question.hint) {
            const hint = document.createElement('p');
            hint.style.marginTop = '0.5rem';
            hint.style.color = 'var(--text-light)';
            hint.textContent = '💡 ' + question.hint;
            questionBody.appendChild(hint);
        }
    }
    
    // Reset feedback and buttons
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('show', 'correct', 'incorrect');
    document.getElementById('check-btn').style.display = 'block';
    document.getElementById('check-btn').disabled = true;
    document.getElementById('continue-btn').style.display = 'none';
}

// Select multiple choice answer
function selectChoice(index) {
    document.querySelectorAll('.choice-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    userAnswers[currentQuestionIndex] = index;
    document.getElementById('check-btn').disabled = false;
}

// Check answer
function checkAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    let isCorrect = false;
    
    if (question.type === 'multiple-choice') {
        const userAnswer = userAnswers[currentQuestionIndex];
        isCorrect = userAnswer === correctAnswerIndex;
        
        // Highlight correct/incorrect
        document.querySelectorAll('.choice-btn').forEach((btn, i) => {
            if (i === correctAnswerIndex) {
                btn.classList.add('correct');
            } else if (i === userAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        });
    } else if (question.type === 'fill-in') {
        const userAnswer = document.getElementById('fill-answer').value.trim().toLowerCase();
        const correctAnswer = question.answer.toLowerCase();
        isCorrect = userAnswer === correctAnswer;
        
        document.getElementById('fill-answer').disabled = true;
    }
    
    if (isCorrect) {
        correctCount++;
        totalPoints += 10;
        feedback.textContent = '✅ Correct! Well done!';
        feedback.classList.add('correct');
    } else {
        feedback.textContent = '❌ Not quite. Try to learn from this!';
        feedback.classList.add('incorrect');
    }
    
    feedback.classList.add('show');
    updateStats();
    
    document.getElementById('check-btn').style.display = 'none';
    document.getElementById('continue-btn').style.display = 'block';
}

// Continue to next question
function continueQuiz() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    const pointsEarned = correctCount * 10;
    
    if (correctCount === currentQuestions.length) {
        streak++;
        completedLessons.add(currentLesson);
    }
    
    saveProgress();
    
    document.getElementById('correct-count').textContent = correctCount + '/' + currentQuestions.length;
    document.getElementById('points-earned').textContent = '+' + pointsEarned;
    
    showView('results');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    // Lesson cards
    document.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('click', function() {
            const lessonId = parseInt(this.dataset.lesson);
            startLesson(lessonId);
        });
    });
    
    // Quiz controls
    document.getElementById('quit-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to quit this lesson?')) {
            showView('dashboard');
        }
    });
    
    document.getElementById('check-btn').addEventListener('click', checkAnswer);
    document.getElementById('continue-btn').addEventListener('click', continueQuiz);
    
    // Handle fill-in input
    document.addEventListener('input', function(e) {
        if (e.target.id === 'fill-answer') {
            document.getElementById('check-btn').disabled = e.target.value.trim() === '';
        }
    });
    
    // Results continue
    document.getElementById('continue-dashboard-btn').addEventListener('click', () => {
        updateDashboard();
        showView('dashboard');
    });
    
    console.log('🐮 Moowre Python Learning Platform loaded!');
});
