const sprite     = document.getElementById('sprite');
const spotlight  = document.getElementById('spotlight');
const wall       = document.getElementById('wall');

let posX = 0, posY = 0;

/**
 * Re-draw the spotlight as an overhead cone (ellipse)
 * centered above the sprite at the wall’s top (ceiling).
 */
function updateSpotlight() {
  const centerX = posX + sprite.clientWidth / 2;
  const lightY  = wall.offsetTop;  // ceiling height

  spotlight.style.background = `
    radial-gradient(
      ellipse 200px 400px at ${centerX}px ${lightY}px,
      transparent 0%,
      rgba(0, 0, 0, 0.95) 80%
    )
  `;
}

window.addEventListener('load', () => {
  // make sprite visible & positioned absolutely
  sprite.style.position = 'absolute';
  sprite.style.opacity  = '1';

  // figure wall dimensions for initial sprite placement
  const wallTop = wall.offsetTop;
  const wallH   = wall.offsetHeight;

  // center the sprite at bottom of the wall
  setTimeout(() => {
    posX = (window.innerWidth - sprite.clientWidth) / 2;
    posY = (wallTop + wallH - sprite.clientHeight / 2) - 100;
    sprite.style.left = posX + 'px';
    sprite.style.top  = posY + 'px';
    updateSpotlight();
  }, 0);
});

window.addEventListener('keydown', e => {
  const step = 10;
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    posX = Math.max(0, posX - step);
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    posX = Math.min(window.innerWidth - sprite.clientWidth, posX + step);
  } else {
    return;
  }

  sprite.style.left = posX + 'px';
  updateSpotlight();
});
