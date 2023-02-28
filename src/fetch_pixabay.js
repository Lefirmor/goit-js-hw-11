import axios from 'axios';

export default class PixabayServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const url = `https://pixabay.com/api/?key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&per_page=40&page=${this.page}`;

    return await axios.get(url);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}