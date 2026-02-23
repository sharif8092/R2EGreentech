<?php
// CORS Headers - Ye React aur PHP ko aapas me connect karne ke liye zaroori hain
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once "../config/database.php";

// Get raw POST data
$data = json_decode(file_get_contents("php://input"));

// Check if data exists
if (!empty($data->name) && !empty($data->email)) {
    
    // Prepare statement
    $stmt = $conn->prepare("INSERT INTO leads (name, company, email, category, message) VALUES (?, ?, ?, ?, ?)");
    
    // Bind parameters safely
    $stmt->bind_param("sssss", $data->name, $data->company, $data->email, $data->category, $data->message);
    
    // Execute and check status
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Lead added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete data received"]);
}

$conn->close();
?>