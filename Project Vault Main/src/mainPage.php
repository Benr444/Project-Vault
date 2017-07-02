<html>
	<body>
		<p>
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
				echo "success";
				
				$query = "SELECT * from nodes";
				$response = $connection->query($query);
				for ($i = 0; $i < $response->num_rows; $i++)
				{
					$table[$i] = $response->fetch_assoc();
				}
				for ($k = 0; $k < count($table); $k++)
				{
					echo "ID: ".$table[$k]["id"]."</br>";
					echo "Name: ".$table[$k]["name"]."</br>";
					echo "Description: ".$table[$k]["descr"]."</br>";
					echo "Link: ".$table[$k]["link"]."</br>";
					echo "</br>";
					echo "</br>";
				}
			?>
		</p>
	</body>	
</html>