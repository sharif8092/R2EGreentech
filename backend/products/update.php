<?php
require_once "../config/database.php";

$id = $_POST['id'];
$title = $_POST['title'];
$price = $_POST['price'];

$stmt = $conn->prepare("UPDATE products SET title=?, price=? WHERE id=?");
$stmt->bind_param("sdi",$title,$price,$id);

$stmt->execute();
echo json_encode(["status"=>"updated"]);
?>