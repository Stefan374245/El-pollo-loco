class StatusBar extends DrawableObject {
  IMAGES_HP_BAR = [
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
  ];

IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HP_BAR);
    this.x = 20;
    this.y = 0;
    this.width = 160;
    this.height = 48;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HP_BAR[this.resolveImageIndex()];
    this.img = this.availableImages[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
