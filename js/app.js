var circleArray = [];
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var colorArray = ['#F4EE7C', '#ED523D', '#9BC1BC', '#5D576B'];
var ballRadius;

//size of game resizes with window.
canvas.width = window.innerWidth;
canvas.height = 600;


//opening instruction modal
$(window).on('load',function(){
    $('#myModal').modal('show');
});

//function to build circles
function Circle(x, y, dx, dy, ballRadius, color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.ballRadius = ballRadius;
  this.color = color;
}

//color function for the circles
Circle.prototype.changeColor = function(){
  var colors = ['#FFE74C', '#6E44FF', '#98C379', '#FF5964'];
  color = colors[Math.floor(Math.random() * 4)];
};

// draw function for the circles
Circle.prototype.draw = function(){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
  ctx.fill();
};

//function that allows circles to bounce off the walls.
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

function ballFlow(){
//randomization function for the circles.
for (var i=0; i < 120; i++) {
  console.log('d: ' + ballRadius);
  var ballRadius = Math.floor(Math.random() * 30) + 15 ; //min radius of 15 and max of 30
  var x = Math.random() * (canvas.width - ballRadius*2) + ballRadius;
  var y = Math.random() * (canvas.height - ballRadius*2) + ballRadius;
  var dx = (Math.random() - 0.5) * 4;
  var dy = (Math.random() - 0.5) * 4;
  var color = colorArray[Math.floor(Math.random() * colorArray.length)];

  circleArray.push(new Circle(x, y, dx, dy, ballRadius, color));
  }
}

//animate the circles.
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i=0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}


ballFlow();
animate();


//Timer for 1 minute
var timeoutHandle;
function countdown(minutes) {
    var seconds = 30;
    var mins = minutes;
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1;
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        }
        else if (seconds === 0) {
            game.checkResult();
        }
        else {
            if(mins > 1){
               setTimeout(function () { countdown(mins - 1); }, 1000);
          }
        }
    }
    tick();
}

//audio for the correctly selected circle
var audio = new Audio('./poppop.mp3');

var hexcolor = colorArray[Math.floor(Math.random() * colorArray.length)];
document.getElementById("glyphicon").style.color = hexcolor;

//retrieves the x,y coordinates of the mouse click
$("canvas").click(function(e) {
  var offset = $(this).offset();
  var relativeX = (e.pageX - offset.left);
  var relativeY = (e.pageY - offset.top);
  var clickPosition = (relativeX+', '+relativeY);
  console.log(clickPosition);


//retrieves the coordinates of the entire circle
  circleArray.forEach(function(oneCircle){
    // var ballRadius = ballRadius;
    // console.log(oneCircle.ballRadius);
    var radiusX = ((relativeX <= (oneCircle.x + oneCircle.ballRadius)) && ( relativeX >= ((oneCircle.x) - oneCircle.ballRadius)));
    var radiusY = ((relativeY <= (oneCircle.y + oneCircle.ballRadius)) && ( relativeY >= ((oneCircle.y) - oneCircle.ballRadius)));

//what happens when the correct color circle is clicked.
    if(radiusX && radiusY) {
      if(oneCircle.color === hexcolor) {
        oneCircle.color = '#E6EBE0';
        oneCircle.ballRadius = 13;
        audio.play();
      }
      if(oneCircle.color != hexcolor) {
        $('#winningModal').modal('show');
      }
    }
  });
});
