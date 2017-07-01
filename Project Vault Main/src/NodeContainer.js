/* A nodeContainer is associated with a pNode. It knows how to display the data contained within the pNode
 * 
 * A pNode (p = project) is the basic unit of display for the network view (the brain-like browsing) of Project Hub
 * A pNode contains its type and information to display
 * A pNode is an information container and does not know how to display itself - display is the job of a nodeContainer
 * A pNode only exists as a JSON object that becomes associated with a NodeContainer
 */

//The above enumerator defines what types nodes can be. This changes display options for the container
this.nodeTypes = {PERSON : 0, ORG : 1, EVENT : 2};


//Constructor for nodeContainer
function NodeContainer(pNode)
{
	this.pNode = pNode; //The PNode associated with this container
	
	
	this.width;
	this.height;
	this.x; //Upper-Left Coord
	this.y; //Upper-Left Coord
}

