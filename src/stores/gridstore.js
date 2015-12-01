var Fluxxor = require('fluxxor');

var minefieldUtils = require('../utils/minefield.js');
var constants = require('../constants/constants.js');
var actions = require('../actions/actions.js');



var GridStore = Fluxxor.createStore({
	initialize: function()
	{ 
    this.minefield = null;
    this.bindActions(
        constants.GENERATE_MINEFIELD, this._onGenerateMinefield,
        constants.REVEAL, this._reveal,
        constants.PLACE_FLAG, this._placeFlag,
			  constants.MINE_EXPLODED, this._onMineExploded,
        constants.RESET, this._onGenerateMinefield
    );
	},
  
  _placeFlag: function(payload)
  {
    this.minefield[payload.y][payload.x].playerState = 'flagged';
    this.emit('change');  
  },
  
  _reveal: function(payload)
  {
    var cell = this.minefield[payload.y][payload.x];
    cell.playerState = 'revealed';
    if ( cell.innerState === 'mine' )
    {
      this.flux.actions.explodeMine(payload.x, payload.y, cell);
    }
    else if ( cell.innerState === 'empty' && cell.neighbours == 0 )
    {
      this._revealAdjacent(this.minefield, payload.x, payload.y);
    }
    if ( this._allCellsRevealed(this.minefield) )
    {
      this.flux.actions.gameWon();  
    }
    this.emit('change');  
  },
  
  _allCellsRevealed: function(mineField)
  {
    for ( var y = 0; y < mineField.length; y++ )
    {
      var row = mineField[y];

      for ( var x = 0; x < row.length; x++ )
      {
        var cell = this.minefield[x][y];
        
        if ( cell.playerState == 'covered' )
        {
          return false;
        }        
      }
    }
    return true;
  },
  
  _revealAdjacent: function(mineField, x, y)
  {
    var neighbours = minefieldUtils.findNeighbours(mineField, x, y);
    for ( var i in neighbours)
    {
      var neighbour = neighbours[i];
      if (neighbour.data.playerState !== 'revealed')
      {
        neighbour.data.playerState = 'revealed';
        if ( neighbour.data.neighbours === 0 )
        {
          this._revealAdjacent(mineField, neighbour.x, neighbour.y);
        }
      }
    }
  },
  
  _revealAllMines: function(mineField)
  {
    for ( var y = 0; y < mineField.length; y++ )
    {
      var row = mineField[y];

      for ( var x = 0; x < row.length; x++ )
      {
        var cell = this.minefield[x][y];
        if ( cell.innerState === 'mine' && cell.playerState !== 'flagged' )
        {
          cell.playerState = 'revealed';
        }
      }
    }
  },
  
  _onGenerateMinefield: function(payload)
  {
    if ( !payload || !('width' in payload))
    {
      var size = this.flux.store('GameStore').getFieldSize();
      payload = payload || { width: size.w, height: size.h};
    }
    
    this.minefield = minefieldUtils.generateMinefield(payload.width, payload.height);
    minefieldUtils.generateNeighbours(this.minefield);
    this.emit('change');
  },
  
  _onMineExploded: function()
  {
    this._revealAllMines(this.minefield);
    this.emit('change');
  },
  
  getMinefield: function()
  {
    return this.minefield;
  }
});

module.exports = GridStore;
