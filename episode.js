const episodeContainer = document.querySelector('.episode_container')
const questionsBtn = document.querySelector('.get_questions_btn')
const searchParams = new URLSearchParams(window.location.search)
const episodeId = searchParams.get('episode_id')
console.log(searchParams.get('episode_id'));



async function getEpisodeById(episodeId) {
    episodeContainer.innerHTML = 'Loading...'

    let episode = await fetchEpisode(episodeId)
    localStorage.setItem('openedEpisodeId', episodeId)
    renderEpisode(episode)
}

function renderEpisode(episode) {

    episodeContainer.innerHTML = `
    <ul class="list-group">
  <li class="list-group-item"><span style="font-weight: bold">Title: </span>${episode.title}</li>
  <li class="list-group-item"><span style="font-weight: bold">Description: </span>${episode.desc}</li>
  <li class="list-group-item"><span style="font-weight: bold">AirDate: </span>${episode.originalAirDate}</li>
  <li class="list-group-item"><span style="font-weight: bold">Writer: </span>${episode.writers}</li>
    </ul>`
}


async function getRandomIdQuestions(){
    let questions = await fetchQuestions()
    let idQuestions = []
    questions.forEach(question => {
        if(question.id <= 28){
            idQuestions.push(question.id)
        }
    })
    console.log(idQuestions,'idQuestions')

    const randomQuestion = chooseRandomQuestion(idQuestions)
    addIdQuestionsToLocalStorage(idQuestions)

    return randomQuestion
}

function chooseRandomQuestion(idQuestions){
    let randomIndex = Math.floor(Math.random() * idQuestions.length)
    let randomQuestion = idQuestions[randomIndex]
    console.log(randomQuestion, 'randomQuestion')
    return randomQuestion
}

function addIdQuestionsToLocalStorage(idQuestions){
    const storage = JSON.parse(localStorage.getItem('IdQuestions')) || []

    console.log(storage)

    if (storage.some(el => el.episode_id === episodeId)) {
        return
    } else {
        const episodeQuestion = {
            episode_id: episodeId,
            idQuestions
        }

        storage.push(episodeQuestion)
        localStorage.setItem('IdQuestions', JSON.stringify(storage))
    }
}


async function  init(){
    await getEpisodeById(episodeId)

    questionsBtn.addEventListener('click', async (e) => {
        e.preventDefault()

        const randomQuestion = await getRandomIdQuestions()
        console.log(123)
        window.location.href = `./questions.html?question_id=${randomQuestion}`

    })

}



init()
