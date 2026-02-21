<?php
require_once "../config/database.php";

header("Content-Type: application/json");

$sql = "SELECT * FROM services";
$result = $conn->query($sql);

$services = [];

while ($row = $result->fetch_assoc()) {
    $services[] = [
        "id" => $row["slug"],
        "title" => $row["title"],
        "description" => $row["description"],
        "image" => $row["image"],
        "imagePosition" => $row["image_position"],
        "categories" => json_decode($row["categories"], true)
    ];
}

echo json_encode($services);