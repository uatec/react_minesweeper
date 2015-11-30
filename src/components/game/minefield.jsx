var React = require('react'),
    Cell = require('./cell.jsx'),
    Fluxxor = require('fluxxor');
    
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MineField = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("GridStore")],

  
  props: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    cellState: React.PropTypes.object
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    
    var minefield = flux.store('GridStore').getMinefield();
    
    if ( minefield === null )
    {
      var size = flux.store('GameStore').getFieldSize();
      
      this.getFlux().actions.generateMinefield(size.w, size.h);
      return null;
    }

    return { minefield: minefield };
  },
  
  render: function() {

    if ( this.state === null)
    {
      return <span>no grid available</span>;
    }
    
    var rows = [];

    for ( var y = 0; y < this.state.minefield.length; y++ )
    {
      var dataRow = this.state.minefield[y];
      var row = [];
      for ( var x = 0; x < dataRow.length; x++ )
      {
        var cellData = this.state.minefield[y][x];
        row.push(<Cell key={x + ',' + y} x={x} y={y} cellState={cellData} />);
      }
      rows.push(<div key={'row' + y}>{row}</div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
});

module.exports = MineField;