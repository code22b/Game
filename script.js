const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
let score = 0;
let gameInterval;

function movePlayer(e) {
  const left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  if (e.key === 'ArrowLeft' && left > 0) {
    player.style.left = left - 20 + 'px';
  } else if (e.key === 'ArrowRight' && left < 360) {
    player.style.left = left + 20 + 'px';
  }
}

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.floor(Math.random() * 360) + 'px';
  gameArea.appendChild(obstacle);

  let fallInterval = setInterval(() => {
    const top = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
    if (top > 460) {
      clearInterval(fallInterval);
      obstacle.remove();
      score++;
      document.getElementById('score').textContent = 'Score: ' + score;
    } else {
      obstacle.style.top = top + 5 + 'px';
    }

    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    const obstacleLeft = parseInt(obstacle.style.left);
    if (top > 440 && obstacleLeft >= playerLeft && obstacleLeft < playerLeft + 40) {
      alert('Game Over! Final Score: ' + score);
      clearInterval(fallInterval);
      clearInterval(gameInterval);
      window.location.reload();
    }
  }, 50);
}

document.addEventListener('keydown', movePlayer);
gameInterval = setInterval(createObstacle, 1000);
