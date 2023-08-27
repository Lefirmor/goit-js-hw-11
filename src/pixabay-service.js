export default class PixabayApiService {
  constructor() {
    this.searchQuery = ''
    this.page = 1;
  }

  async fetchPictures() {
   return fetch(
      `https://pixabay.com/api/?key=33922902-bfae212e6daaaa40ab37292b2&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    ).then(res => res.json())
    .then(data => {
      // this.incrementPage()
      return data;
    })
  }

  incrementPage(){
    this.page += 1;
  }

  resetPage(){
    this.page = 1;
  }

  get query(){
    return this.searchQuery
  }

  set query(newQuery){
    this.searchQuery = newQuery;
  }
}
