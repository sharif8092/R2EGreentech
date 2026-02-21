<?php
require_once "../config/database.php";

$result = $conn->query("SELECT * FROM promoters ORDER BY id DESC");

$data = [];
while($row = $result->fetch_assoc()){
    $row['specialties'] = json_decode($row['specialties']);
    $data[] = $row;
}

echo json_encode($data);
?>