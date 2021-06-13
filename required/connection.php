<?php 
$host = "remote.flanderscraft.be";
$user = "checkin";
$password = "";
$database = "tjokregister";

$conn = new mysqli($host, $user, $password, $database);

$conn->connect_errno;

print $conn->error;

if (mysqli_connect_error()) {
	echo "Failed to connect to Database: $database" . mysqli_connect_error();
}
?>