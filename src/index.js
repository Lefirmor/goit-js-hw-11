import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import PixabayApiService from './pixabay-service';

const refs = {
  searchInput: document.querySelector('.search-input'),
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery-list'),
  container: document.querySelector('.container'),
  gallery: document.querySelector('.gallery'),
  // loadMoreHidden: document.querySelector('load-more__is-hidden'),
  loadMore: document.querySelector('.load-more'),
};
const pixabayApiService = new PixabayApiService();
// refs.loadMore.addEventListener("click", OnLoadMore)
// const inputValue = refs.searchInput.value;
let page = 1;


refs.searchForm.addEventListener('submit', findpics);

function findpics(e) {
  e.preventDefault();

  
  pixabayApiService.query = refs.searchInput.value;
  pixabayApiService.resetPage()
  pixabayApiService.fetchPictures()
    .then(data => {
      clearArticlesContainer();
      document.documentElement.getBoundingClientRect().top = 0;
      if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.loadMore.classList.add('load-more__is-hidden');
     
      } else if (data.total !== 0) {
        Notiflix.Notify.success(`Hooray! We found ${data.total} images`);
      }

      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox.refresh()

      console.log(data);
    })
    .catch(err => console.log(err.statusText));
}

function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a href = "${webformatURL}"><img src="${largeImageURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b> likes ${likes}</b>
        </p>
        <p class="info-item">
          <b> views ${views}</b>
        </p>
        <p class="info-item">
          <b> comments ${comments}</b>
        </p>
        <p class="info-item">
          <b> downloads ${downloads}</b>
        </p>
      </div>
    </div>`
    )
    .join('');
    
}

function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
}
console.log(page);
window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    pixabayApiService.incrementPage()
    pixabayApiService.query = refs.searchInput.value;
    pixabayApiService.fetchPictures().then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox.refresh()
      // console.log(data);
    });
  }
});
 
const lightbox = new SimpleLightbox('.gallery a', {
 
  
})



