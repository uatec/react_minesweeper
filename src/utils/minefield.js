

var mineThreshold = 0.9;

module.exports = {
	generateMinefield: function(width, height) { 
		var rows = [];
		for ( var y = 0; y < height; y++ )
		{
			var row = [];
			for ( var x = 0; x < width; x++ )
			{
			var mineWeight = Math.random();
			row.push({
				playerState: 'covered',
				innerState: mineWeight > mineThreshold ? 'mine' : 'empty',
				neighbours: 0
			});
			}
			rows.push(row);
		}
		return rows;
	},
	incrementNeighbour: function(rows, x, y) {
		if ( y >= 0 && y < rows.length )
		{
			var row = rows[y];
			if ( x >=0 && x < row.length )
			{
				row[x].neighbours++;
			}
		}
	},
	
	findNeighbours: function(matrix, _x, _y)
	{
		var rtn = [];
		for ( var y = _y - 1; y <= _y+1; y++ )
		{
			if ( y >= 0 && y < matrix.length )
			{
				for ( var x = _x - 1; x <= _x+1; x++ )
				{
					if ( (x != _x || y != _y) &&
						x >= 0 && x < matrix[y].length)
					{
						rtn.push({ 
							x: x,
							y: y,
							data: matrix[y][x]
						});
					}
				}
			}		
		}
		return rtn;
	},
	
 	generateNeighbours: function(rows)
	{  
		for ( var y = 0; y < rows.length; y++ )
		{
			var row = rows[y];
			for ( var x = 0; x < row.length; x++ )
			{
				if (row[x].innerState === 'mine')
				{
					this.incrementNeighbour(rows, x-1, y-1);
					this.incrementNeighbour(rows, x-0, y-1);
					this.incrementNeighbour(rows, x+1, y-1);
					this.incrementNeighbour(rows, x-1, y-0);
					this.incrementNeighbour(rows, x+1, y-0);
					this.incrementNeighbour(rows, x-1, y+1);
					this.incrementNeighbour(rows, x-0, y+1);
					this.incrementNeighbour(rows, x+1, y+1);
				}
			}
		}
	}
};
