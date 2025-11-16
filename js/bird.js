window.FlappyBird = window.FlappyBird || {};

const GRAVITY = 980; // pixels per second squared
const FLAP_STRENGTH = 320; // upward velocity in px/s
const BIRD_RADIUS = 14;

function drawPixelBird(ctx, centerX, centerY) {
  const unit = 4;
  const startX = centerX - 5 * unit;
  const startY = centerY - 5 * unit;

  const palette = {
    0: null,
    1: '#2a1f0f', // outline
    2: '#8d5a28', // body
    3: '#b07a44', // highlights
    4: '#f7d488', // sparkle
    5: '#1f2933', // eyes
  };

  const sprite = [
    '000010000',
    '000121000',
    '001222100',
    '012233210',
    '012333210',
    '012333210',
    '001233100',
    '000133000',
    '000155000',
    '000010000',
  ];

  ctx.save();
  for (let y = 0; y < sprite.length; y += 1) {
    const row = sprite[y];
    for (let x = 0; x < row.length; x += 1) {
      const color = palette[row[x]];
      if (!color) {
        continue;
      }
      ctx.fillStyle = color;
      ctx.fillRect(startX + x * unit, startY + y * unit, unit, unit);
    }
  }
  ctx.restore();
}

class Bird {
  constructor(x, y) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.velocityY = 0;
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.velocityY = 0;
  }

  update(delta) {
    this.velocityY += GRAVITY * delta;
    this.y += this.velocityY * delta;
  }

  flap() {
    this.velocityY = -FLAP_STRENGTH;
  }

  getBounds() {
    return {
      top: this.y - BIRD_RADIUS,
      bottom: this.y + BIRD_RADIUS,
      left: this.x - BIRD_RADIUS,
      right: this.x + BIRD_RADIUS,
      radius: BIRD_RADIUS,
    };
  }

  draw(ctx) {
    drawPixelBird(ctx, this.x, this.y);
  }
}

window.FlappyBird.Bird = Bird;
window.FlappyBird.BIRD_RADIUS = BIRD_RADIUS;

