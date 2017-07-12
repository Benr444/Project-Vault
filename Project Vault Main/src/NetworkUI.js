/* The networkUI controls display of nodeContainers within the network view of ProjectHub
 * 
 */ 

//Constructor
function NetworkUI(baseNodeID) //Network UI's have to be created at a certain node
{
	this.nodeContainers = []; //This array contains all node containers currently being displayed by the ui
	//0 is focus
	//Parents are 1 -> 1+nCon.node.parents.length
	//Siblings are 1 + nCon.node.parents.length -> 2 + nCon.node.parents.length + nCon.node.siblings.length
	//Siblings are 2 + nCon.node.parents.length + nCon.node.siblings.length -> 3 + nCon.node.parents.length + nCon.node.siblings.length + nCon.node.childs.length
	
	this.nodeContainers[0] = new NodeContainer(this.sendNodeRequest(baseNodeID)); //Contains NodeContainer currently at focus. Initialized at UI construction. The focus is always at the id of zero
	
	this.setFocus = function(nCon) //Called when a node is clicked. Args: NodeContainer clicked on
	{
		this.nodeContainers[0] = nCon; //Store the object for reference
		
		//For each of the new focus's related nodes, create a new node container and store it in the respective array
		for (var i = 0; i < nCon.node.parents.length; i++)
		{
			this.sendNodeRequest(this.focus.node.parents[i], function(node){this.nodeContainers.push(new NodeContainer(node));}); 
		}
		for (var j = 0; j < nCon.node.siblings.length; j++)
		{
			this.sendNodeRequest(this.focus.node.siblings[j], function(node){this.nodeContainers.push(new NodeContainer(node));});
		}
		for (var k = 0; k < nCon.node.childs.length; k++)
		{
			this.sendNodeRequest(this.focus.node.childs[k], function(node){this.nodeContainers.push(new NodeContainer(node));}); 
		}

		//Add containers to UI
		for (var l = 0; l < nodeContainers.length; l++)
		{
			//DELETE OLD STUFF
			document.getElementById("networkviewport").innerHTML = document.getElementById("networkviewport").innerHTML + nodeContainers[l].html; //Append current nodes into document 
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
		this.nodeContainers[0].style = this.nodeContainers[0].style + " margin: \"auto\"";
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
	
	this.update = function() //Updates the HTML elements of the page
	{
		var contents = "";
		
		for (var h = 0; h < this.nodeContainers.length; h++)
		{
			contents = contents + this.nodeContainers[h].html; //Refreshes the contents of each node
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
}