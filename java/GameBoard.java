/* =============================================

BOOM

Michael Dziedzic, June 1997

mailto:mdziedzic@mmilano.tiac.net
http://www.tiac.net/users/mmilano/mdziedzic

// ============================================= */


import java.awt.*;


class GameBoard {

	private final int TILE_BOMB = 9;
	private final int TILE_COVERED = 10;
	private final int TILE_FLAG = 11;
	private final int TILE_SAFE = 12;

	private Image [ ] tileImages = new Image [ 13 ];
	private int width, height, tileSize, bomb_percent;
	private int numberOfBombs, correctlyMarkedBombs;
	private Tile [ ][ ] tileArray;
	private Graphics g;

  // =============================================
  // constructor
  // =============================================  

	public GameBoard( int width, int height, int tileSize, int bomb_percent, 
		Graphics g, Image [ ] tileImages ) {

		this.width = width;
		this.height = height;
		this.tileSize = tileSize;
		this.bomb_percent = bomb_percent;
		this.g = g;

		for ( int m = 0; m < 13; m++ ) {
			this.tileImages [ m ] = tileImages [ m ];
		}   

		tileArray = new Tile [ height ][ width ];   
		populateGameBoard();
	}

  // =============================================
  // populateGameBoard
  // =============================================  

	void populateGameBoard() {

		int tempHeight = height + 2;
		int tempWidth = width + 2;
		Tile [ ][ ] tempTileArray = new Tile [ tempHeight ][ tempWidth ];

		for ( int m = 0; m < tempHeight; m++ ) {
			for ( int n = 0; n < tempWidth; n++ ) {
				if ( ( m == 0 ) || ( m == tempHeight - 1 ) || ( n == 0 ) || ( n == tempWidth - 1 ) ) {
					tempTileArray [ m ][ n ] = new Tile( 0 ); 
				} else {
					if ( ( Math.random() * 100 ) < bomb_percent ) {
						tempTileArray [ m ][ n ] = new Tile( TILE_BOMB );
						numberOfBombs++;
					} else {
						tempTileArray [ m ][ n ] = new Tile( 0 ); 
					}
				}
			}
		}

		for ( int m = 1; m < tempHeight - 1; m++ ) {
			for ( int n = 1; n < tempWidth - 1; n++ ) {
				int bombCounter = 0;
				if ( tempTileArray [ m ][ n ].getTileType() != TILE_BOMB ) {
					for ( int o = -1; o < 2; o++ ) {
						for ( int p = -1; p < 2; p++ ) {
							if ( tempTileArray [ m + o ][ n + p ].getTileType() == TILE_BOMB ) 
								bombCounter++;
						}
					}
					tempTileArray [ m ][ n ].setTileType( bombCounter );
				}
			}
		}

		for ( int m = 0; m < height; m++ ) {
			for ( int n = 0; n < width; n++ ) {
				tileArray [ m ][ n ] = tempTileArray [ m + 1 ][ n + 1 ];
			}
		}
	}

  // =============================================
  // drawGameBoard
  // =============================================  

	void drawGameBoard() {

		g.setColor( Color.black );
		g.fillRect( 0, 0, width, height );

		for ( int m = 0; m < height; m++ ) {
			for ( int n = 0; n < width; n++ ) {
				if ( tileArray [ m ][ n ].hasFlag() ) {
					g.drawImage( tileImages [ TILE_FLAG ], n * tileSize, m * tileSize, null );
				} else {
					if ( tileArray [ m ][ n ].isUnCovered() )
						g.drawImage( tileImages [ tileArray [ m ][ n ].getTileType() ],
							n * tileSize, m * tileSize, null );
					else
						g.drawImage( tileImages [ TILE_COVERED ],
							n * tileSize, m * tileSize, null );
				}
			}
		}
	}

  // =============================================
  // drawTile
  // =============================================  

	void drawTile( int x, int y ) {

		if ( tileArray [ y ][ x ].hasFlag() )
			g.drawImage( tileImages [ TILE_FLAG ], x * tileSize, y * tileSize, null );
		else if ( tileArray [ y ][ x ].isUnCovered() )
			g.drawImage( tileImages [ tileArray [ y ][ x ].getTileType() ], x * tileSize, y * tileSize, null );
		else
			g.drawImage( tileImages [ TILE_COVERED ], x * tileSize, y * tileSize, null );
	}

  // =============================================
  // unCoverTile
  // =============================================  

	void unCoverTile( int x, int y ) {

		tileArray [ y ][ x ].unCoverTile();
	}

  // =============================================
  // unCoverAll
  // =============================================  

	void unCoverAll() {

		for ( int m = 0; m < height; m++ ) {
			for ( int n = 0; n < width; n++ ) {
				tileArray [ m ][ n ].unCoverTile();
			}
		}
	}

  // =============================================
  // handleMouseDown
  // =============================================  

	String handleMouseDown( int x, int y, boolean shiftDown ) {

		if ( shiftDown ) {

			if ( tileArray [ y ][ x ].hasFlag() ) {
				tileArray [ y ][ x ].unFlagTile();
				if ( tileArray [ y ][ x ].getTileType() == TILE_BOMB )
					correctlyMarkedBombs--;
			} else if ( ! ( tileArray [ y ][ x ].isUnCovered() ) ) {
				tileArray [ y ][ x ].flagTile( );
				if ( tileArray [ y ][ x ].getTileType() == TILE_BOMB )
					correctlyMarkedBombs++;
			}

		} else {

			if ( ! tileArray [ y ][ x ].hasFlag() ) {
				unCoverTile( x, y );
				if ( tileArray [ y ][ x ].getTileType() == TILE_BOMB ) {
					return "loser";
				} else if ( tileArray [ y ][ x ].getTileType() == 0 ) {
					tileArray [ y ][ x ].setTileType( 12 );
					safetyZone( x, y );
				}
			}
		}

		drawTile( x, y );
		if ( correctlyMarkedBombs == numberOfBombs ) 
			return "winner";

		return "continue";
	}

  // =============================================
  // safetyZone 
  //
  // recursive method that reveals adjacent blank tiles
  // =============================================  

	void safetyZone( int x, int y ) {

		for ( int o = -1; o < 2; o++ ) {
			for ( int p = -1; p < 2; p++ ) {
				if ( ( ( y + o ) >= 0 ) && ( ( y + o ) < height ) && ( ( x + p ) >= 0 ) && ( ( x + p ) < width ) ) {
					unCoverTile( x + p, y + o );
					drawTile( x + p, y + o );
					if ( tileArray [ y + o ][ x + p ].getTileType() == 0 ) {
						tileArray [ y + o ][ x + p ].setTileType( 12 );
						unCoverTile( x + p, y + o );
						drawTile( x + p, y + o );
						safetyZone( x + p, y + o );
					}
				}
			}
		}
	}

}
