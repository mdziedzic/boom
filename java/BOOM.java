/* =============================================

BOOM

Michael Dziedzic, June 1997

mailto:mdziedzic@mmilano.tiac.net
http://www.tiac.net/users/mmilano/mdziedzic

// ============================================= */


import java.applet.*;
import java.awt.*;
import java.util.*;
import java.lang.*;
import java.awt.image.*;
import java.net.*;


public class BOOM extends Applet implements Runnable, ImageObserver {

	Image loadImage;
	Graphics loadGraphics;

	Image offScreenImage;
	Graphics offScreenGraphics;
	
	Image [ ] tileImages = new Image [ 13 ];
	
	GameBoard BoomBoard;
	
	private final int TILE_SIZE = 20;

	int board_width, board_height, bomb_percent;
	
	String gameStatus = "";
	
	Thread motor;
	boolean loaded;
	FontMetrics fMetrics;
	Font loadFont = new Font( "Helvetica", Font.BOLD, 14 );	
	int loadFont_x;
	int loadFont_y;
	String loadMessage = "BOOM!";
	boolean firstTime;

	// =============================================
	// init
	// =============================================
	
	public void init() {	
	
		board_width = Integer.parseInt( getParameter( "board_width" ) );
		board_height = Integer.parseInt( getParameter( "board_height" ) );
		bomb_percent = Integer.parseInt( getParameter( "bomb_percent" ) );
	
		this.resize( board_width * TILE_SIZE, board_height * TILE_SIZE );
		this.setBackground( Color.black );		
		
		loadImage = createImage( 2, 2 );
		loadGraphics = loadImage.getGraphics();
			
		offScreenImage = createImage( board_width * TILE_SIZE, board_height * TILE_SIZE );
		offScreenGraphics = offScreenImage.getGraphics();
	
		for ( int m = 0; m < 13; m++ ) {
			tileImages [ m ] = this.getImage( this.getDocumentBase(), "images/" + m + ".gif" );
			loadGraphics.drawImage( tileImages [ m ], 0, 0, null );
		}
		
		firstTime = true;
	}
	
	// =============================================
	// paint
	// =============================================
	
	public void paint( Graphics g ) {
	
		loaded = loadGraphics.drawImage( tileImages [ tileImages.length - 1 ], 0, 0, this);
					
		if ( loaded ) {
		
			if ( firstTime ) {
				BoomBoard = new GameBoard( board_width, board_height, TILE_SIZE, 
											bomb_percent, offScreenGraphics, tileImages );
				BoomBoard.drawGameBoard();		
				getGraphics().drawImage( offScreenImage, 0, 0, null );
				firstTime = false;
			} else {
				g.drawImage( offScreenImage, 0, 0, this );	
			}
			
		} else {
		
			g.setColor( Color.black ) ;
			g.fillRect( 0, 0, size().width, size().height );
		}
	}
	
	// =============================================
	// update
	// =============================================
	
	public void update( Graphics g ) {
	
		paint( g );
	}
	
	// =============================================
	// start
	// =============================================
	
	public void start() {
	
		motor = new Thread( this );
		motor.start();
		
		gameStatus = "";
		firstTime = true;
	}
	
	// =============================================
	// stop
	// =============================================
	
	public void stop() {
	
		motor.stop();
	}
	
	// =============================================
	// run
	// =============================================
	
	public void run() {
	
		motor.setPriority( Thread.MIN_PRIORITY );
		while ( !( loaded ) ) {
			repaint();
		}
	}
	
	// =============================================
	// mouseDown
	// =============================================
	
	public boolean mouseUp( Event e, int x, int y ) {
	
		if ( ( ( gameStatus.equals( "winner" ) ) || ( gameStatus.equals( "loser" ) ) 
								|| ( gameStatus.equals( "game over" ) ) ) ) {
			gameOver();
		} else {
			int modifs = e.modifiers;
			if ( ( modifs & Event.SHIFT_MASK ) != 0) 
				gameStatus = BoomBoard.handleMouseDown( x/20, y/20, true );
			else
				gameStatus = BoomBoard.handleMouseDown( x/20, y/20, false );
		}
		
		if ( ( gameStatus.equals( "winner" ) ) || ( gameStatus.equals( "loser" ) ) ) {
			BoomBoard.unCoverAll();
			BoomBoard.drawGameBoard();
			repaint();
			gameOver();
		}
		
		repaint();
		return true;
	}
	
	// =============================================
	// gameOver
	// =============================================
	
	void gameOver() {
	
		try {
		
			if ( gameStatus.equals( "winner" ) ) {
				getAppletContext().showDocument( 
							new URL( this.getDocumentBase(), "winner.html" ), "bottom" );
			} else if ( gameStatus.equals( "loser" ) ) {
				getAppletContext().showDocument( 
							new URL( this.getDocumentBase(), "loser.html" ), "bottom" );
 			} 
 									
		} catch ( MalformedURLException mURLe ) { ; }
		
		gameStatus = "game over";
	}
	
	// =============================================
	// imageUpdate
	// =============================================
	
	public boolean imageUpdate( Image img, int status, int x, int y, int width, int height ) {
		if ( ( status & ALLBITS ) != 1 ) {
			return true;
		} else {
			return false;
		}
	}	
	
}
