class MobileWorld extends World {
  constructor(canvas, keyboard, levelNumber = 1) {
    super(canvas, keyboard, levelNumber);
    this.isInMobileMenu = true;
    this.showMobileStartScreen();
  }

  showMobileStartScreen() {
    document.getElementById("background").classList.add("blur");
    const startScreen = document.getElementById("startScreen");
    startScreen.classList.add("active");
    startScreen.innerHTML = getMobileStartScreenTemplate();
  }

  showMobileInfo() {
    const startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = getMobileInfoTemplate();
  }

  backToStartScreen() {
    this.showMobileStartScreen();
  }

}
