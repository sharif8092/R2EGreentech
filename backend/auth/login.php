<?php
session_start();
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if($user && password_verify($password,$user['password'])){
    $_SESSION['user_id'] = $user['id'];
    echo json_encode(["status"=>"success"]);
}else{
    echo json_encode(["status"=>"invalid"]);
}
?>