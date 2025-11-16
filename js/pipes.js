window.FlappyBird = window.FlappyBird || {};

const PIPE_WIDTH = 70;
const PIPE_GAP = 120;
const PIPE_SPEED = 120; // pixels per second

class PipePair {
  constructor(x, canvasHeight) {
    this.x = x;
    this.width = PIPE_WIDTH;
    this.speed = PIPE_SPEED;
    this.canvasHeight = canvasHeight;

    this.gapSize = PIPE_GAP;
    this.resetGap();

    this.scored = false;
  }

  resetGap() {
    const margin = 60;
    const maxGapStart = this.canvasHeight - margin - this.gapSize;
    this.gapY = Math.floor(Math.random() * (maxGapStart - margin + 1)) + margin;
  }

  update(delta) {
    this.x -= this.speed * delta;
  }

  isOffScreen() {
    return this.x + this.width < 0;
  }

  hasPassed(xPosition) {
    if (!this.scored && this.x + this.width < xPosition) {
      this.scored = true;
      return true;
    }
    return false;
  }

  collides(birdBounds) {
    const withinX =
      birdBounds.right > this.x && birdBounds.left < this.x + this.width;
    if (!withinX) {
      return false;
    }

    const hitsTop = birdBounds.top < this.gapY;
    const hitsBottom = birdBounds.bottom > this.gapY + this.gapSize;
    return hitsTop || hitsBottom;
  }

  draw(ctx) {
    const pipeBodyColor = '#4aa3f0';
    const pipeEdgeColor = '#2f6fb3';

    ctx.fillStyle = pipeBodyColor;
    ctx.fillRect(this.x, 0, this.width, this.gapY);
    ctx.fillRect(
      this.x,
      this.gapY + this.gapSize,
      this.width,
      this.canvasHeight - (this.gapY + this.gapSize)
    );

    ctx.fillStyle = pipeEdgeColor;
    ctx.fillRect(this.x - 4, this.gapY - 14, this.width + 8, 14);
    ctx.fillRect(
      this.x - 4,
      this.gapY + this.gapSize,
      this.width + 8,
      14
    );

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(this.x + this.width - 10, 0, 6, this.gapY);
    ctx.fillRect(
      this.x + this.width - 10,
      this.gapY + this.gapSize,
      6,
      this.canvasHeight - (this.gapY + this.gapSize)
    );
  }
}

class PipeManager {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.pipes = [];
    this.spawnInterval = 1.6; // seconds
    this.spawnTimer = 0;
  }

  reset() {
    this.pipes = [];
    this.spawnTimer = this.spawnInterval * 0.3;
  }

  update(delta) {
    this.spawnTimer += delta;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.pipes.push(new PipePair(this.canvasWidth + PIPE_WIDTH, this.canvasHeight));
    }

    this.pipes.forEach((pipe) => pipe.update(delta));
    this.pipes = this.pipes.filter((pipe) => !pipe.isOffScreen());
  }

  checkCollisions(birdBounds) {
    return this.pipes.some((pipe) => pipe.collides(birdBounds));
  }

  updateScore(birdX) {
    let scored = 0;
    this.pipes.forEach((pipe) => {
      if (pipe.hasPassed(birdX)) {
        scored += 1;
      }
    });
    return scored;
  }

  draw(ctx) {
    this.pipes.forEach((pipe) => pipe.draw(ctx));
  }
}

window.FlappyBird.PipeManager = PipeManager;
window.FlappyBird.PIPE_WIDTH = PIPE_WIDTH;

