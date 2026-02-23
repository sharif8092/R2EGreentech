<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();
require_once "../config/database.php";

$rawData = file_get_contents("php://input");
$data = json_decode($rawData);

if (!$data) {
    $data = $_POST;
}

if(empty($data->username) || empty($data->password)){
    echo json_encode(["status" => "error", "message" => "Please enter username and password"]);
    exit();
}

$username = trim($data->username);
$password = trim($data->password);

$stmt = $conn->prepare("SELECT id, username, password, role FROM admins WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if($admin && trim($admin['password']) === $password){

    $_SESSION['admin_id'] = $admin['id'];

    echo json_encode([
        "status" => "success",
        "admin" => [
            "id" => $admin['id'],
            "username" => $admin['username'],
            "role" => $admin['role']
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid credentials."]);
}

$stmt->close();
$conn->close();
?>