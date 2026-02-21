<?php
require_once "../config/database.php";

$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];

$image = $_FILES['image']['name'];
move_uploaded_file($_FILES['image']['tmp_name'], "../uploads/".$image);

$stmt = $conn->prepare("INSERT INTO products (title,description,price,image) VALUES (?,?,?,?)");
$stmt->bind_param("ssds",$title,$description,$price,$image);

$stmt->execute();
echo json_encode(["status"=>"created"]);
?>