import axios from 'axios';
import { PER_PAGE } from '../index';

function fetchImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api';
  const OPTIONS = `key=31323724-22dd8053e8d976f8867bdfa37&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;

  return axios.get(`${BASE_URL}/?${OPTIONS}`);
}

export { fetchImages };