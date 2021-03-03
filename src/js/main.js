const LIMIT = 5
let page = 1
let isLoading = false
let readyCount = 0
let ready = true

const list = document.querySelector('.list')
const loading = document.querySelector('.loading')
const errorMessage = document.querySelector('.error-message')

const init = () => {
    getPhotos()
}

const getPhotos = async () => {
    try {
        isLoading = true
        readyCount = 0;

        const data = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`)
        const photos = await data.json();
    
        photos.forEach((item) => {
            createListItem(item)
        })

        page++    
    } catch (error) {
        if(error.message === 'Failed to fetch') {
            errorMessage.classList.add('show')
        }
    }
}

const imageReady = () => {
    readyCount++;

    if(readyCount >= 1) 
        loading.classList.add('hide');

    if(readyCount === LIMIT) {
        loading.classList.add('bottom');
        isLoading = false;
    }
}

const toggleShowLoading = () => {
    loading.classList.toggle('hide')
}


const createListItem = (data) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const img = document.createElement('img')

    img.setAttribute('src', data.download_url)
    img.setAttribute('alt', 'A random image from ipicsum')
    img.addEventListener('load', imageReady)

    a.appendChild(img)

    a.setAttribute('href', data.url)
    a.setAttribute('target', '_blank')

    li.appendChild(a)
    li.setAttribute('class', 'list-item')
    li.setAttribute('title', `Photo by ${data.author}`)

    list.appendChild(li)
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight , scrollTop } = document.documentElement;
    
    if(scrollTop + clientHeight >= (scrollHeight - 100) && !isLoading) {
        getPhotos()
        toggleShowLoading()
    }
})

init()