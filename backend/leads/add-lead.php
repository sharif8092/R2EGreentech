<?php
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("INSERT INTO leads (name, company, email, category, message) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $data->name, $data->company, $data->email, $data->category, $data->message);
$stmt->execute();

echo json_encode(["status" => "success"]);
?>