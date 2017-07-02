/* The networkUI controls display of nodeContainers within the network view of ProjectHub
 * 
 */ 

//Constructor
function NetworkUI()
{
	this.focus = {}; //Contains NodeContainer currently at focus
	
	this.setFocus = function(NCon) //Called when a node is clicked. Args: NodeContainer clicked on
	{
		this.focus = NCon; //Store the object for reference
		
		//Query for related nodes of the new focus
		
		
		
		//Construct node containers for the new focus's related nodes
		
		//Display rearrange UI
		this.moveFocus();
		this.dispParents();
		this.dispSiblings();
		this.dispChilds();
	}
	
	this.setNodeSize = function(deviceInfo) //Fetches the right size for each node to display at
	{
		
	}
	
	this.moveFocus = function() //
	{
		
	}
	
	this.dispParents = function() //
	{
		
	}
	
	this.dispSiblings = function() //
	{
		
	}
	
	this.dispChilds = function() //
	{
		
	}
	
	//MOVE THIS
	this.constructNode = function(id, name, description, link, parents, siblings, childs) //Takes data off SQL server and combines it into one anonymous object
	{
		return {
			"id": id,
			"name": name,
			"description": description,
			"link":link,
			"parents":parents,
			"siblings":siblings,
			"childs":childs
		}
	}
	
	this.sendNodeRequest = function(nodeID) //Takes a nodeID and returns the node objects from the database
	{
		var req = new XMLHttpRequest();
		var pNode = {}; //Requested node
		req.onreadystatechange = function()
		{
			  if (this.readyState == 4 && this.status == 200) //When page found and reponse ready
			  {
				  pNode = JSON.parse(req.responseText); //Contains a JSON representation of the node, which we convert to a js object
			  }
		};
		req.open("GET", "NodeRequest.php?id=" + nodeID, true);
		req.send();
		return pNode;
	}
}