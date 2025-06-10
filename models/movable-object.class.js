class MovableObject {
  x = 40;
  y = 340;
  img;
  height = 100;
  width = 100;
  availableImages = {};
  currentImage = 0;
  speed = 10;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementbyId("image")    <img id= 'image' src>
    this.img.src = path;
  }
  /**
 * 
 * @param {*} imageArray  Array of image paths to be loaded
 
 */
  loadImages(imageArray) {
    imageArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.availableImages[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x > 500) {
        this.x = -500;
      }
    }, 100 / 30);
  }
}
