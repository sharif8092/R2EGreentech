<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    $stmt = $conn->prepare("UPDATE promoters SET name=?, experience=?, bio=?, image=?, specialties=?, quote=?, imagePosition=? WHERE id=?");
    $stmt->bind_param("sssssssi", $data->name, $data->experience, $data->bio, $data->image, $data->specialties, $data->quote, $data->imagePosition, $data->id);
    
    if($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Promoter updated"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update"]);
    }
}
?>