import refs from '../src/js/references';
const { searchForm, imagesContainer, searchBtn, loadMoreBtn, spinner, loadSpan } = refs;
import NewsApiService from "./js/apiService";
import imageCardsTemplate from "./templates/image-card.hbs";
import * as basicLightbox from 'basiclightbox';
import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});


const API_KEY = '23351611-7864196d6829752dad19e3759';
const BASE_URL = 'https://pixabay.com/api/';
const newsApiService = new NewsApiService();
// const markup = imageCardsTemplate(newsApiService.fetchImages());
// console.log(markup)


searchForm.addEventListener('submit', onSearch);
imagesContainer.addEventListener('click', onImagesContainerClick);
// loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();
    clearImagesContainer();
    newsApiService.searchQuery = e.currentTarget.elements.query.value;
    
    if (newsApiService.query === '' || newsApiService.query === ' ') {
        return alert({text: 'Type in a search word'})
    } else {
     disableButton();   
    newsApiService.resetPage();
    newsApiService.fetchImages().then(appendImagesMarkup)
        .then(applyIntersectionObserver)
            .then(enableButton)
    }
}

// function onLoadMore() {
//     newsApiService.fetchImages()
//     .then(appendImagesMarkup)
// }

function appendImagesMarkup(hits) {
    imagesContainer.insertAdjacentHTML('beforeend', imageCardsTemplate(hits));
}

function onImagesContainerClick(e) {
    if (!e.target.classList.contains('card-image')) {
        return
    }
    console.log(e.target)
    const imgUrl = e.target.getAttribute('src');

    const lightbox = basicLightbox.create(`
   <div class="lightbox"><img src="${imgUrl}"></img>
   </div> 
`
)
    lightbox.show();
// lightbox.close()
 }

function clearImagesContainer() {
    imagesContainer.innerHTML = '';
}

function disableButton() {
    searchBtn.disabled = true;
    loadSpan.textContent = 'Loading';
    spinner.classList.remove('visually-hidden');
}

function enableButton() {
    searchBtn.disabled = false;
    loadSpan.textContent = ' Load ';
    spinner.classList.add('visually-hidden');
}

const applyIntersectionObserver = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const observedImg = entry.target
           newsApiService.fetchImages()
               .then(appendImagesMarkup)
                observer.unobserve(observedImg)
            }
        })
    }, options)

    const imagesArray = document.querySelectorAll('.card-image')
    imagesArray.forEach(i => {
        observer.observe(i)
    })
}