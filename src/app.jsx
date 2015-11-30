var ReactDOM = require('react-dom'),
	React = require('react'),
	Screen = require('./components/game/screen.jsx');

var GridStore = require('./stores/gridstore.js');
var GameStore = require('./stores/gamestore.js');
var actions = require('./actions/actions.js');
var Fluxxor = require('fluxxor');


var stores = {
  GridStore: new GridStore(),
  GameStore: new GameStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});



ReactDOM.render(
    <Screen flux={flux} />,
  document.getElementById('container')
);