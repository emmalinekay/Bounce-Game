
var game = new NewGame();


function NewGame(){
  this.color = 0;
  this.time = 1;
  this.hasWon = false;
}

NewGame.prototype.checkResult = function(){
  console.log('hey');

circleArray.forEach(function(oneCircle){
  var color = oneCircle.color;

  if (oneCircle.color != '#F4EE7C') {
    $('#winningModal').modal('show');
  } else {
    $('#losingModal').modal('show');
  }

});
};
