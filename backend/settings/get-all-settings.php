<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once "../config/database.php";

$sql = "SELECT key_name, value FROM site_settings";
$result = $conn->query($sql);
$settings = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $settings[$row['key_name']] = $row['value'];
    }
}
echo json_encode($settings);
?>