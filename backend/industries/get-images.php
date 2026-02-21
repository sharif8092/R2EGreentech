<?php
require_once "../config/database.php";

$result = $conn->query("SELECT * FROM industry_images");

$data = [];

while($row = $result->fetch_assoc()){
    $data[$row['industry_key']] = [
        "image" => $row['image_url'],
        "position" => $row['image_position']
    ];
}

echo json_encode($data);
?>