<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../config/database.php");

$data = json_decode(file_get_contents("php://input"));
$id = $_POST['id'] ?? ($data->id ?? '');

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "Industry ID required"]);
    exit;
}

$query = $conn->prepare("SELECT image FROM industries WHERE id=?");
$query->bind_param("i", $id);
$query->execute();
$image = $query->get_result()->fetch_assoc()['image'] ?? '';
$query->close();

$stmt = $conn->prepare("DELETE FROM industries WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if (!empty($image)) {
        $filePath = "../uploads/" . basename($image);
        if (file_exists($filePath)) unlink($filePath);
    }
    echo json_encode(["status" => "success", "message" => "Industry deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}
?>