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

$id = $_POST['id'] ?? '';
$slug = $_POST['slug'] ?? '';
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$image_position = $_POST['image_position'] ?? '50% 50%';
$categories = $_POST['categories'] ?? '[]';

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "Service ID required"]);
    exit;
}

// Fetch existing image
$oldQuery = $conn->prepare("SELECT image FROM services WHERE id = ?");
$oldQuery->bind_param("i", $id);
$oldQuery->execute();
$row = $oldQuery->get_result()->fetch_assoc();
$oldImage = $row['image'] ?? '';
$oldQuery->close();

$imagePath = $oldImage; // Default to old image

if (!empty($_FILES['image']['name'])) {
    $uploadDir = "../uploads/";
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "", basename($_FILES["image"]["name"]));
    $targetFile = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = "https://r2egreentech.in/backend/uploads/" . $fileName;

        // Delete old image properly
        if (!empty($oldImage)) {
            $oldFileName = basename($oldImage); 
            $oldFilePath = "../uploads/" . $oldFileName;
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
        exit;
    }
}

$stmt = $conn->prepare("UPDATE services SET slug=?, title=?, description=?, image=?, image_position=?, categories=? WHERE id=?");
$stmt->bind_param("ssssssi", $slug, $title, $description, $imagePath, $image_position, $categories, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Service updated"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>