let canvas;

function init() {
  canvas = document.getElementById('canvas');
   gameManager.canvas = canvas;
  gameManager.gameRunning = true;
  gameManager.currentWorld = new World(canvas, gameManager.keyboard);

}

document.addEventListener('keydown', (event) => {

  switch (event.code) {
    case 'ArrowRight':
    case 'KeyD':
      gameManager.keyboard.RIGHT = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      gameManager.keyboard.LEFT = true;
      break;
    case 'ArrowUp':
    case 'KeyW':
      gameManager.keyboard.UP = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      gameManager.keyboard.DOWN = true;
      break;
    case 'Space':
      console.log('SPACE gedrückt!');
      gameManager.keyboard.JUMP = true;
      break;
    case 'Enter':
      gameManager.keyboard.F = true;
      break;
    case 'KeyF':
      gameManager.keyboard.F = true;
  }
  console.log(event.code);
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowRight':
    case 'KeyD':
      gameManager.keyboard.RIGHT = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      gameManager.keyboard.LEFT = false;
      break;
    case 'ArrowUp':
    case 'KeyW':
      gameManager.keyboard.UP = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      gameManager.keyboard.DOWN = false;
      break;
    case 'Space':
      gameManager.keyboard.JUMP = false;
      break;
    case 'Enter':
      gameManager.keyboard.THROW = false;
      break;
    case 'KeyF':
      gameManager.keyboard.F = false;
  }
  console.log(event.code);
});
