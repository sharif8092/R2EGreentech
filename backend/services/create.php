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
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$image_position = $_POST['image_position'] ?? '50% 50%';
$categories = $_POST['categories'] ?? '[]';

if (empty($slug) || empty($title)) {
    echo json_encode(["status" => "error", "message" => "Slug and title required"]);
    exit;
}

$imagePath = '';

// Check if image file is sent and has no upload errors
if (isset($_FILES['image']) && $_FILES['image']['name'] !== '') {
    
    // Server level error check
    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["status" => "error", "message" => "Server Upload Error Code: " . $_FILES['image']['error'] . " (Size might be too large)"]);
        exit;
    }

    $uploadDir = "../uploads/";
    if (!file_exists($uploadDir)) {
        if(!mkdir($uploadDir, 0777, true)) {
            echo json_encode(["status" => "error", "message" => "Failed to create uploads directory. Check folder permissions."]);
            exit;
        }
    }

    $fileName = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "", basename($_FILES["image"]["name"]));
    $targetFile = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = "https://r2egreentech.in/backend/uploads/" . $fileName;
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to move image to uploads folder. Permission denied."]);
        exit;
    }
}

$stmt = $conn->prepare("INSERT INTO services (slug, title, description, image, image_position, categories) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $slug, $title, $description, $imagePath, $image_position, $categories);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Service created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>