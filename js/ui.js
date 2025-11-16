window.FlappyBird = window.FlappyBird || {};

const restartButton = document.getElementById('restart-btn');

function drawBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#8be1f7');
  gradient.addColorStop(1, '#4cc4f7');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fillRect(60, 80, 80, 22);
  ctx.fillRect(120, 60, 60, 16);
  ctx.fillRect(260, 100, 90, 24);

  ctx.fillStyle = '#4cc0d8';
  ctx.fillRect(0, height - 80, width, 80);

  ctx.fillStyle = '#1f8fb8';
  ctx.fillRect(0, height - 60, width, 60);

  ctx.fillStyle = '#16779b';
  for (let i = 0; i < width / 20; i += 1) {
    ctx.fillRect(i * 20, height - 60, 10, 10);
  }
}

function drawScore(ctx, score, width) {
  ctx.save();
  ctx.font = 'bold 48px "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText(String(score), width / 2, 80);
  ctx.restore();
}

function drawStartScreen(ctx, width, height) {
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px "Segoe UI", sans-serif';
  ctx.fillText('Flappy Turd', width / 2, height / 2 - 40);
  ctx.font = '24px "Segoe UI", sans-serif';
  ctx.fillText('Press Space or Tap to Start', width / 2, height / 2 + 10);
  ctx.restore();
}

function drawGameOver(ctx, width, height, score) {
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 40px "Segoe UI", sans-serif';
  ctx.fillText('Turd Down!', width / 2, height / 2 - 50);
  ctx.font = '24px "Segoe UI", sans-serif';
  ctx.fillText(`Score: ${score}`, width / 2, height / 2);
  ctx.font = '20px "Segoe UI", sans-serif';
  ctx.fillText('Press Space or Tap to Retry', width / 2, height / 2 + 40);
  ctx.restore();
}

function toggleRestartButton(show) {
  if (show) {
    restartButton.classList.add('show');
  } else {
    restartButton.classList.remove('show');
  }
}

function bindRestart(handler) {
  restartButton.addEventListener('click', handler);
}

window.FlappyBird.UI = {
  drawBackground,
  drawScore,
  drawStartScreen,
  drawGameOver,
  toggleRestartButton,
  bindRestart,
};

