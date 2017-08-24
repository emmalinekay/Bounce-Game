
var game = new NewGame();


function NewGame(){
  this.color = 0;
  this.time = 1;
  this.hasWon = false;
  this.score = 1;
}



NewGame.prototype.checkResult = function(){
circleArray.forEach(function(oneCircle){
  var color = oneCircle.color;
  if (color != hexcolor) {
    $('#winningModal').modal('show');
  } else {
    $('#losingModal').modal('show');
  }

});
};

    
