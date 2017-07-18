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
	$query = "SELECT MAX(id) AS maxID FROM nodes"; //Get the highest current ID
	$response = $connection->query($query);
	
	//Mash together all the form input data into a new row
	$query = "INSERT INTO nodes VALUES (".($response["maxID"] + 1).", ".$_GET["name"].", "; 
	$query = $query.$_GET["description"].", ".$_GET["link"].$_GET["parents"].", ".$_GET["siblings"].", ".$_GET["childs"].", ";
	$query = $query.$_GET["info"].", ".$_GET["type"].", ".$_GET["email"].", ".$_GET["programs"].", ".$_GET["leader"].", ";
	
	$connection->query($query);
	$mysqli_close($connection);
?>