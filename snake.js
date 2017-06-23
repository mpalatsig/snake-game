console.log("Starting snake");

function Snake(options) {
  this.direction = 'right'; // left, up, down
  this.body = [{
      row: 1,
      column: 5
    },
    {
      row: 1,
      column: 4
    },
    {
      row: 1,
      column: 3
    },
    {
      row: 1,
      column: 2
    },
    {
      row: 1,
      column: 1
    }
  ];
}

Snake.prototype.changeDirection = function(newDirection) {
  if (newDirection === 'left' || newDirection === 'right') {
    if (this.direction === 'up' || this.direction === 'down') {
      this.direction = newDirection;
      return;
    }
  }

  if (newDirection === 'up' || newDirection === 'down') {
    if (this.direction === 'left' || this.direction === 'right') {
      this.direction = newDirection;
      return;
    }
  }
};

Snake.prototype.moveForward = function(maxRows, maxColumns) {
  var head = this.body[0];

  switch (this.direction) {
    case 'up':
      this.body.unshift({
        row: (head.row - 1 + maxRows) % maxRows,
        column: head.column
      });
      break;
    case 'down':
      this.body.unshift({
        row: (head.row + 1) % maxRows,
        column: head.column
      });
      break;
    case 'left':
      this.body.unshift({
        row: head.row,
        column: (head.column - 1 + maxColumns) % maxColumns
      });
      break;
    case 'right':
      this.body.unshift({
        row: head.row,
        column: (head.column + 1) % maxColumns
      });
      break;
  }

  this.previousTail = this.body.pop();
};

Snake.prototype.grow = function() {
  if (this.previousTail) {
    this.body.push(this.previousTail);
    this.previousTail = undefined;
  }
};

Snake.prototype.hasEatenFood = function(foodPosition) {
  return this.body[0].row === foodPosition.row &&
    this.body[0].column === foodPosition.column;
};

Snake.prototype.hasEatenItself = function() {
  return this.body.some(function(element, index, array) {
    return (element.row === array[0].row &&
      element.column === array[0].column &&
      index !== 0);
  });
};

Snake.prototype.collidesWith = function(position) {
  return this.body.some(function(element) {
    return element.row === position.row &&
      element.column === position.column;
  });
};
