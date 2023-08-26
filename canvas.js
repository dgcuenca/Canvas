let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', 
function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

})

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function() {
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = color;
    c.stroke();
  }
  this.update = function() {
    if ( x + radius > innerWidth || x-radius < 0 ) dx = -dx; // bounce between the width window
    if ( y + radius > innerHeight || y-radius < 0 ) dy = -dy;
    x += dx;
    y += dy;
    // interactivity to increse circle radius
    if ( mouse.x - x < 50 && mouse.x - x > -50 && mouse.y - y < 50 && mouse.y - y > -50) {
      radius ++;
    } else if (radius >2) { // so circle dont disappear
      radius --;
    }
  }
}

let circleArray = [];
for (let i= 0; i<100; i++) {
  let radius = 30;
  let x = Math.random() * (innerWidth - radius *2) + radius; // prevent circles draw only inside canvas and not in borders
  let dx = (Math.random() - 0.5)*6; // -0.5 to obtain negative values so circles can start moving in any direction
  let y = Math.random() * (innerHeight- radius *2) + radius;
  let dy = (Math.random() - 0.5)*6;
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  // Convert the RGB values to a CSS color string
  const color = `rgb(${red}, ${green}, ${blue})`;
  circleArray.push(new Circle(x, y, dx, dy, radius,color))
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight); //clean canvas each time we draw
  for (let i = 0; i<circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
}

animate();