window.FlappyBird = window.FlappyBird || {};

const GAME_STATES = {
  START: 'start',
  RUNNING: 'running',
  GAME_OVER: 'game_over',
};

const GROUND_HEIGHT = 60;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    const { Bird } = window.FlappyBird;
    const { PipeManager } = window.FlappyBird;
    const { UI } = window.FlappyBird;
    const { Input } = window.FlappyBird;

    this.bird = new Bird(canvas.width * 0.35, canvas.height / 2);
    this.pipes = new PipeManager(canvas.width, canvas.height - GROUND_HEIGHT);
    this.pipes.reset();

    this.state = GAME_STATES.START;
    this.score = 0;
    this.lastTime = null;

    Input.bindFlap(() => this.handleFlap());
    UI.bindRestart(() => this.restart());

    UI.toggleRestartButton(false);
    this.ui = UI;
    this.loop = this.loop.bind(this);
  }

  handleFlap() {
    if (this.state === GAME_STATES.START) {
      this.start();
      this.bird.flap();
    } else if (this.state === GAME_STATES.RUNNING) {
      this.bird.flap();
    } else if (this.state === GAME_STATES.GAME_OVER) {
      this.restart();
    }
  }

  start() {
    this.state = GAME_STATES.RUNNING;
    this.lastTime = null;
    this.ui.toggleRestartButton(false);
  }

  restart() {
    this.state = GAME_STATES.START;
    this.score = 0;
    this.lastTime = null;
    this.bird.reset();
    this.pipes.reset();
    this.ui.toggleRestartButton(false);
  }

  gameOver() {
    this.state = GAME_STATES.GAME_OVER;
    this.ui.toggleRestartButton(true);
  }

  update(delta) {
    if (this.state !== GAME_STATES.RUNNING) {
      return;
    }

    this.bird.update(delta);
    this.pipes.update(delta);

    this.score += this.pipes.updateScore(this.bird.x);

    const bounds = this.bird.getBounds();

    if (bounds.top <= 0 || bounds.bottom >= this.canvas.height - GROUND_HEIGHT) {
      this.gameOver();
      return;
    }

    if (this.pipes.checkCollisions(bounds)) {
      this.gameOver();
    }
  }

  draw() {
    const { ctx, canvas } = this;
    const UI = this.ui;
    UI.drawBackground(ctx, canvas.width, canvas.height);

    this.pipes.draw(ctx);
    this.bird.draw(ctx);
    UI.drawScore(ctx, this.score, canvas.width);

    if (this.state === GAME_STATES.START) {
      UI.drawStartScreen(ctx, canvas.width, canvas.height);
    } else if (this.state === GAME_STATES.GAME_OVER) {
      UI.drawGameOver(ctx, canvas.width, canvas.height, this.score);
    }
  }

  loop(timestamp) {
    if (!this.lastTime) {
      this.lastTime = timestamp;
    }
    const delta = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(delta);
    this.draw();

    requestAnimationFrame(this.loop);
  }

  run() {
    requestAnimationFrame(this.loop);
  }
}

window.FlappyBird.Game = Game;
window.FlappyBird.GAME_STATES = GAME_STATES;
window.FlappyBird.GROUND_HEIGHT = GROUND_HEIGHT;

