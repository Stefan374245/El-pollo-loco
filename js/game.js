let canvas;
let world;
let keyboard = new KeyBoard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("my Character is", world.character);
}


document.addEventListener("keydown", (event) => {
  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D')
    keyboard.RIGHT = true;
  if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A')
    keyboard.LEFT = true;
  if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W')
    keyboard.UP = true;
  if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S')
    keyboard.DOWN = true;
  if (event.key === ' ' || event.key === 'Spacebar')
    keyboard.JUMP = true;
  if (event.key === 'Enter')
    keyboard.THROW = true;
  console.log(event);
});

document.addEventListener("keyup", (event) => {
  if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D')
    keyboard.RIGHT = false;
  if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A')
    keyboard.LEFT = false;
  if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S')
    keyboard.DOWN = false;
  if (event.key === ' ' || event.key === 'Spacebar')
    keyboard.JUMP = false;
  if (event.key === 'Enter')
    keyboard.THROW = false;
  console.log(event);
});