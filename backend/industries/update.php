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

$id = $_POST['id'] ?? '';
$slug = $_POST['slug'] ?? '';
$name = $_POST['name'] ?? '';
$description = $_POST['description'] ?? '';
$image_position = $_POST['image_position'] ?? '50% 50%';
$solutions = $_POST['solutions'] ?? '[]';

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "Industry ID required"]);
    exit;
}

$oldQuery = $conn->prepare("SELECT image FROM industries WHERE id = ?");
$oldQuery->bind_param("i", $id);
$oldQuery->execute();
$oldImage = $oldQuery->get_result()->fetch_assoc()['image'] ?? '';
$oldQuery->close();

$imagePath = $oldImage;

if (!empty($_FILES['image']['name'])) {
    $uploadDir = "../uploads/";
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

    $fileName = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "", basename($_FILES["image"]["name"]));
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $uploadDir . $fileName)) {
        $imagePath = "https://r2egreentech.in/backend/uploads/" . $fileName;
        if (!empty($oldImage)) {
            $oldFilePath = "../uploads/" . basename($oldImage);
            if (file_exists($oldFilePath)) unlink($oldFilePath);
        }
    }
}

$stmt = $conn->prepare("UPDATE industries SET slug=?, name=?, description=?, image=?, image_position=?, solutions=? WHERE id=?");
$stmt->bind_param("ssssssi", $slug, $name, $description, $imagePath, $image_position, $solutions, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Industry updated"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}
?>