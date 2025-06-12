class DrawableObject {
  x = 40;
  y = 390;
  height = 100;
  width = 100;
  img;
  availableImages = {};
  currentImage = 0;
  

  loadImage(path) {
    this.img = new Image();
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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  
  drawFrame(ctx) {
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    } else if (this instanceof Enemy) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
