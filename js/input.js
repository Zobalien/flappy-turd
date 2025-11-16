window.FlappyBird = window.FlappyBird || {};

const listeners = {
  flap: null,
};

let boundCanvas = null;

function handleKeyDown(event) {
  if (event.code !== 'Space') {
    return;
  }
  event.preventDefault();
  if (typeof listeners.flap === 'function') {
    listeners.flap();
  }
}

function bindFlap(handler) {
  listeners.flap = handler;
}

function handlePointerOrClick(event) {
  // Prevenim scroll-ul accidental pe mobil și comportamentul implicit al atingerii
  if (event.cancelable) {
    event.preventDefault();
  }

  if (typeof listeners.flap === 'function') {
    listeners.flap();
  }
}

function initInput(canvas) {
  window.addEventListener('keydown', handleKeyDown);

  boundCanvas = canvas || null;

  const target = boundCanvas || window;

  // Suport pentru atingere (mobil) și click/pointer (desktop)
  target.addEventListener('pointerdown', handlePointerOrClick);
  target.addEventListener('touchstart', handlePointerOrClick, { passive: false });
  target.addEventListener('mousedown', handlePointerOrClick);
}

window.FlappyBird.Input = {
  bindFlap,
  initInput,
};

