var React = require('react'),
    Fluxxor = require('fluxxor');
    
var FluxMixin = Fluxxor.FluxMixin(React);


var spriteMap = {
  'width': 3,
  'height': 4,
  'tileWidth': 25,
  'tileHeight': 25,
  'tiles': [
    'empty',
    'mine',
    '0neighbour',
    '1neighbour',
    '2neighbour',
    '3neighbour',
    '4neighbour',
    '5neighbour',
    '6neighbour',
    '7neighbour',
    '8neighbour',
    'flag'
  ]
};


function sprite(map, spriteName)
{
  var spriteIndex = map.tiles.indexOf(spriteName);
  
  if ( spriteIndex < 0 ) throw new Error("unrecognised sprite name");

  var x = spriteIndex % map.width;
  var y = Math.floor(spriteIndex / map.width);
  
  x *= spriteMap.tileWidth;
  y *= spriteMap.tileHeight;
  return { backgroundPosition: '-' + x + 'px -' + y + 'px'};
}



function _buildLocalStyle(cellState)
{
  if ( cellState.playerState === 'covered' )
  {
    return sprite(spriteMap, 'empty');
  } 
  else if ( cellState.playerState === 'revealed' )
  {
    if ( cellState.innerState === 'mine' )
    {
      return sprite(spriteMap, 'mine');
    }
    else
    {
      return sprite(spriteMap, cellState.neighbours + 'neighbour');
    }
  } 
  else if ( cellState.playerState === 'flagged' )
  {
      return sprite(spriteMap, 'flag');
  }
}

var Cell = React.createClass({
  mixins: [FluxMixin],
  
  reveal: function()
  {
    var flux = this.getFlux().actions.reveal(this.props.x, this.props.y);
  },
  
  flag: function(e)
  {
    var flux = this.getFlux().actions.placeFlag(this.props.x, this.props.y);
    e.preventDefault();
  },
  
  render: function()
  {
    var styles = {
      paddingTop: '25px',
      paddingLeft: '25px',
      background: 'url("public/cell_spritesheet_md.png")',
      backgroundSize: '75px 100px',
      backgroundRepeat: 'no-repeat',
      display: 'inline-block'
    };
    
    styles = Object.assign(styles, _buildLocalStyle(this.props.cellState));
    
    return <div style={styles} onClick={this.reveal} onContextMenu={this.flag}></div>;
  }
});


module.exports = Cell;