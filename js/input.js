window.FlappyBird = window.FlappyBird || {};

const listeners = {
  flap: null,
};

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

function initInput() {
  window.addEventListener('keydown', handleKeyDown);
}

window.FlappyBird.Input = {
  bindFlap,
  initInput,
};

