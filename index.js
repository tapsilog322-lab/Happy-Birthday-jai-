
const enterOverlay = document.querySelector('.enter-overlay');
const enterButton = document.querySelector('.enter-button');

const spawnRandomFlowers = () => {
  const container = document.createElement('div');
  container.className = 'random-flowers';
  document.body.appendChild(container);

  for (let i = 0; i < 8; i += 1) {
    const flower = document.createElement('div');
    flower.className = 'random-flower';
    const size = 4 + Math.random() * 6;
    flower.style.setProperty('--flower-size', `${size}vmin`);
    const angle = Math.random() * 360;
    const distance = 12 + Math.random() * 18;
    flower.style.setProperty('--tx', `${Math.cos((angle * Math.PI) / 180) * distance}vmin`);
    flower.style.setProperty('--ty', `${Math.sin((angle * Math.PI) / 180) * distance}vmin`);
    flower.style.setProperty('--delay', `${(Math.random() * 0.15).toFixed(2)}s`);

    for (let p = 0; p < 5; p += 1) {
      const petal = document.createElement('div');
      petal.className = 'random-flower__petal';
      flower.appendChild(petal);
    }
    const center = document.createElement('div');
    center.className = 'random-flower__center';
    flower.appendChild(center);
    container.appendChild(flower);
  }

  setTimeout(() => {
    container.remove();
  }, 1400);
};

const hideEnterOverlay = () => {
  if (!enterOverlay) return;
  spawnRandomFlowers();
  enterOverlay.classList.add('enter-overlay--hidden');
  document.body.classList.remove('not-loaded');
  setTimeout(() => {
    enterOverlay.remove();
  }, 600);
};

const openPhotoOverlay = (src, alt) => {
  const overlay = document.createElement('div');
  overlay.className = 'photo-overlay';
  overlay.innerHTML = `
    <div class="photo-overlay__inner">
      <button class="photo-overlay__close" aria-label="Close photo overlay">×</button>
      <img src="${src}" alt="${alt}">
    </div>
  `;

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.closest('.photo-overlay__close')) {
      overlay.remove();
    }
  });

  document.body.appendChild(overlay);
};

onload = () => {
  if (enterButton) {
    enterButton.addEventListener('click', hideEnterOverlay);
  }

  const photoBoxes = document.querySelectorAll('.photo-panel__box');
  photoBoxes.forEach((box) => {
    const image = box.querySelector('img');
    if (!image) return;
    box.addEventListener('click', () => {
      openPhotoOverlay(image.src, image.alt);
    });
  });
};