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
			console.log("Stringified Final Object: " + JSON.stringify(nUI.sendNodeRequest(1)));
			//document.getElementById("main").innerHTML = JSON.stringify(sendNodeRequest(1));
		</script>
	</body>	
</html>