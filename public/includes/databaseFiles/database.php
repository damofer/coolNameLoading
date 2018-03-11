<?php
require 'credentials.php';

try{
	$conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);

	$db = mysqli_connect($server,$username,$password,$database);

	 return $conn;
} catch(PDOException $e){
	die( "Connection failed: " . $e->getMessage());
}
?>