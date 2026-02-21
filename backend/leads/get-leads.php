<?php
require_once "../config/database.php";

$result = $conn->query("SELECT * FROM leads ORDER BY id DESC");

$data = [];
while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>