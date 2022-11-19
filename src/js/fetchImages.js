import axios from 'axios';

export class fetchGallery {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '29948630-157933f0e62faad2f834f63f1';

  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.query = ''; 
  }

  getPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        page: this.page,
        per_page: this.per_page,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
  }
  incrementPage() {
    this.page += 1;
  }
}