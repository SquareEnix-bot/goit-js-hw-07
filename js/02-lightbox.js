import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const gallery = document.querySelector('.gallery');

// * функція створення елементу
function createImageElement({ preview, original, description }) {
  const galleryItem = document.createElement('a'); // * a
  galleryItem.classList.add('gallery__item');
  galleryItem.href = `${original}`;  
  const galleryImage = document.createElement('img'); // * img
  galleryImage.classList.add('gallery__image');
  galleryImage.src = `${preview}`;  
  galleryImage.alt = `${description}`;  

  galleryItem.append(galleryImage); // * img -> a   
  galleryArray.push(galleryItem);
}

const galleryArray = []; // * масив для galleryItem

// * створюються всі елементи та пушаться у масив
const createGallery = galleryItems
  .map(createImageElement);

// * додаю масив з усіма galleryItem в DOM
gallery.append(...galleryArray);

// * бібліотека SimpleLightbox
let gallerySL = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});

gallerySL.on('show.simplelightbox', function () {  
});
