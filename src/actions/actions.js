var constants = require('../constants/constants.js');

var actions = {

  generateMinefield: function(width, height) {
    setTimeout(function(){
      this.dispatch(constants.GENERATE_MINEFIELD, {width: width, height: height});
    }.bind(this), 0);
  },
  
  reveal: function(x, y) {
    setTimeout(function() {
      this.dispatch(constants.REVEAL, {x: x, y: y});
    }.bind(this), 0);
  },
  
  placeFlag: function(x, y) {
    setTimeout(function() {
      this.dispatch(constants.PLACE_FLAG, {x: x, y: y});
    }.bind(this), 0);
  },
  
  resetGame: function()
  {
    setTimeout(function() {
      this.dispatch(constants.RESET);
    }.bind(this), 0);
  },
  
  explodeMine: function(x, y, cell)
  {
    setTimeout(function() {
      this.dispatch(constants.MINE_EXPLODED, {x: x, y: y, cell: cell});
    }.bind(this), 0);
  },
  
  gameWon: function()
  {
    setTimeout(function() {
      this.dispatch(constants.GAME_WON);
    }.bind(this), 0);
  }
};

module.exports = actions;
