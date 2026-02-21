<?php
require_once "../config/database.php";

$result = $conn->query("SELECT * FROM site_settings");

$data = [];
while($row = $result->fetch_assoc()){
    $data[$row['key_name']] = $row['value'];
}

echo json_encode($data);
?>