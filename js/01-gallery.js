import { galleryItems } from './gallery-items.js';

// * головний div.gallery 
const gallery = document.querySelector('.gallery');

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
gallery.insertAdjacentHTML("beforeend", createGalleryMarkup);

// * слухач на головний div.gallery
gallery.addEventListener('click', onImgClick);

// * делегування кліку на div.gallery__item 
function onImgClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {    
    return;
  }    

  bigImage(event.target.dataset.source); // * виклик функції basicLightbox
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








