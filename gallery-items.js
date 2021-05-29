const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.gallery');
const cardsMarkUp = createCardsMarkUp(images);
const modal = document.querySelector('.lightbox');
const modalImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');
const modalOverlay = document.querySelector('.lightbox__overlay');

modalOverlay.addEventListener('click', closeAction);
closeBtn.addEventListener('click', closeAction);
window.addEventListener('keydown', escapeCloseAction);
gallery.addEventListener('click', cardClickAction);
window.addEventListener('keydown', imageChangeBtnRigth);
window.addEventListener('keydown', imageChangeBtnLeft);

function createCardsMarkUp(cards) {
  return cards.map(({preview, original, description}) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`}).join('')
};

function cardClickAction(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  };

  modalImage.src = evt.target.dataset.source;
  modalImage.alt = evt.target.alt;
  modal.classList.add('is-open');
}

function closeAction() {
  modalImage.src = '';
  modalImage.alt = '';
  modal.classList.remove('is-open');
};

function escapeCloseAction(evt) {
  if (evt.code !== 'Escape' ) {
    return;
  }
  
  modalImage.src = '';
  modalImage.alt = '';
  modal.classList.remove('is-open');
}

function imageChangeBtnRigth(evt) {
  if (evt.code !== 'ArrowRight') {
    return;
  }
  
  if (modalImage.alt === '') {
    return;
  }
  
  let cardIndex;

  images.forEach((card, index) => {
    if (card.original === modalImage.src) {
      cardIndex = index;
    }
  });

  if (cardIndex < images.length-1) {
    modalImage.alt = images[cardIndex + 1].description;
    modalImage.src = images[cardIndex + 1].original;  
  };
  
  if (cardIndex === images.length-1) {
    modalImage.alt = images[0].description;
    modalImage.src = images[0].original;  
  };
}

function imageChangeBtnLeft(evt) {
  if (evt.code !== 'ArrowLeft') {
    return;
  }

  if (modalImage.alt === '') {
    return;
  }

  let cardIndex;

  images.forEach((card, index) => {
    if (card.original === modalImage.src) {
      cardIndex = index;
    }
  });

  if (cardIndex > 0) {
    modalImage.alt = images[cardIndex - 1].description;
    modalImage.src = images[cardIndex - 1].original;  
  };

  if (cardIndex === 0) {
    modalImage.alt = images[images.length - 1].description;
    modalImage.src = images[images.length - 1].original;  
  };
};

gallery.insertAdjacentHTML('beforeend', cardsMarkUp);

