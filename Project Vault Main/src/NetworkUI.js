/* The networkUI controls display of nodeCons within the network view of ProjectHub
 * 
 */ 

//Constructor
function NetworkUI(baseNodeID) //Network UI's have to be created at a certain node
{
	this.nodeCons = {}; //This object contains all node containers currently being displayed by the ui
	this.nodeCons.focus = ""; //Intialize focus property
	
	var self = this; //Used to access parent variables by child functions
	
	//See bottom for on-construct code
	this.setFocus = function(nCon) //Called when a node is clicked. Args: NodeContainer clicked on
	{
		this.nodeCons.focus = nCon; //Store the object for reference
		
		//For each of the new focus's related nodes, create a new node container and store it at its proper index int he nodeCons object
		for (var i = 0; i < nCon.node.parents.length; i++)
		{
			this.sendNodeRequest(this.focus.node.parents[i], function(node){this.nodeCons[node.id] = new NodeContainer(node);}); 
		}
		for (var j = 0; j < nCon.node.siblings.length; j++)
		{
			this.sendNodeRequest(this.focus.node.siblings[j], function(node){this.nodeCons[node.id] = new NodeContainer(node);}); 
		}
		
		this.printNodeCons() //TEMP
		
		for (var k = 0; k < nCon.node.childs.length; k++)
		{
			console.log("Filling nodeCons: index:" + k);
			this.sendNodeRequest(this.focus.node.childs[k], function(node){this.nodeCons[node.id] = new NodeContainer(node);}); 
		}
		
		//Display/rearrange UI to fit new focus
		this.moveFocus();
		this.moveParents();
		this.moveSiblings();
		this.moveChilds();
		this.update(); //Put changes into effect
	}
	
	this.setNodeSize = function(deviceInfo) //Fetches the right size for each node to display at
	{
		
	}
	
	this.moveFocus = function() //Puts focus at center of screen
	{
		this.nodeCons.focus.style = this.nodeCons.focus.style + " margin: \"auto\"";
	}
	
	this.moveParents = function() //
	{
		
	}
	
	this.moveSiblings = function() //
	{
		
	}
	
	this.moveChilds = function() //
	{
		
	}
	
	this.printNodeCons = function() //Prints the nodeCons array
	{
		console.log("Network UI nodeCons: ");
		for (var g in this.nodeCons)
		{
			console.log("Node at " + g + ": " + JSON.stringify(this.nodeCons[g]))
		}
		
	}
	
	this.update = function() //Updates the HTML elements of the page
	{
		var contents = "";
		
		for (var h in nodeCons)
		{
			contents = contents + this.nodeCons[h].html; //Refreshes the contents of each node
		}
		
		document.getElementById("networkviewport").innerHTML = contents; //Clear out what exists and put in updated info
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
	
	this.sendNodeRequest(baseNodeID, function(node)
		{
			self.nodeCons[0] = new NodeContainer(node); //Store this node container into the containment array
			self.setFocus(self.nodeCons[0]); //Then focus on it after complete return of information
		}); 
	
}