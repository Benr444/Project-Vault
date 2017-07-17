<?php 
	//Eventually, iFrame GET data needs to be processed here
?>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		
		<link rel="stylesheet" href="pvstyles.css">
		<script src="NetworkUI.js"></script>
		<script src="NodeContainer.js"></script>
		<title>Project Vault</title>
	</head>
	<body style="background-color:#e6e6e6">
		<h1 align="center" style="font-family:arial">Project Vault Network View</h1>
		<p>
			<a href="nodePortal.php">Node Entry Portal</a>
		</p>
		<div id="networkviewport">
		
		
		
		
		
		
		
		</div>
		
		<script>
			var nUI = new NetworkUI(1); //start the UI centered at node 1
			
			$(document).ready //On doc loaded
			(
				function()
				{
					console.log("Document Ready.");
					$("#networkviewport").on("click", ".node", function() //Whenever a node is clicked
					{
						console.log("A node was clicked.");
						//Pass a node container to the handler that is accessed by the handler's storage of all handers and the ID fetched
						nUI.setFocus(nUI.getNodeByID($(this).attr("id"))); //Set that node as the focus. 
						//Because you can only click on a loaded node, the above line is never out of bounds
					})
				}
			);
		</script>
	</body>	
</html>