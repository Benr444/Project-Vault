<?php
?>
<html>
	<head>
		<link rel="stylesheet" href="pvstyles.css">
		<title>Project Vault Node Entry</title>
	</head>
	<body style="background-color:#e6e6e6">
		<h1 align="center" style="font-family:arial">Project Vault Node Entry</h1>
		<p>
			<a href="/mainPage.php">Return to Network View</a>
		</p>
		<div id="nodeportal">
			<form action="/NodeTransmit.php" method="POST">
				Name: <input type="text" name="name" required><br>
				Description: <input type="text" name="description" required><br>
				Website: <input type="url" name="link"><br>
				Leader: <input type="text" name="leader"><br>
				Email: <input type="email" name="email"><br>
				Programs: <input type="text" name="programs"><br>
				<br>
				<i>Leave Parent ID as 0 unless you know your parent's node ID.</i> <br>
				Parents: <input type="number" min="0" name="parents" value="0" required><br>
				Siblings: <input type="number" min="0" name="siblings"><br>
				Children: <input type="number" min="0" name="childs"><br>
				
				<!-- Please reference NodeContainer.js for the value enums below -->
				<input type="radio" name="type" value="2" checked> Organization<br>
  				<input type="radio" name="type" value="1"> Person<br>
  				<input type="radio" name="type" value="3"> Event<br>
  				<br>
  				Submitter: <input type="text" name="submitter" required><br>
  				<br>
				<input type="submit">
			</form>
		</div>
	</body>
</html>