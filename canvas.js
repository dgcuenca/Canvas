let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let x = Math.random() * innerWidth;
let dx = (Math.random() - 0.5)*6; // -0.5 to obtain negative values
let y = Math.random() * innerHeight;
let dy = (Math.random() - 0.5)*6;
let radius = 30;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight); //clean canvas each time we draw
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue';
  c.stroke();
  if ( x + radius > innerWidth || x-radius < 0 ) dx = -dx; // bounce between the width window
  if ( y + radius > innerHeight || y-radius < 0 ) dy = -dy;
  x += dx;
  y += dy;
}

animate();