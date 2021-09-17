import NewsApiService from "./js/apiService";
import imageCardsTemplate from "./templates/image-card.hbs";
import * as basicLightbox from 'basiclightbox';
// console.log(basicLightbox)
// const basicLightbox = require('basiclightbox')





const searchForm = document.querySelector('.search-form');
const imagesContainer = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
const loadMoreBtn = document.querySelector('.load-more-btn');
const spinner = document.querySelector('.spinner');
const loadSpan = document.querySelector('.load')


const newsApiService = new NewsApiService();
// const markup = imageCardsTemplate(newsApiService.fetchImages());
// console.log(imageCardsTemplate)

searchForm.addEventListener('submit', onSearch);
// // searchBtn.addEventListener('click', onSearchBtn);
loadMoreBtn.addEventListener('click', onLoadMore);
imagesContainer.addEventListener('click', onImagesContainerClick)

const API_KEY = '23351611-7864196d6829752dad19e3759';
const BASE_URL = 'https://pixabay.com/api/';

function onSearch(e) {
    e.preventDefault();
    clearImagesContainer();
    spinner.classList.remove('visually-hidden');
    loadSpan.classList.add('visually-hidden');

    newsApiService.searchQuery = e.currentTarget.elements.query.value;
    
    if (newsApiService.query === '') {
        return alert("?")
    }
    newsApiService.resetPage();

    newsApiService.fetchImages().then(appendImagesMarkup);
    
    // loadSpan.classList.remove('visually-hidden');
    // spinner.classList.add('visually-hidden');
}

function onLoadMore() {
    newsApiService.fetchImages()
    .then(appendImagesMarkup)
}

function appendImagesMarkup(hits) {
    
    imagesContainer.insertAdjacentHTML('beforeend', imageCardsTemplate(hits));
    loadSpan.classList.remove('visually-hidden');
    spinner.classList.add('visually-hidden');
}
function onImagesContainerClick(e) {
    if (!e.target.classList.contains('card-image')) {
        return
    }
    console.log(e.target)
    const imgUrl = e.target.getAttribute('src')
    console.log(imgUrl)

    const lightbox = basicLightbox.create(`
   <div class="lightbox"><img src="${imgUrl}"></img>
   </div> 
`
)
lightbox.show()
// lightbox.close()
    
 }

function clearImagesContainer() {
    imagesContainer.innerHTML = '';
}

