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
		
		<div id="networkviewport">
		
			<div class="node" id="1">
				
			</div>
			
		
		
		
		
		
		
		
		</div>
		
		<script>
			var nUI = new NetworkUI();
			//This request throws in a callback function to set the innerHTML after pulling the data
			nUI.sendNodeRequest(1, function(node){document.getElementById("1").innerHTML = node.name})
		</script>
	</body>	
</html>