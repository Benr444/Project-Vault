<?php
	//This file takes ajax requests for node data and returns the relevant nodes as anonymous js objects
	
	$servername = "localhost";
	$user = "sqlUser";
	$pass = "uwrZWDSddWRVMhbZ";
	$db = "projectvaulttest";
		
	$connection = new mysqli($servername, $user, $pass, $db);
		
	if ($connection->connect_error)
	{
		die("Connection Failed: " . $connection->connect_error);
	}
	$query = "SELECT * from nodes WHERE id = ".$_GET["id"]; //Select all entries with the given ID. Will only ever return one.
	$response = $connection->query($query);
	$entry = $response->fetch_assoc(); //Need only be called once, since only one row will be returned.
	$nodeString = "{ \"id\": ".$entry["id"]
	.", \"desc\": \"".$entry["description"]
	."\", \"link\": \"".$entry["link"]
	."\", \"parents\": ".$entry["parents"]
	.", \"siblings\": ".$entry["siblings"]
	.", \"childs\": ".$entry["childs"]." }"; //String created in JSON format holding the anonymous node of the given ID
	mysqli_close($connection);
	echo $nodeString
?>