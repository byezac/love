let highestZ = 1;
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Prevenir comportamento padrão (como rolar a tela)
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault(); 
    }, { passive: false });

    // Evento de mouse
    document.addEventListener('mousemove', (e) => this.onMove(e));

    // Evento de toque
    document.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });

    paper.addEventListener('mousedown', (e) => this.onStart(e));
    paper.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });

    window.addEventListener('mouseup', () => this.onEnd());
    window.addEventListener('touchend', () => this.onEnd());
  }

  onMove(e) {
    if (!this.holdingPaper) return;
    
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.updatePosition(e.target);
  }

  onTouchMove(e) {
    if (!this.holdingPaper || e.touches.length !== 1) return;

    const touch = e.touches[0];
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;
    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.updatePosition(e.target);
  }

  onStart(e) {
    if (this.holdingPaper) return;

    this.holdingPaper = true;
    this.mouseTouchX = e.clientX;
    this.mouseTouchY = e.clientY;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;

    this.bringToFront(e.target);
  }

  onTouchStart(e) {
    if (this.holdingPaper || e.touches.length !== 1) return;

    const touch = e.touches[0];
    this.holdingPaper = true;
    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;
    this.prevMouseX = touch.clientX;
    this.prevMouseY = touch.clientY;

    this.bringToFront(e.target);
  }

  updatePosition(paper) {
    if (!this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    }

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  bringToFront(paper) {
    paper.style.zIndex = highestZ;
    highestZ += 1;
  }

  onEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
