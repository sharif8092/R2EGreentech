<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../config/database.php");

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Get form data
$slug = $_POST['slug'] ?? '';
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$image_position = $_POST['image_position'] ?? '50% 50%';
$categories = $_POST['categories'] ?? '[]';

// Validate required fields
if (empty($slug) || empty($title)) {
    echo json_encode(["status" => "error", "message" => "Slug and title required"]);
    exit;
}

// Handle Image Upload
$imagePath = '';

if (!empty($_FILES['image']['name'])) {

    $uploadDir = "../uploads/";
    
    // Create uploads folder if not exists
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetFile = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = "backend/uploads/" . $fileName;
    } else {
        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
        exit;
    }
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO services (slug, title, description, image, image_position, categories) VALUES (?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssss", $slug, $title, $description, $imagePath, $image_position, $categories);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Service created"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();