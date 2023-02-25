import ImagesApiService from './js/ImageApiService';
import LoadMoreBtn from './js/components/LoadMoreBtn';
import { createMarkup } from './js/createMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    isHidden: true,
});

let gallery = new SimpleLightbox('.gallery__link');

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

imagesApiService.searchQuary = value;


clearGallery();
imagesApiService.resetPage();

loadMoreBtn.show()

  fetchImages().finally(() => form.reset());
  console.log(value);
}


function fetchImages() {
    loadMoreBtn.disable()
  return imagesApiService
    .getImages()
    .then(hits => {
      if (hits.length === 0)
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      console.log(hits);

      return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    })
    .then((markup) => {
createGallery(markup);
loadMoreBtn.enable()
    })
    .catch(onError);
}

function createGallery(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
//   galleryEl.innerHTML = markup;
  gallery.refresh();
}

function clearGallery() {
    // galleryEl.insertAdjacentHTML('beforeend', markup);
    galleryEl.innerHTML = '';
  }

function onError(err) {
  // тут вивести повідомлення користувачу
//   Notiflix.Notify.warning(imagesApiService.response.status)
  console.log(err);
  loadMoreBtn.hide()
}
// console.log(galleryEl);
// console.log(loadMoreBtn);

// console.log(fetchImages);
// fetchImages();
