<?php
require_once "../config/database.php";

$result = $conn->query("
  SELECT * FROM documents 
  WHERE active = 1 
  AND (location LIKE '%Corporate Profile%' 
       OR location LIKE '%Download Page%')
  LIMIT 1
");

$row = $result->fetch_assoc();

echo json_encode($row);
?>