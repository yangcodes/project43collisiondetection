const canvasEl = document.querySelector("canvas");
const canvasContext = canvasEl.getContext("2d");

canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

//runBalls class
class RunBalls {
  constructor(xP, yP, xV, yV, radius, red, green, blue) {
    this.xP = xP;
    this.yP = yP;
    this.xV = xV;
    this.yV = yV;
    this.radius = radius;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  //drawing the balls
  drawBalls = function () {
    canvasContext.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    canvasContext.beginPath();
    canvasContext.arc(this.xP, this.yP, this.radius, 0, Math.PI * 2);
    canvasContext.fill();
  };
  //collision detection on edges
  updateBalls = function () {
    if (this.xP + this.radius > canvasEl.width || this.xP - this.radius < 0) {
      this.xV = -this.xV;
    }
    if (this.yP + this.radius > canvasEl.height || this.yP - this.radius < 0) {
      this.yV = -this.yV;
    }

    this.xP += this.xV;
    this.yP += this.yV;

    this.drawBalls();
  };
}

//balls array
let ballsArray = [];
for (let i = 0; i < 500; i++) {
  let radius = 30;
  let xP = Math.random() * (canvasEl.width - radius * 2) + radius;
  let yP = Math.random() * (canvasEl.height - radius * 2) + radius;
  let xV = (Math.random() - 0.5) * 2;
  let yV = (Math.random() - 0.5) * 2;
  let red = Math.ceil(Math.random() * 255);
  let green = Math.ceil(Math.random() * 255);
  let blue = Math.ceil(Math.random() * 255);

  ballsArray.push(new RunBalls(xP, yP, xV, yV, radius, red, green, blue));
}

//the game loop
function animatedBalls() {
  requestAnimationFrame(animatedBalls);
  canvasContext.clearRect(0, 0, canvasEl.width, canvasEl.height);

  for (let k = 0; k < ballsArray.length; k++) {
    ballsArray[k].updateBalls();
  }
}
animatedBalls();
