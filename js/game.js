let canvas;
let world;
let keyboard = new KeyBoard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("my Character is", world.character);
}

document.addEventListener("keydown", (event) => {

  switch (event.code) {
    case "ArrowRight":
    case "KeyD":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      keyboard.LEFT = true;
      break;
    case "ArrowUp":
    case "KeyW":
      keyboard.UP = true;
      break;
    case "ArrowDown":
    case "KeyS":
      keyboard.DOWN = true;
      break;
    case "Space":
      console.log("SPACE gedrückt!");
      keyboard.JUMP = true;
      break;
    case "Enter":
      keyboard.THROW = true;
      break;
      case "KeyF":
      keyboard.F = true;
  }
  console.log(event.code);
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowRight":
    case "KeyD":
      keyboard.RIGHT = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      keyboard.LEFT = false;
      break;
    case "ArrowUp":
    case "KeyW":
      keyboard.UP = false;
      break;
    case "ArrowDown":
    case "KeyS":
      keyboard.DOWN = false;
      break;
    case "Space":
      keyboard.JUMP = false;
      break;
    case "Enter":
      keyboard.THROW = false;
      break;
      case "KeyF":
      keyboard.F = false;
  }
  console.log(event.code);
});
