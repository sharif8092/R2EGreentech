


<?php
$host = "localhost";  // Hostinger me localhost hi hota hai
$db = "u364864494_r2e_database";
$user = "u364864494_r2egreentech";
$pass = "Aadil8092@"; // yaha apna actual password daaliye

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>