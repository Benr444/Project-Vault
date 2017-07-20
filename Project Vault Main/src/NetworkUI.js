/* The networkUI controls display of nodeContainers within the network view of ProjectHub
 * 
 */ 

//Constructor
function NetworkUI(baseNodeID) //Network UI's have to be created at a certain node
{
	this.nodeCons = []; //This array contains all node containers currently being displayed by the ui
	//0 is focus
	//Parents are 1 -> 1+nCon.node.parents.length
	//Siblings are 1 + nCon.node.parents.length -> 2 + nCon.node.parents.length + nCon.node.siblings.length
	
	var self = this; //Variable for accessing these functions in callbacks
	
	this.setFocus = function(nCon) //Called when a node is clicked. Args: NodeContainer clicked on
	{
		console.log("Node with ID " + nCon.node.id + " set as focus.")
		this.nodeCons = []; //Clear out old array
		this.nodeCons[0] = nCon; //Store the object for reference
		
		//For each of the new focus's related nodes, create a new node container and store it in the respective array
		for (var i = 0; i < nCon.node.parents.length; i++)
		{
			this.sendNodeRequest(this.nodeCons[0].node.parents[i], function(node){self.nodeCons.push(new NodeContainer(node));}); 
		}
		for (var j = 0; j < nCon.node.siblings.length; j++)
		{
			this.sendNodeRequest(this.nodeCons[0].node.siblings[j], function(node){self.nodeCons.push(new NodeContainer(node));});
		}
		for (var k = 0; k < nCon.node.childs.length; k++)
		{
			this.sendNodeRequest(this.nodeCons[0].node.childs[k], function(node){self.nodeCons.push(new NodeContainer(node));}); 
		}
		
		//Display/rearrange UI to fit new focus
		setTimeout(function()
		{
			console.log("Node Containers[] length: " + self.nodeCons.length);
			self.moveFocus();
			self.moveParents();
			self.moveSiblings();
			self.moveChilds();
			
			self.update(); //Put changes into effect
		}, 500); //Execute the above after a half-second delay
	}
	
	this.moveFocus = function()
	{
		this.nodeCons[0].style = this.nodeCons[0].style + "margin:auto;"; //Set the focus as the center
	}
	this.moveParents = function()
	{
		for (var h = 1; h <= this.nodeCons[0].node.parents.length; h++) //For each parent node
		{
			this.nodeCons[h].style += "float:left;"; //Move it to the left
		}
	}
	this.moveSiblings = function()
	{
		for (var h = 1 + this.nodeCons[0].node.parents.length; h <= this.nodeCons[0].node.parents.length + this.nodeCons[0].node.siblings.length; h++) //For each sibling node
		{
			this.nodeCons[h].style += "float:center;"; //Move it to the center
		}
	}
	this.moveChilds = function()
	{
		for (var h = 1 + this.nodeCons[0].node.parents.length + this.nodeCons[0].node.siblings.length; h <= this.nodeCons[0].node.parents.length + this.nodeCons[0].node.siblings.length + this.nodeCons[0].node.childs.length; h++) //For each child node
		{
			console.log("movechild index: " + h);
			this.nodeCons[h].style += "float:right;"; //Move it to the right
		}
	}
	
	this.setNodeSize = function(deviceInfo) //Fetches the right size for each node to display at
	{
		
	}

	this.update = function() //Updates the HTML elements of the page
	{
		var contents = "";
		
		for (var h = 0; h < this.nodeCons.length; h++)
		{
			console.log("this.nodeCons.length: " + this.nodeCons.length);
			console.log("Adding " + this.nodeCons[h].getHTML());
			contents = contents + this.nodeCons[h].getHTML(); //Refreshes the contents of each node
		}
		
		console.log("Contents of Network Viewport updated.");
		document.getElementById("networkviewport").innerHTML = contents; //Clear out what exists and put in updated info
	}
	
	this.getNodeByID = function(id) //Returns the stored node with the given ID
	{
		for (var j = 0; j < this.nodeCons.length; j++)
		{
			if (this.nodeCons[j].node.id == id)
			{
				return this.nodeCons[j];
			}
		}
	}
	
	this.sendNodeRequest = function(nodeID, method) //Takes a nodeID and returns the node objects from the database. Also takes a function that the ID will be passed to on completion
	{
		var req = new XMLHttpRequest();
		var fetchedNode = {}; //Requested node
		req.onreadystatechange = function()
		{
			  if (this.readyState == 4 && this.status == 200) //When page found and reponse ready
			  {
				  console.log("RESPONSE DATA: " + req.responseText);
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
	
	
	this.sendNodeRequest(baseNodeID, function(node){self.setFocus(new NodeContainer(node))}); //Contains NodeContainer currently at focus. Initialized at UI construction. The focus is always at the id of zero. Must be called down here
}