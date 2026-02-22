<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && !empty($data->password)) {
    // Check if username already exists
    $check = $conn->prepare("SELECT id FROM admins WHERE username=?");
    $check->bind_param("s", $data->username);
    $check->execute();
    if($check->get_result()->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Username already exists"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO admins (username, password, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data->username, $data->password, $data->role);
    
    if($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Admin added"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add admin"]);
    }
}
?>