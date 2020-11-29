const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers =true
let score = 0 
let questionCounter = 0
let availablequestions = []

let questions =[
    {
        question:"what is 2 + 2 ?",
        choice1:'2',
        choice2:'7',
        choice3:'22',
        choice4:'3',
        answer:2,
    },
    {
        question:"The tallest building in the world is located in which city ?",
        choice1:'Dubai',
        choice2:'New York',
        choice3:'Gujrat',
        choice4:'None of the above',
        answer:1,
    },
    {
        question:"what is factorial of 5 ?",
        choice1:'112',
        choice2:'77',
        choice3:'120',
        choice4:'25',
        answer:3,
    },
    {
        question:"what is capital of india?",
        choice1:'Delhi',
        choice2:'Mumbai',
        choice3:'chennai',
        choice4:'kolkata',
        answer:1,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () =>{
    questionCounter = 0
    score = 0 
    availableQuesions= [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if (availablequestions.length === 0 || questionCounter > MAX_QUESTION){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuesions.length)
    currentQuestion = availableQuesions[questionSIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choices => {
        const number =  choice.dataset['number']
        choices.inneeText = currentQuestion['choice' + number]
    });
    
    availableQuesions.splices(questionsIndex,1)
    acceptingAnswers = true
}
 choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectChoice = e.target
        const selectedAnswer = selectChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :'incorrect'

        if (classToApply == 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        },1000)
    })
 })

incrementScore = num  =>{
    score +=num
    scoreText.innerText = score
} 

startGame()
