const infoContainer = document.querySelector('.info_container')
const buttonBack = document.querySelector('.btn_back')

async function getInfo() {
    infoContainer.innerHTML = 'Loading...'

    let info = await fetchInfo()
    info = info[0]

    renderInfo(info)


}

function renderInfo(info) {

    let creators = info.creators.map(creator => {
        return creator.name
    })
    console.log(creators)


    infoContainer.innerHTML = `
    <ul class="list-group">
  <li class="list-group-item"><span style="font-weight: bold">Synopsis: </span>${info.synopsis}</li>
  <li class="list-group-item"><span style="font-weight: bold">YearsAired: </span>${info.yearsAired}</li>
  <li class="list-group-item"><span style="font-weight: bold">Creators: </span>${[...creators]}</li>
    </ul>`
}

function openPreviousPage(){
    buttonBack.addEventListener('click', async (e) => {
        e.preventDefault()
        let openedEpisode = localStorage.getItem('openedEpisodeId')
        window.location.href = `./episode.html?episode_id=${openedEpisode}`
    })

}


getInfo()
openPreviousPage()