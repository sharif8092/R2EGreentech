<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Preflight request (OPTIONS) ko allow karein
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(isset($data->name) && trim($data->name) !== '') {
    $stmt = $conn->prepare("INSERT INTO promoters (name, experience, bio, image, specialties, quote, imagePosition) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $data->name, $data->experience, $data->bio, $data->image, $data->specialties, $data->quote, $data->imagePosition);
    
    if($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Promoter added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database execution failed: " . $stmt->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Name field is required!"]);
}
?>