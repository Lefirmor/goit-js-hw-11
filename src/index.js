import findPicture from "./fetch_pixabay";

const refs = {
  searchForm: document.querySelector('.search-form'),

}
refs.searchForm.addEventListener('submit', onSearch)

function onSearch(event){
  event.preventDefault()

  const searchQuery = event.currentTarget.elements.query.value;

  fetch(`https://pixabay.com/api/?key=33922902-bfae212e6daaaa40ab37292b2&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
.then(res => res.json())
.then(console.log)
}



// const options = {
//   headers:{
//     key: "33922902-bfae212e6daaaa40ab37292b2"
//   },
// }

