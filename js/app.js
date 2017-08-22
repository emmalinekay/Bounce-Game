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
  this.color = color;
}

var colorArray = ['#F4EE7C', '#ED523D', '#9BC1BC', '#5D576B'];

Circle.prototype.changeColor = function(){
  var colors = ['#FFE74C', '#6E44FF', '#98C379', '#FF5964'];
  color = colors[Math.floor(Math.random() * 4)];
};


Circle.prototype.draw = function(){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
  ctx.fill();
};

Circle.prototype.update = function(){
  if (this.x + this.ballRadius > canvas.width) {
     this.dx = -this.dx;
   }

   if (this.x - this.ballRadius < 0) {
     this.dx = -this.dx;
   }

   if (this.y + this.ballRadius > canvas.height) {
     this.dy = -this.dy;
   }

   if (this.y - this.ballRadius < 0) {
     this.dy = -this.dy;
   }

     this.x += this.dx;
     this.y += this.dy;

     this.draw();
};




var circleArray = [];

for (var i=0; i < 120; i++) {
  // console.log(randomRadius);
  var ballRadius = Math.floor(Math.random() * 30) + 15 ;
  var x = Math.random() * (canvas.width - ballRadius*2) + ballRadius;
  var y = Math.random() * (canvas.height - ballRadius*2) + ballRadius;
  var dx = (Math.random() - 0.5) * 6;
  var dy = (Math.random() - 0.5) * 6;
  var color = colorArray[Math.floor(Math.random() * colorArray.length)];


  circleArray.push(new Circle(x, y, dx, dy, ballRadius, color));
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i=0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

console.log(circleArray[0].color);



var timeoutHandle;
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1;
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {
            if(mins > 1){
               setTimeout(function () { countdown(mins - 1); }, 1000);
          }
        }
    }
    tick();
}

countdown(1);



var audio = new Audio('./pop.mp3');

//retrieves the x,y coordinates of the mouse click
$("canvas").click(function(e) {
  var offset = $(this).offset();
  var relativeX = (e.pageX - offset.left);
  var relativeY = (e.pageY - offset.top);
  var clickPosition = (relativeX+', '+relativeY);
  console.log(clickPosition);


  circleArray.forEach(function(oneCircle){
    var radiusX = ((relativeX <= (oneCircle.x + ballRadius)) && ( relativeX >= ((oneCircle.x) - ballRadius)));
    var radiusY = ((relativeY <= (oneCircle.y + ballRadius)) && ( relativeY >= ((oneCircle.y) - ballRadius)));

    if(radiusX && radiusY) {
      if(oneCircle.color === '#F4EE7C') {
        oneCircle.color = '#E6EBE0';
        audio.play();
      }
    }
  });

});
