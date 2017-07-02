<html>
	<head>
		<script src="NetworkUI.js"></script>
		<script src="NodeContainer.js"></script>
		<title>Project Vault</title>
	</head>
	<body>
		<h1 align="center">Project Vault Network View</h1>
		<p id="main">
			If you see this text, an error has occured
		</p>
		<script>
			var nUI = new NetworkUI();
			//This request throws in a callback function to set the innerHTML after pulling the data
			nUI.sendNodeRequest(1, function(node){document.getElementById("main").innerHTML = JSON.stringify(node);})
		</script>
	</body>	
</html>