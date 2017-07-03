/* The networkUI controls display of nodeContainers within the network view of ProjectHub
 * 
 */ 

//Constructor
function NetworkUI(baseNodeID) //Network UI's have to be created at a certain node
{
	this.parents = [];
	this.siblings = [];
	this.childs = [];
	
	this.focus = new NodeContainer(this.sendNodeRequest(baseNodeID)); //Contains NodeContainer currently at focus. Initialized at UI construction
	this.setFocus(this.focus); //Sets focus on the initial focus
	
	this.setFocus = function(NCon) //Called when a node is clicked. Args: NodeContainer clicked on
	{
		this.focus = NCon; //Store the object for reference
		
		//For each of the new focus's related nodes, create a new node container and store it in the respective array
		for (var i = 0; i < NCon.node.parents.length; i++)
		{
			this.sendNodeRequest(this.focus.node.parents[i], function(node){this.parents.push(new NodeContainer(node));}); 
		}
		for (var i = 0; i < NCon.node.siblings.length; i++)
		{
			this.sendNodeRequest(this.focus.node.siblings[i], function(node){this.siblings.push(new NodeContainer(node));});
		}
		for (var i = 0; i < NCon.node.childs.length; i++)
		{
			this.sendNodeRequest(this.focus.node.childs[i], function(node){this.childs.push(new NodeContainer(node));}); 
		}

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
	
	this.sendNodeRequest = function(nodeID, method) //Takes a nodeID and returns the node objects from the database. Also takes a function that the ID will be passed to on completion
	{
		var req = new XMLHttpRequest();
		var fetchedNode = {}; //Requested node
		req.onreadystatechange = function()
		{
			  if (this.readyState == 4 && this.status == 200) //When page found and reponse ready
			  {
				  console.log("Anonymous Node Object: " + req.responseText);
				  fetchedNode = JSON.parse(req.responseText); //Contains a JSON representation of the node, which we convert to a js object
				  if (method) //If a method was provided
				  {
					  method(fetchedNode); //Execute it
				  }
				  else
				  {
					  return fetchedNode; //Otherwise just return the node object
				  }
			  }
		};
		req.open("GET", "NodeRequest.php?id=" + nodeID, true);
		req.send();

	}
}