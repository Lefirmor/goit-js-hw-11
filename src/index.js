const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery-list'),
  container: document.querySelector('.container'),
  gallery: document.querySelector('.gallery'),

};

function fetchPictures() {
  const searchQuery = '';

  return fetch(
    `https://pixabay.com/api/?key=33922902-bfae212e6daaaa40ab37292b2&q=${'cat'}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
// refs.searchForm.addEventListener('submit', findpics);

fetchPictures()
  .then(data => {
    refs.galleryList.insertAdjacentHTML("beforeend", createMarkup(data.hits))

    console.log(data)
  })
  .catch(err => console.error(err));

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
      <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b> likes ${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
      </div>
    </div>`
    )
    .join('');
}
