import { refs } from './refs';

function createMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
          <a href="${largeImageURL}" class="gallery-card-wrapper">      <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        Likes<b>${likes}</b>
      </p>
      <p class="info-item">
        Views<b>${views}</b>
      </p>
      <p class="info-item">
        Comments<b>${comments}</b>
      </p>
      <p class="info-item">
        Downloads<b>${downloads}</b>
      </p>
    </div>
  </div>
</a>
          `
    )
    .join('');
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
  hideLoadBtn();
}

function hideLoadBtn() {
  refs.loadMoreBtnSpace.classList.add('visually-hidden');
}

function showLoadBtn() {
  refs.loadMoreBtnSpace.classList.remove('visually-hidden');
}

export { createMarkup, clearMarkup, hideLoadBtn, showLoadBtn };