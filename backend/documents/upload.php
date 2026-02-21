<?php
require_once "../config/database.php";

$name = $_POST['name'];
$location = $_POST['location'];
$size = $_POST['size'];

$file = $_FILES['file']['name'];
$tmp = $_FILES['file']['tmp_name'];

$uploadPath = "../uploads/" . $file;
move_uploaded_file($tmp, $uploadPath);

$stmt = $conn->prepare("INSERT INTO documents (name,file_path,location,size,active) VALUES (?,?,?,?,1)");
$stmt->bind_param("ssss",$name,$file,$location,$size);
$stmt->execute();

echo json_encode(["status"=>"success"]);
?>