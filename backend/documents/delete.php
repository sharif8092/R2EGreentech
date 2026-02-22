<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/database.php");

$id = $_POST['id'];

$result = $conn->query("SELECT file_path FROM documents WHERE id=$id");
$row = $result->fetch_assoc();

if ($row) {
    $file = "../" . str_replace("backend/", "", $row['file_path']);
    if (file_exists($file)) {
        unlink($file);
    }

    $conn->query("DELETE FROM documents WHERE id=$id");

    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error"]);
}