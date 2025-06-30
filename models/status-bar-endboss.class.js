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
  maxHp = 100;
  currentHp = 100;

  constructor(maxHp = 100) {
    super();
    this.loadImages(this.IMAGES_HP_BAR);
    this.x = 500;
    this.y = 20;
    this.width = 200;
    this.height = 48;
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.setPercentage(100);
  }

  setMaxHp(maxHp) {
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    
    if (this.percentage < 0) this.percentage = 0;
    if (this.percentage > 100) this.percentage = 100;
    
    let path = this.IMAGES_HP_BAR[this.resolveImageIndex()];
    this.img = this.availableImages[path];
    
    const currentHp = Math.round((this.percentage / 100) * this.maxHp);
    const hitsToKill = Math.ceil(currentHp / 20);
    const imageIndex = this.resolveImageIndex();
    console.log(`StatusBar Update: ${currentHp}/${this.maxHp} (${Math.round(this.percentage)}%) - Noch ${hitsToKill} Hits - Image: orange${imageIndex === 0 ? '0' : imageIndex === 1 ? '20' : imageIndex === 2 ? '40' : imageIndex === 3 ? '60' : imageIndex === 4 ? '80' : '100'}.png`);
  }

  resolveImageIndex() {

    if (this.percentage >= 100) {
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

  getHealthInfo() {
    const currentHp = Math.round((this.percentage / 100) * this.maxHp);
    return {
      currentHp: currentHp,
      maxHp: this.maxHp,
      percentage: Math.round(this.percentage),
      hitsRemaining: Math.ceil(currentHp / 20) // Bei 20 Schaden pro Hit
    };
  }
}