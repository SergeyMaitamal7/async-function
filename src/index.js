import { Notify } from 'notiflix';
import { getData } from './js/fetchPixaby';
import { renderGallery } from './js/renderGallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.button-loadMore');

form.addEventListener('submit', onSubmit);
btn.addEventListener('click', onClickBtn);

let query = '';
let page = 1;
const perPage = 40;

const fetch = async (query, perPage, page) => {
  try {
    const data = await getData(query, perPage, page);
    console.log(data);
    if (data.hits.length === 0) {
      Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again.".'
      );
    } else {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a');
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    if (data.totalHits > perPage) {
      btn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error.message);
  }
};

function onSubmit(e) {
  e.preventDefault();
  query = e.currentTarget.searchQuery.value.trim();
  fetch(query, perPage, page);
  form.reset();
  gallery.innerHTML = '';
}

function onClickBtn() {
  page += 1;
  fetch(query, perPage, page).then(({ data }) => {
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      btn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}
