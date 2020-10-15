// Defining variables
const question = document.querySelector('#quizQuestion');
const choices = Array.from(document.querySelectorAll('.quiz-choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions Array Object
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<script>',
        choice3: '<scripting>',
        choice4: '<javascript>',
        answer: 2,
    },
    {
        question: 'Where is the correct place to insert a JavaScript source?',
        choice1: '<head>',
        choice2: '<body>',
        choice3: 'Can be placed in Both <head> and <body>',
        choice4: 'Anywhere',
        answer: 3,
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choice1: '<script src="xxx.js">',
        choice2: '<script href="xxx.js">',
        choice3: '<script name="xxx.js">',
        choice4: '<script "xxx.js">',
        answer: 1,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'alertBox("Hello World");',
        choice2: 'msgBox("Hello World");',
        choice3: 'msg("Hello World");',
        choice4: 'alert("Hello World");',
        answer: 4,
    },
    {
        question: 'How do you write "Javascript is cool!" in an alert box?',
        choice1: 'alertBox("Javascript is cool!");',
        choice2: 'msgBox("Javascript is cool!");',
        choice3: 'msg("Javascript is cool!");',
        choice4: 'alert("Javascript is cool!");',
        answer: 4,
    }
]

// Defining game variables
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;
let time = 60;

// function to start game
startGame = () => {
    questionCounter = 0
    score = 0
    setInterval(run_timer, 1000)
    availableQuestions = [...questions]
    getNewQuestion()
};

// function to start timer and redirect after timer runs out
const run_timer = () => {
    if (time <= 0) {
        clearInterval()
        location.href = 'end.html'
        alert("Out of Time! But Save Your Score :).")
    } else {
        time--
        document.getElementById("timer").textContent = time
    }
}

// function to cycle through questions at random
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    document.getElementById("timer").textContent = time
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.slice(questionsIndex, 1)

    acceptingAnswers = true
};

// function for right and wrong logic
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'rightAnswer' : 'wrongAnswer'

        if (classToApply == 'rightAnswer') {
            incrementScore(SCORE_POINTS)
        }

        if (classToApply == 'wrongAnswer') {
            decrementTime(time)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

// increases score when correct question is selected
incrementScore = num => {
    score += num
    scoreText.innerText = score
}

// decreases time when incorrect question is selected
decrementTime = timeHit => {
    time -= 10
}

startGame()