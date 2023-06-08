const baseUrl = 'https://api.sampleapis.com/futurama'

async function fetchAllEpisodes() {
    //получаю список эпизодов
    const response = await fetch(baseUrl + '/episodes')
    const data = await response.json()
    return data
}

async function fetchEpisode(episode_id) {
    //получаю 1 эпизод
    const response = await fetch(baseUrl + '/episodes/' + episode_id)
    const data = await response.json()
    return data
}

async function fetchInfo() {
    //получаю инфу о сериале
    const response = await fetch(baseUrl + '/info')
    const data = await response.json()
    return data
}

async function fetchQuestions() {
    //получаю список вопросов
    const response = await fetch(baseUrl + '/questions')
    const data = await response.json()
    return data
}

async function fetchQuestion(questionId) {
    //получаю один вопрос
    const response = await fetch(baseUrl + '/questions' + `/${questionId}`)
    const data = await response.json()
    return data
}