<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../config/database.php");

$id = $_POST['id'];
$active = $_POST['active'];

$stmt = $conn->prepare("UPDATE documents SET active=? WHERE id=?");
$stmt->bind_param("ii", $active, $id);

if ($stmt->execute()) {
    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error"]);
}