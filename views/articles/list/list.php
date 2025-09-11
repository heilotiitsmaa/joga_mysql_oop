<?php
// Kui kasutatakse REST API-d, siis:
$articles = file_get_contents('http://localhost:3000/articles');
$articles = json_decode($articles, true);
?>