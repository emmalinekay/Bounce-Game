
var game = new NewGame();


function NewGame(){
  this.color = 0;
  this.time = 1;
  this.hasWon = false;
  this.score = 1;
  this.balls = 120;

  $('.score span').html(this.score);
}



NewGame.prototype.checkWin = function(){
  for (i=0; i < colorPick.length; i++)
  if(grey === colorPick.length) {
    $('#winningModal').modal('show');
  }
};

NewGame.prototype.checkResult = function(){
  for (i=0; i < circleArray.length; i++)
  if(circleArray[i].color === hexcolor) {
    $('#losingModal').modal('show');
    return;
  }
  for (i=0; i < circleArray.length; i++)
  if(circleArray[i].color != hexcolor) {
    $('#winningModal').modal('show');
  }
};

$('.level-button').click(function(){
  circleArray = [];
  ballFlow();
  animate();
  $('#winningModal').modal('hide');

  game.score += 1;
  $('.score span').html(game.score);
});
