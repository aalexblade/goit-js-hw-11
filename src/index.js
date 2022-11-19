import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/fetch';
import {
  createMarkup,
  clearMarkup,
  hideLoadBtn,
  showLoadBtn,
} from './js/markup';
import { autoscroll } from './js/autoscroll';

export { PER_PAGE };

const PER_PAGE = 40;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

hideLoadBtn();

let searchQuery = '';
let pageNumber = 1;

async function onSearch(event) {
  event.preventDefault();
  clearMarkup();
  pageNumber = 1;
  searchQuery = refs.input.value;
  if (searchQuery) {
    try {
      const response = await fetchImages(searchQuery, pageNumber);
      if (response.data.hits.length === 0) {
        clearMarkup();
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

        refs.gallery.insertAdjacentHTML(
          'beforeend',
          createMarkup(response.data.hits)
        );
        lightbox.refresh();
        if (response.data.totalHits > PER_PAGE) {
          showLoadBtn();
        }
      }
    } catch (error) {
      Notify.failure(error);
      clearMarkup();
    }
  } else {
    Notify.warning('Please start typing.');
  }
}

async function onLoadMoreClick() {
  pageNumber += 1;
  try {
    const response = await fetchImages(searchQuery, pageNumber);

    const totalPages = response.data.totalHits / PER_PAGE;
    if (totalPages <= pageNumber) {
      hideLoadBtn();
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      createMarkup(response.data.hits)
    );
    lightbox.refresh();
    autoscroll();
  } catch (error) {
    Notify.failure(error);
    clearMarkup();
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});