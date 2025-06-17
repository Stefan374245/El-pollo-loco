class StatusBarEndboss extends DrawableObject {
IMAGES_HP_BAR = [
    'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HP_BAR);
    this.x = 500;
    this.y = 20;
    this.width = 200;
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