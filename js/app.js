const intro     = document.getElementById('intro');
const wall      = document.getElementById('wall');
const floor     = document.getElementById('floor');
const spotlight = document.getElementById('spotlight');
const sprite    = document.getElementById('sprite');
const frames    = document.querySelectorAll('.frame');

let posX = 0, posY = 0;

/* Typing helper */
function typeText(el, text, speed=150) {
  return new Promise(res => {
    let i = 0;
    const iv = setInterval(() => {
      el.textContent += text[i++];
      if (i === text.length) {
        clearInterval(iv);
        res();
      }
    }, speed);
  });
}
/* Backspace helper */
function deleteText(el, count, speed=100) {
  return new Promise(res => {
    let i=0;
    const iv = setInterval(() => {
      el.textContent = el.textContent.slice(0, -1);
      if (++i >= count) {
        clearInterval(iv);
        res();
      }
    }, speed);
  });
}

/* Load your PNGs into each frame */
function loadFrames() {
  frames.forEach(f => {
    const imgPath = f.dataset.img.trim();
    if (imgPath) {
      const imgEl = f.querySelector('.frame-img');
      imgEl.src = imgPath;
    }
    f.classList.add('visible');
  });
}

/* Kick off the reveal */
function beginScene() {
  // position sprite at bottom of wall
  const wallTop = wall.offsetTop, wallH = wall.offsetHeight;
  posX = (window.innerWidth - sprite.clientWidth)/2;
  posY = (wallTop + wallH - sprite.clientHeight/2);
  sprite.style.left = posX + 'px';
  sprite.style.top  = posY + 'px';

  // fade in wall, floor, frames & sprite
  setTimeout(() => {
    wall.classList.add('visible');
    floor.classList.add('visible');
    loadFrames();
    sprite.classList.add('visible');
  }, 50);

  // then draw & fade in spotlight
  setTimeout(() => {
    updateSpotlight();
    spotlight.classList.add('visible');
  }, 2050);
}

/* Re-draw the overhead cone */
function updateSpotlight() {
  const cx = posX + sprite.clientWidth/2;
  const cy = wall.offsetTop;
  spotlight.style.background = `
    radial-gradient(
      ellipse var(--spotlight-width) var(--spotlight-height)
      at ${cx}px ${cy}px,
      transparent 20%,
      var(--spotlight-color) 60%
    )
  `;
}

/* Main */
window.addEventListener('load', async () => {
  await typeText(intro, 'welcome', 150);
  await new Promise(r=>setTimeout(r,500));
  await deleteText(intro,7,100);

  await typeText(intro,'(insert ominous words)',150);
  await new Promise(r=>setTimeout(r,500));
  await deleteText(intro,22,100);

  intro.style.opacity = '0';
  await new Promise(r=>setTimeout(r,500));
  intro.style.display = 'none';

  beginScene();
});

/* Sprite movement */
window.addEventListener('keydown', e => {
  const step = 10;
  if (e.key==='ArrowLeft'||e.key==='a')      posX = Math.max(0, posX-step);
  else if (e.key==='ArrowRight'||e.key==='d') posX = Math.min(window.innerWidth - sprite.clientWidth, posX+step);
  else return;
  sprite.style.left = posX + 'px';
  updateSpotlight();
});
