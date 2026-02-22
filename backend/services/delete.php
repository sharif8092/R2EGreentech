<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../config/database.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

$id = $_POST['id'] ?? '';

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "Service ID required"]);
    exit;
}

// Get image before delete
$query = $conn->prepare("SELECT image FROM services WHERE id=?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
$row = $result->fetch_assoc();
$image = $row['image'] ?? '';
$query->close();

// Delete record
$stmt = $conn->prepare("DELETE FROM services WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    // Delete image file
    if (!empty($image) && file_exists("../" . $image)) {
        unlink("../" . $image);
    }

    echo json_encode(["status" => "success", "message" => "Service deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();