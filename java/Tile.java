/* =============================================

BOOM

Michael Dziedzic, June 1997

mailto:mdziedzic@mmilano.tiac.net
http://www.tiac.net/users/mmilano/mdziedzic

// ============================================= */


import java.awt.*;


class Tile {

	private int tileType;
	private boolean unCovered;
	private boolean flag;
	
	// =============================================
	// constructor
	// =============================================	
	
	public Tile( int tileType ) {
	
		this.tileType = tileType;
		unCovered = false;
		flag = false;
	}
	
	// =============================================
	// uncoverTile
	// =============================================	
	
	void unCoverTile() {
		
		unCovered = true;
	}	
	
	// =============================================
	// getTileType
	// =============================================	
	
	int getTileType() {
		
		return tileType;
	}
	
	// =============================================
	// setTileType
	// =============================================	
	
	void setTileType( int tileType ) {
		
		this.tileType = tileType;
	}	
	
	// =============================================
	// isUnCovered
	// =============================================	
	
	boolean isUnCovered() {
		
		return unCovered;
	}
	
	// =============================================
	// flagTile
	// =============================================	
	
	void flagTile() {
		
		flag = true;
	}
	
	// =============================================
	// unFlagTile
	// =============================================	
	
	void unFlagTile() {
		
		flag = false;
	}
	
	// =============================================
	// hasFlag
	// =============================================	
	
	boolean hasFlag() {
		
		return flag;
	}
}
