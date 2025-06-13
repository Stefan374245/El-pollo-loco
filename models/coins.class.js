class Coins extends MovableObject {
  IMAGES_ROTATING = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  width = 72;
  height = 72;
 

  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_ROTATING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING);
    }, 200);
  }
}