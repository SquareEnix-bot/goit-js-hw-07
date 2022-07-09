import { galleryItems } from './gallery-items.js';

// {
//     preview:
//       'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
//     original:
//       'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
//     description: 'Hokkaido Flower',
// }

// * головний div.gallery 
const gallery = document.querySelector('.gallery');

// ! ---begin--- спосіб №1 ШАБЛОННІ РЯДКИ
// * функція створення розмітки
function createImageMarkup({ preview, original, description }) {
  return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
          </div>
          `
};

// * створюється розмітка всієї галерея
const createGalleryMarkup = galleryItems
  .map(createImageMarkup)
  .join('');

// * додається розмітка галереї на сторінку в головний div.gallery
// gallery.insertAdjacentHTML("beforeend", createGalleryMarkup);
// ! ---end--- спосіб №1 ШАБЛОННІ РЯДКИ

// ! ---begin--- спосіб №2 СТВОРЕННЯ ЧЕРЕЗ createElement
// * функція створення елементу
function createImageElement({ preview, original, description }) {
  const galleryItem = document.createElement('div'); // * div
  galleryItem.classList.add('gallery__item');
  const galleryLink = document.createElement('a'); // * a
  galleryLink.classList.add('gallery__link');
  galleryLink.href = `${original}`;
  const galleryImage = document.createElement('img'); // * img
  galleryImage.classList.add('gallery__image');
  galleryImage.src = `${preview}`;
  galleryImage.dataset.source = `${original}`;
  galleryImage.alt = `${description}`;  

  galleryLink.append(galleryImage); // * img -> a 
  galleryItem.append(galleryLink); // * a -> div
  galleryArray.push(galleryItem);
}

const galleryArray = []; // * масив для galleryItem

// * створюються всі елементи та пушаться у масив
const createGallery = galleryItems
  .map(createImageElement);

// * додаю масив з усіма galleryItem в DOM
gallery.append(...galleryArray);
// ! ---end--- спосіб №2 СТВОРЕННЯ ЧЕРЕЗ createElement

// * вибір картинки
const image = gallery.querySelectorAll('.gallery__item');

// * слухач на головний div.gallery
gallery.addEventListener('click', onImgClick);
let selectedImageLink = null;

// * делегування кліку на div.gallery__item 
function onImgClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {    
    return;
  }    

  const activeImage = event.target;
  selectedImageLink = activeImage.dataset.source;  // * link на оригінальне зображення  

  bigImage(selectedImageLink); // * виклик функції basicLightbox
};

// * basicLightbox
function bigImage(link) {
  const instance = basicLightbox.create(`
    <img src="${link}" width="1280" height="854" class="gallery__image--active">
  `,
  {
    onShow: (instance) => {
      window.addEventListener('keydown', bigImageClose);      
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', bigImageClose);     
    }
  }
  );
  
  instance.show();  

  // * закриття на кнопку Esc
  function bigImageClose(event) {  
    if (event.code === 'Escape') {    
      instance.close(); 
    } else {
      return;
    }  
  }
}








