<?php
$servername = "localhost";
$username = "root";
$password = ""; // change if needed
$dbname = "food_ordering";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);

// Check
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$phone = $_POST['phone'];
$item = $_POST['item'];
$qty = $_POST['quantity'];

// Insert into DB
$sql = "INSERT INTO orders (name, phone, item, quantity)
        VALUES ('$name', '$phone', '$item', $qty)";

if ($conn->query($sql) === TRUE) {
    echo "Order placed successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
