<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once "../config/database.php";

$sql = "SELECT id, username, role, created_at FROM admins";
$result = $conn->query($sql);
$admins = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $admins[] = $row;
    }
}
echo json_encode($admins);
?>