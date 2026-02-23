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

$slug = $_POST['slug'] ?? '';
$name = $_POST['name'] ?? '';
$description = $_POST['description'] ?? '';
$image_position = $_POST['image_position'] ?? '50% 50%';
$solutions = $_POST['solutions'] ?? '[]';

if (empty($slug) || empty($name)) {
    echo json_encode(["status" => "error", "message" => "Slug and Name required"]);
    exit;
}

$imagePath = '';
if (!empty($_FILES['image']['name'])) {
    $uploadDir = "../uploads/";
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

    $fileName = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "", basename($_FILES["image"]["name"]));
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $uploadDir . $fileName)) {
        $imagePath = "https://r2egreentech.in/backend/uploads/" . $fileName;
    }
}

$stmt = $conn->prepare("INSERT INTO industries (slug, name, description, image, image_position, solutions) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $slug, $name, $description, $imagePath, $image_position, $solutions);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Industry created"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}
?>