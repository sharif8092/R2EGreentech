<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
require_once "../config/database.php";

// Check if key_name and file are received
if(isset($_POST['key_name']) && isset($_FILES['file'])) {
    $key_name = $_POST['key_name'];
    
    // File ka naya unique naam banayein taaki overwrite na ho
    $file_name = time() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "", $_FILES['file']['name']);
    $tmp_name = $_FILES['file']['tmp_name'];
    
    // Uploads folder ka path
    $upload_dir = "../uploads/";
    if(!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    $target_path = $upload_dir . $file_name;
    
    // File ko server par move karein
    if(move_uploaded_file($tmp_name, $target_path)) {
        
        // Image ka public URL jo DB me save hoga
        $full_url = "https://r2egreentech.in/backend/uploads/" . $file_name;
        
        // Database me URL update karein
        $stmt = $conn->prepare("INSERT INTO site_settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?");
        $stmt->bind_param("sss", $key_name, $full_url, $full_url);
        
        if($stmt->execute()) {
            echo json_encode(["status" => "success", "url" => $full_url]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database update failed"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to move uploaded file"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request. File missing."]);
}
?>