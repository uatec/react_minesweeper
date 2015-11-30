var Fluxxor = require('fluxxor');

var constants = require('../constants/constants.js');

var gameState = {
	PLAYING: 'PLAYING',
	DEAD: 'DEAD',
	WON: 'WON'
};

var GameStore = Fluxxor.createStore({
	initialize: function () {
		this.score = 0;
		this.gameState = gameState.PLAYING;
		this.fieldSize = { w: 10, h: 10 },
		this.bindActions(
			constants.MINE_EXPLODED, this._onMineExploded,
			constants.REVEAL, this._reveal,
			constants.RESET, this._reset,
			constants.GAME_WON, this._onGameWon
			);
	},

	_reset: function () {
		this.score = 0;
		this.gameState = gameState.PLAYING;
		this.emit('change');
	},

	_reveal: function () {
		this.score += 10;
		this.emit('change');
	},

	_onMineExploded: function () {
		this.gameState = gameState.DEAD;
		this.emit('change');
	},	
	
	_onGameWon: function () {
		this.gameState = gameState.WON;
		this.emit('change');
	},

	getScore: function () {
		return this.score;
	},

	getState: function () {
		return this.gameState;
	},

	getFieldSize: function () {
		return this.fieldSize;
	}

});

module.exports = GameStore;
