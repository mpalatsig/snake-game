function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.snake = new options.Snake();
  this.snakeConstructor = options.Snake;
  this.speed = options.speed;
  this.cellSize = options.size/this.rows;
  this.food = undefined;
  this.drawSnake();
  this.generateFood();
  this.drawFood();
  this.assignControlsToKeys();
}

Game.prototype.drawSnake = function() {
  var that = this;
  this.snake.body.forEach(function(position, index) {
    var el = $('<div>').addClass("snake cell").css({
      top: position.row * that.cellSize,
      left: position.column * that.cellSize
    });
    if (index == 0) {
      el.addClass("head");
    }
    $('.container').append(el);
  });
};

Game.prototype.clearSnake = function() {
  $('.container .snake').remove();
};

Game.prototype.clearFood = function(){
  $('.container .food').remove();
};

Game.prototype.generateFood = function() {
  do {
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  } while (this.snake.collidesWith(this.food));
};

Game.prototype.drawFood = function() {
  var el = $('<div>').addClass("food cell").css({
    top: this.food.row * this.cellSize,
    left: this.food.column * this.cellSize
  });
  $('.container').append(el);
};

Game.prototype.start = function() {
  if (!this.intervalId){
    this.intervalId = setInterval(this.update.bind(this), 100);
  }
};

Game.prototype.update = function(){
  this.snake.moveForward(this.rows, this.columns);

  if (this.snake.hasEatenFood(this.food)){
      this.snake.grow();
      this.clearFood();
      this.generateFood();
      this.drawFood();
  }

  if (this.snake.hasEatenItself()){
    alert('Game Over');
    this.stop();
  }

  this.clearSnake();
  this.drawSnake();
};

Game.prototype.assignControlsToKeys = function(){
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        this.snake.changeDirection('up');
        break;
      case 40: // arrow down
        this.snake.changeDirection('down');
        break;
      case 37: // arrow left
        this.snake.changeDirection('left');
        break;
      case 39: // arrow right
        this.snake.changeDirection('right');
        break;
    }
  }.bind(this));
};

Game.prototype.stop =  function(){
  console.log("Game stopped");
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.snake = new this.snakeConstructor();
    this.clearFood();
    this.generateFood();
    this.drawFood();
    this.start();
  }
};


$(document).ready(function() {
  var game = new Game({
    size: 600, // size of the board in pixels
    rows: 50,
    columns: 50,
    speed: 100,
    Snake: Snake
  });
  game.start();
});
