import NewsApiService from "./js/apiService";
import imageCardsTemplate from "./templates/image-card.hbs";


const searchForm = document.querySelector('.search-form');
const imagesContainer = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
const loadMoreBtn = document.querySelector('.load-more-btn');

const newsApiService = new NewsApiService();
// const markup = imageCardsTemplate(newsApiService.fetchImages());
// console.log(imageCardsTemplate)

searchForm.addEventListener('submit', onSearch);
// // searchBtn.addEventListener('click', onSearchBtn);
loadMoreBtn.addEventListener('click', onLoadMore);

const API_KEY = '23351611-7864196d6829752dad19e3759';
const BASE_URL = 'https://pixabay.com/api/';

function onSearch(e) {
    e.preventDefault();
    clearImagesContainer();
    newsApiService.searchQuery = e.currentTarget.elements.query.value;
    
    if (newsApiService.query === '') {
        return alert("?")
    }
    newsApiService.resetPage();

    newsApiService.fetchImages().then(appendImagesMarkup);
}

function onLoadMore() {
    newsApiService.fetchImages()
    .then(appendImagesMarkup)
}

function appendImagesMarkup(hits) {
    imagesContainer.insertAdjacentHTML('beforeend', imageCardsTemplate(hits))
}

function clearImagesContainer() {
    imagesContainer.innerHTML = '';
}