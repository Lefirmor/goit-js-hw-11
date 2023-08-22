const refs = {
  searchInput: document.querySelector('.search-input'),
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery-list'),
  container: document.querySelector('.container'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more')
};

refs.loadMore.addEventListener("click", OnLoadMore)
let page = 1;
function OnLoadMore(){
  page += 1;

  fetchPictures().then(data => {
    refs.gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits))

    if(data.hits < data.totalHits){
      refs.loadMore.classList.replace("load-more", "load-more__hidden")
    }
})}

function fetchPictures() {
  const searchQuery = "";

  return fetch(
    `https://pixabay.com/api/?key=33922902-bfae212e6daaaa40ab37292b2&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`
  ).then(res >= res.json).then(console.log)
   

}
refs.searchForm.addEventListener('submit', findpics);

function findpics(e){
  e.preventDefault()
  const inputValue = refs.searchForm.elements.searchQuery

  fetchPictures(inputValue.value).then(data => {
    refs.gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits))

    console.log(data)
  }).catch(err => console.log(err.statusText))
    
  
}

// fetchPictures()
//   .then(data => {
//     refs.gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits))

//     console.log(data)
//   })
//   .catch(err => console.error(err));

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
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
