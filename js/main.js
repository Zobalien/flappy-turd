window.FlappyBird = window.FlappyBird || {};

window.addEventListener('DOMContentLoaded', () => {
  const { Game, Input } = window.FlappyBird;

  if (!Game || !Input) {
    console.error('FlappyBird game dependencies missing.');
    return;
  }

  const canvas = document.getElementById('game-canvas');

  Input.initInput(canvas);

  const game = new Game(canvas);
  game.run();
});

