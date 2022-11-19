import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { formEl, galleryEl } from '../js/refs'


function markupGallery(response) {
    const imageArr = response.data.hits;
    const markUpCard = imageArr.map(image => 
   `<div class="photo-wrapper">
    <a href="${image.largeImageURL}"
            class="gallery__item" >
    <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}"  loading="lazy"
            class="gallery__image"/>
        <div class="info">
            <p class="info-item">
            <b>Likes</b>${image.likes}
            </p>
            <p class="info-item">
            <b>Views</b>${image.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
            <p class="info-item">
            <b>Comments</b>${image.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>${image.downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
         </div>
    </div>
    </a>
    </div>`
      )
        .join('');
    
  galleryEl.insertAdjacentHTML('beforeend', markUpCard);
  galleryLightbox.refresh();
}


const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export { markupGallery, galleryLightbox };