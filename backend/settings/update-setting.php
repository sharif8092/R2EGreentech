<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->key_name) && isset($data->value)) {
    // Agar key pehle se hai toh UPDATE karega, nahi toh INSERT karega (UPSERT)
    $stmt = $conn->prepare("INSERT INTO site_settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?");
    $stmt->bind_param("sss", $data->key_name, $data->value, $data->value);
    
    if($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
?>