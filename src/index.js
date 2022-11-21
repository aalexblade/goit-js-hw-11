import Notiflix from 'notiflix';
import { formEl, galleryEl, loadMore } from '../src/js/refs'
import { fetchGallery } from './js/fetchImages'
import { markupGallery } from './js/markupGallery'
import { smoothScrolling } from "./js/smoothScrolling";


const NewGallery = new fetchGallery();
formEl.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onClickLoadMore);


async function onSubmitForm(event) {
  event.preventDefault();

  NewGallery.query = event.currentTarget.elements.searchQuery.value.trim();
  NewGallery.page = 1;
    
  if (NewGallery.query === '') {
    loadMore.classList.add('is-hidden');
    Notiflix.Notify.failure('Треба заповнити форму');
    galleryEl.innerHTML = '';
    event.target.reset();
    return;
  }

  galleryEl.innerHTML = '';

  try {
    const response = await NewGallery.getPhotos();

    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      galleryEl.innerHTML = '';
      event.target.reset();
      return;
    }

    markupGallery(response);
    Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`)
    loadMore.classList.remove('is-hidden');

     if (NewGallery.page === Math.ceil(response.data.totalHits / 40)) {
      loadMore.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

  }
    catch (error) {
      console.log(error);
    }
  }

  
async function onClickLoadMore (event) {
  NewGallery.page += 1;

  try {
    const response = await NewGallery.getPhotos();

    if (NewGallery.page === Math.ceil(response.data.totalHits / 40)) {
      loadMore.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    markupGallery(response);
    smoothScrolling();
  } catch (error) {
    console.log(error);
  }
};