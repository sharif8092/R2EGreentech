<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/database.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status"=>"error","message"=>"Invalid request"]);
    exit;
}

if (!isset($_FILES['file'])) {
    echo json_encode(["status"=>"error","message"=>"No file uploaded"]);
    exit;
}

$uploadDir = "../uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileName = time() . "_" . basename($_FILES["file"]["name"]);
$targetFile = $uploadDir . $fileName;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {

    $name = $_FILES["file"]["name"];
    $size = round($_FILES["file"]["size"] / (1024 * 1024), 2) . " MB";
    $date = date("Y-m-d");
    $location = $_POST['location'];

    $filePath = "backend/uploads/" . $fileName;

    $stmt = $conn->prepare("INSERT INTO documents (name, size, date, location, file_path) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $size, $date, $location, $filePath);

    if ($stmt->execute()) {
        echo json_encode(["status"=>"success"]);
    } else {
        echo json_encode(["status"=>"error","message"=>$stmt->error]);
    }

} else {
    echo json_encode(["status"=>"error","message"=>"Upload failed"]);
}