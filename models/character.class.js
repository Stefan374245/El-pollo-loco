class Character extends MovableObject {
  height = 160;
  y = 280;
  speed = 5;
  IMAGES_WALKING_RIGHT = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_WALKING_LEFT = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
  ];

  currentImage = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING_RIGHT);
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
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_WALKING_RIGHT.length; // Use modulo to cycle through images let = i = 7 % 6 ; =>  1, Rest 1 -- > i = 0 , 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 ...
        let path = this.IMAGES_WALKING_RIGHT[i];
        this.img = this.availableImages[path];
        this.currentImage++;
      }
      
    }, 100);
  }


}


