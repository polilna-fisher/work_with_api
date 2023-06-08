const questionContainer = document.querySelector('.question_container')
const searchParams = new URLSearchParams(window.location.search)
const questionId = searchParams.get('question_id')
const submitButton = document.querySelector('.submit_answer_btn')
const buttonBack = document.querySelector('.btn_back')
const nextQuestion = document.querySelector('.next_question')



async function getQuestions(questionId) {
    questionContainer.innerHTML = 'Loading...'

    let question = await fetchQuestion(questionId)

    renderTitles(question)
    renderAnswers(question)
    const correctIndex = findCorrectAnswer(question)
    addClassToCheckedCheckbox()
    checkAnswer(correctIndex)



}


function renderTitles(question) {
    questionContainer.innerHTML = `
   
    <ul class="list-group list_container">
  <li class="list-group-item"><span style="font-weight: bold">Question: </span>${question.question}</li>
  <li class="list-group-item"><span style="font-weight: bold">Possible answers: </span></li>

    </ul>`

}

function renderAnswers(question) {
    let answers = question.possibleAnswers
    answers.forEach(answer => {
        let index = answers.indexOf(answer)
        let answerBlock = `

         <li class="list-group-item " style="padding: 0">
                <label class="form-check-label label " style="padding: 10px; width: 100%; height: 100%">
                <input class="form-check-input me-1 checkbox " count="${index + 1}" type="radio" name="listGroupRadio" value="" id="secondRadio">
                <span>${answer}</span></label>
         </li>
    `
        questionContainer.innerHTML = questionContainer.innerHTML + answerBlock
    })
}

function findCorrectAnswer(question){
    let correctAnswer = question.correctAnswer
    console.log(correctAnswer, 'correct')
    let answers = question.possibleAnswers
    return answers.indexOf(correctAnswer) + 1
}

function addClassToCheckedCheckbox(){
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach(checkbox => {

        checkbox.addEventListener('change', () => {
            checkboxes.forEach(el => el.removeAttribute('checked'))
            checkbox.setAttribute('checked', '')
        })
    })
}



function checkAnswer(correctIndex){
    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        let inputs = document.querySelectorAll('input')
        inputs = [...inputs]

        const chosenIndex = inputs.findIndex(el => el.hasAttribute('checked'))
        inputs.forEach(el => {
            el.setAttribute('disabled', '')
        })
        if(correctIndex === chosenIndex + 1){
            inputs[chosenIndex].parentElement.parentElement.classList.add('list-group-item-success')
            console.log('Win win win win win')
        }else{
            inputs[chosenIndex].parentElement.parentElement.classList.add('list-group-item-danger')
            inputs[correctIndex - 1].parentElement.parentElement.classList.add('list-group-item-success')
            console.log('Loooooooser')
        }

    })
}

function openPreviousPage(){
    buttonBack.addEventListener('click', async (e) => {
        e.preventDefault()
        let openedEpisode = localStorage.getItem('openedEpisodeId')
        window.location.href = `./episode.html?episode_id=${openedEpisode}`
    })

}

function openNextQuestion(currentQuestionId){
    nextQuestion.addEventListener('click', async (e) => {
        e.preventDefault()
        let currentEpisode = JSON.parse(localStorage.getItem('openedEpisodeId'))
        let idList = JSON.parse(localStorage.getItem('IdQuestions'))
        idQuestionsList = idList.filter(el => el.episode_id === String(currentEpisode))[0].idQuestions
        let randomQuestionId = chooseRandomQuestion(idQuestionsList)

        if(randomQuestionId){
            window.location.href = `./questions.html?question_id=${randomQuestionId}`
        }else{
            showScore()
            addAllQuestionToLocalStorage(idList,currentEpisode)
        }
        deleteOpenedQuestionFromLocalStorage(idQuestionsList, randomQuestionId, idList, currentEpisode)
        })
}


function showScore(){

    questionContainer.innerHTML = ''
    submitButton.style.display = 'none'
    buttonBack.style.display = 'none'
    nextQuestion.style.display = 'none'
    const finalText = `
    <div class="score_container">
        <h2>You have answered all questions.</h2>
        <h2>Do you want to try again?</h2>
        <a class="btn btn-secondary again_btn" href="" role="button">Try again</a>
    </div>
    `
    questionContainer.innerHTML = finalText
}

function addAllQuestionToLocalStorage(idList, currentEpisode){
    const tryAgainButton = document.querySelector('.again_btn')
    tryAgainButton. addEventListener('click', async (e) => {
        e.preventDefault()

        let questions = await fetchQuestions()
        let idQuestions = []
        questions.forEach(question => {
            if(question.id <= 28){
                idQuestions.push(question.id)
            }
        })

        let newList = idList.map(el => {
            if(el.episode_id === String(currentEpisode)){
                el.idQuestions = idQuestions

            } return el
        })
        localStorage.setItem('IdQuestions', JSON.stringify(newList))
        returnToQuestions(idQuestions)
    }
    )


}


function returnToQuestions(idQuestionsList){
    let randomQuestionId = chooseRandomQuestion(idQuestionsList)
        window.location.href = `./questions.html?question_id=${randomQuestionId}`
}


function deleteOpenedQuestionFromLocalStorage(idQuestionsList, randomQuestionId, idList, currentEpisode){
    idQuestionsList = idQuestionsList.filter(id => id !== randomQuestionId)

    console.log(idQuestionsList)

    let newList = idList.map(el => {
        if(el.episode_id === String(currentEpisode)){
            el.idQuestions = idQuestionsList

        } return el
    })
    console.log(newList, 'newlist')
    localStorage.setItem('IdQuestions', JSON.stringify(newList))
}


function chooseRandomQuestion(idQuestions){
    let randomIndex = Math.floor(Math.random() * idQuestions.length)
    let randomQuestion = idQuestions[randomIndex]
    console.log(randomQuestion, 'randomQuestion')
    return randomQuestion
}


function calculateScore(){

}


getQuestions(questionId)
// saveIdQuestionsInLocalStorage()
openPreviousPage()
openNextQuestion(questionId)

