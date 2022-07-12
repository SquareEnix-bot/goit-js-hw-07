import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const gallery = document.querySelector('.gallery');

// * функція створення розмітки
function createImageMarkup({ preview, original, description }) {
  return `<a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
          `
};

// * створюється розмітка всієї галерея
const createGalleryMarkup = galleryItems
  .map(createImageMarkup)
  .join('');

// * додається розмітка галереї на сторінку в головний div.gallery
gallery.insertAdjacentHTML("beforeend", createGalleryMarkup);

// * бібліотека SimpleLightbox
let gallerySL = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});
