<?php
	$servername = "localhost";
	$user = "sqlUser";
	$pass = "uwrZWDSddWRVMhbZ";
	$db = "projectvaulttest";
	
	$connection = new mysqli($servername, $user, $pass, $db);
	
	if ($connection->connect_error)
	{
		die("Connection Failed: " . $connection->connect_error);
	}
	
	//Yes, I know that I should use auto-increment on the database. . .
	$query = "SELECT MAX(id) AS maxID FROM nodes"; //Get the highest current ID
	$response = $connection->query($query);
	$maxID = $response->fetch_assoc()["maxID"]; //Maximum current ID in the database
	
	echo $maxID."<br>";
	
	//Mash together all the form input data into a new row
	$query = "INSERT INTO nodes (id, name, description, link, parents, siblings, childs, type, email, programs, leader, submitter)"; //Info is left out
	$query = $query." VALUES ('".($maxID + 1)."', '".$_POST["name"]."', '"; 
	$query = $query.$_POST["description"]."', '".$_POST["link"]."', '".$_POST["parents"]."', '".$_POST["siblings"]."', '".$_POST["childs"]."', '"; //Note that 'info' is left out
	$query = $query.$_POST["type"]."', '".$_POST["email"]."', '".$_POST["programs"]."', '".$_POST["leader"]."', '".$_POST["submitter"]."')";
	
	if ($connection->query($query) == true)
	{
		echo "Created new node successfully";
	}
	else 
	{
		echo "Error: ".$query."<br>".mysqli_error($connection);
	}
	$connection->close();
	//mysqli_close($connection);
?>