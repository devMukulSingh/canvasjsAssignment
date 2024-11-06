let circles = [];
const mainCanvas = document.getElementById("canvasElement");
const ctx = mainCanvas.getContext("2d");
  ctx.scale(1.5, 1.5);

const colors = [
  "yellow",
  "blue",
  "red",
  "green",
  "pink",
  "purple",
  "black",
  "orange",
  "brown",
];

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.circle = new Path2D();
  }
  drawCircle() {
    this.circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fill(this.circle);
    ctx.stroke();
  }
  changeColor(color) {
    ctx.fillStyle = color;
    ctx.fill(this.circle);
    ctx.stroke();
  }
}

class Arrow {
  constructor(width, height, x, y, triangleX, triangleY, color, speed) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = 1 * speed;
    this.triangleX = triangleX;
    this.triangleY = triangleY;
  }
  drawTriangle() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    //center,start,end
    ctx.moveTo(this.triangleX, this.triangleY);
    ctx.lineTo(this.triangleX, this.triangleY + 20);
    ctx.lineTo(this.triangleX - 20, this.triangleY + 10);
    ctx.lineTo(this.triangleX, this.triangleY);
    ctx.stroke();
  }
  drawRectangle() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
  }
  drawArrow() {
    this.drawTriangle();
    this.drawRectangle();
  }
  update(clearY) {
    if (this.x <= 109) {
      return true;
    }
    ctx.clearRect(90, clearY, mainCanvas.width, 100);
    this.drawArrow();
    this.x = this.x - this.dx;
    this.triangleX = this.triangleX - this.dx;
  }
}
mainCanvas.onclick = (e) => {
  circles.forEach((circle) => {
    if (ctx.isPointInPath(circle.circle, e.offsetX, e.offsetY)) {
      //   console.log(circle);
      const arrow = new Arrow(
        50,
        8,
        705,
        circle.y,
        705,
        circle.y - 5,
        "black",
        4
      );
      function moveArrow() {
        const isCompleted = arrow.update(circle.y - 30) || false;
        if (!isCompleted) requestAnimationFrame(moveArrow);
        else circle.changeColor(colors[Math.floor(Math.random() * 10)]);
      }
      moveArrow();
      return;
    }
  });
};

function main() {

  for (let i = 0; i < 4; i++) {
    const circle = new Circle(50, 50 + 100 * i, 40, colors[i], ctx);
    circle.drawCircle();
    circles.push(circle);
  }
  for (let i = 0; i < 4; i++) {
    const arrow = new Arrow(
      50,
      8,
      705,
      50 + 100 * i,
      705,
      45 + 100 * i,
      "black",
      1,
      ctx
    );
    arrow.drawArrow();
  }
}

function handleReset() {
  ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  main();
}

main();
