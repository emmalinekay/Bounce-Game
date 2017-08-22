var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, ballRadius, color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.ballRadius = ballRadius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
}

Circle.prototype.changeColor = function(){
  var colors = ['#FFE74C', '#6E44FF', '#98C379', '#FF5964'];
  color = colors[Math.floor(Math.random() * 4)];
};

var colorArray = ['#FFE74C', '#6E44FF', '#98C379', '#FF5964'];


Circle.prototype.draw = function(){
  ctx.beginPath();
   ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
  //  ctx.fillStyle = 'blue';
   ctx.fill();
   ctx.fillStyle = this.color;
};

Circle.prototype.update = function(){
  if (this.x + this.ballRadius > canvas.width) {
     this.dx = -this.dx;
    //  ctx.fillStyle = 'blue';
   }

   if (this.x - this.ballRadius < 0) {
     this.dx = -this.dx;
    //  ctx.fillStyle = 'red';
   }

   if (this.y + this.ballRadius > canvas.height) {
     this.dy = -this.dy;
      // ctx.fillStyle = 'orange';
   }

   if (this.y - this.ballRadius < 0) {
     this.dy = -this.dy;
      // ctx.fillStyle = 'green';
   }

     this.x += this.dx;
     this.y += this.dy;

    //  this.changeColor();
     this.draw();
};



var circleArrary = [];

for (var i=0; i < 200; i++) {
  var ballRadius = 15;
  var x = Math.random() * (canvas.width - ballRadius*2) + ballRadius;
  var y = Math.random() * (canvas.height - ballRadius*2) + ballRadius;
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;

  circleArrary.push(new Circle(x, y, dx, dy, ballRadius, 'red'));
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i=0; i < circleArrary.length; i++) {
    circleArrary[i].update();
    // circleArrary[i].changeColor();
  }
}

animate();


var element = Circle;

$(element).addEventListener("click", function(){
  console.log('Hey');
});
