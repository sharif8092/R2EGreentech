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
$slug = $_POST['slug'] ?? '';
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$image_position = $_POST['image_position'] ?? '50% 50%';
$categories = $_POST['categories'] ?? '[]';

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "Service ID required"]);
    exit;
}

// Get old image
$oldQuery = $conn->prepare("SELECT image FROM services WHERE id = ?");
$oldQuery->bind_param("i", $id);
$oldQuery->execute();
$result = $oldQuery->get_result();
$row = $result->fetch_assoc();
$oldImage = $row['image'] ?? '';
$oldQuery->close();

$imagePath = $oldImage;

// Handle new image upload
if (!empty($_FILES['image']['name'])) {

    $uploadDir = "../uploads/";
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetFile = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = "backend/uploads/" . $fileName;

        // Delete old image
        if (!empty($oldImage) && file_exists("../" . $oldImage)) {
            unlink("../" . $oldImage);
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