<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

$sql = "SELECT * FROM services";
$result = $conn->query($sql);

$services = [];
while ($row = $result->fetch_assoc()) {
    $services[] = [
        "id" => $row["slug"], // Used by frontend for anchor links (#)
        "db_id" => $row["id"], // Keep real ID for backend updates/deletions
        "title" => $row["title"],
        "description" => $row["description"],
        "image" => $row["image"],
        "imagePosition" => $row["image_position"],
        "categories" => json_decode($row["categories"], true)
    ];
}

echo json_encode($services);
?>