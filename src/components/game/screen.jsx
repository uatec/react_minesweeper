var React = require('react'),
	Fluxxor = require('fluxxor'),
	MineField = require('./minefield.jsx');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Screen = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("GameStore")],
  
  getStateFromFlux: function()
  {
    var score = this.getFlux().store('GameStore').getScore();
    var gameState = this.getFlux().store('GameStore').getState();

    return { score: score, gameState: gameState };    
  },
  
  render: function()
  {
    var size = this.getFlux().store('GameStore').getFieldSize();
    
	   return <center>
          <h1>Minesweeper</h1>
          <span>Score: {this.state.score}</span>
          {this.state.gameState == 'DEAD' || this.state.gameState == 'WON' ? 
             <div>
                <button onClick={this._resetGame}>Reset</button> 
             </div>: null}
          <MineField width={size.width} height={size.height}  />  
         </center>;
  },
  
  _resetGame: function()
  {
    this.getFlux().actions.resetGame();
  }
});

module.exports = Screen;