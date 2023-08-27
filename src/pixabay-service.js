import axios from "axios";

export default class PixabayApiService {
  constructor() {
    this.searchQuery = ''
    this.page = 1;
  }

  async fetchPictures() {
   const resp = await axios.get(
      `https://pixabay.com/api/?key=33922902-bfae212e6daaaa40ab37292b2&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    )
    .then(({data}) => {
      // this.incrementPage()
      return data
    })
    return resp;
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
