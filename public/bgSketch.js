
// Taken from: https://p5js.org/examples/simulate-particles.html

class Particle {

  constructor() {

    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(1, 8);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  createParticle() {

    noStroke();
    fill('rgba(255, 255, 255, 0.1)');
    circle(this.x, this.y, this.r);
  }

  moveParticle() {

    if (this.x < 0 || this.x > width)
      this.xSpeed *= -1;
    if (this.y < 0 || this.y > height)
      this.ySpeed *= -1;
    
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  joinParticles(pList) {
    pList.forEach(element => {

      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 150) {
        stroke('rgba(255, 255, 255, 0.05)');
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

let particles = [];
let oldWidth, oldHeight;

setup = () => {

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('bg-container');

  oldWidth = windowWidth;
  oldHeight = windowHeight;

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

draw = () => {

  background('#202020');

  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}

windowResized = () => {

  for (let i = 0; i < particles.length; i++) {
    particles[i].x *= windowWidth / oldWidth;
    particles[i].y *= windowHeight / oldHeight;
  }

  oldWidth = windowWidth;
  oldHeight = windowHeight;

  resizeCanvas(windowWidth, windowHeight);
}
