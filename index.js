const container = document.querySelector('.container')

async function init() {
        //получаем список эпизодов
    container.innerHTML = 'Loading...'
    let allEpisodes = await fetchAllEpisodes()
    renderTitles(allEpisodes)
}

function renderTitles(allEpisodes) {
    //рендерим заголовки
    container.innerHTML = ''
    console.log('renderTitles episodes', allEpisodes)

    allEpisodes.forEach(episode => {
        let title = document.createElement('li')
        title.classList.add('title')
        title.classList.add("list-group-item")
        title.classList.add("list-group-item-action")
        title.style.padding = '0'
        title.innerHTML = `<a style="text-decoration: none; color: inherit; display: block; height: 100%; padding: 8px" href="./episode.html?episode_id=${episode.id}">${episode.title}</a>`
        container.append(title)
    })
}



document.addEventListener('DOMContentLoaded', init)
