<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) && !empty($data->current_password) && !empty($data->new_password)) {
    // Pehle current password check karein
    $stmt = $conn->prepare("SELECT password FROM admins WHERE id=?");
    $stmt->bind_param("i", $data->id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($row = $result->fetch_assoc()) {
        if($row['password'] === $data->current_password) {
            // Agar password match ho jaye, toh naya update karein
            $update = $conn->prepare("UPDATE admins SET password=? WHERE id=?");
            $update->bind_param("si", $data->new_password, $data->id);
            if($update->execute()) {
                echo json_encode(["status" => "success"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect current password"]);
        }
    }
}
?>