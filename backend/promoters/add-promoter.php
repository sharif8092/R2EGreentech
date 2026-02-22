<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->name)) {
    $stmt = $conn->prepare("INSERT INTO promoters (name, experience, bio, image, specialties, quote, imagePosition) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $data->name, $data->experience, $data->bio, $data->image, $data->specialties, $data->quote, $data->imagePosition);
    
    if($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Promoter added"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add"]);
    }
}
?>