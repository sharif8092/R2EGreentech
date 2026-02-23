<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle CORS Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../config/database.php");

// Allow both raw JSON body and FormData
$data = json_decode(file_get_contents("php://input"));
$id = $_POST['id'] ?? ($data->id ?? '');

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "Service ID required"]);
    exit;
}

$query = $conn->prepare("SELECT image FROM services WHERE id=?");
$query->bind_param("i", $id);
$query->execute();
$row = $query->get_result()->fetch_assoc();
$image = $row['image'] ?? '';
$query->close();

$stmt = $conn->prepare("DELETE FROM services WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    // Correctly extract filename and delete from server
    if (!empty($image)) {
        $fileName = basename($image); 
        $filePath = "../uploads/" . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    echo json_encode(["status" => "success", "message" => "Service deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>