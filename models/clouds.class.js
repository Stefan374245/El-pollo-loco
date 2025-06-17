class Clouds extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  speed = 0.4;

  constructor() {
    super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 2400;
    this.animate();
  }
   animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
 
  }

}
