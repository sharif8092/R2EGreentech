<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

$sql = "SELECT * FROM industries";
$result = $conn->query($sql);

$industries = [];
while ($row = $result->fetch_assoc()) {
    $industries[] = [
        "db_id" => $row["id"],
        "id" => $row["slug"], // Used as 'id' in frontend for icons/keys
        "name" => $row["name"],
        "description" => $row["description"],
        "image" => $row["image"],
        "imagePosition" => $row["image_position"],
        "solutions" => json_decode($row["solutions"], true)
    ];
}

echo json_encode($industries);
?>