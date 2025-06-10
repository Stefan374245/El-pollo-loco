class Character extends MovableObject {
  height = 160;
  y = 80;
  speed = 5;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ]


  currentImage = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

   moveRight() {
    this.otherDirection = false; // Richtung nach rechts
    this.x += this.speed; // Bewegung nach rechts
  }
  

  movePepeLeft() {
    this.otherDirection = true;
    this.x -= this.speed;
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_point) {
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.movePepeLeft();
      }
      if (this.world.keyboard.JUMP) {
        this.y -= 50;
        setTimeout(() => {
          this.y += 50;
        }, 100);
      } 
      this.world.camera_x = -this.x + 100;
    }, 1000 / 30);

    setInterval(() => {
      if (this.isJumping()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}