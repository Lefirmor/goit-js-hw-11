import './css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayServise from './fetch_pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayServise = new PixabayServise();

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery-list');

searchForm.addEventListener('submit', getSearchResult);
window.addEventListener('scroll', getMoreResults);

function getSearchResult(e) {
  e.preventDefault();

  pixabayServise.query = e.currentTarget.elements.searchQuery.value;
  pixabayServise.fetchPictures().then(({ data }) => {
    if (data.total === 0) {
      clearPage();

      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    clearPage();
    createGallery(data.hits);
    nextPage();
  });
}

function createGallery(query) {
  const countryItem = query
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="list-item">
      <div class="photo-card">
      <div class="photo-container">
      <a class="photo" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>
</li>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', countryItem);

  new SimpleLightbox('.photo', {
    captions: false,
  });
}

function clearPage() {
  // window.scrollTo(0, 0);

  galleryList.innerHTML = '';
}

function nextPage() {
  pixabayServise.page += 1;
}

function getMoreResults() {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    pixabayServise.fetchPictures().then(({ data }) => {
      createGallery(data.hits);
      nextPage();
    });
  }
}
