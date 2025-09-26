<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "day21_db";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

$sql = "INSERT INTO users(name, email) VALUES ('Chathura', 'chathura@gmail.com')";
if ($conn->query($sql) === TRUE) {
    echo "<br> New record created successfully";
} else {
    echo "<br> Error: " . $conn->error;
}

$sql2 = "SELECT id, name, email FROM users";
$result = $conn->query($sql2);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<br> ID: " . $row["id"] . " | Name: " . $row["name"] . " | Email: " . $row["email"];
    }
} else {
    echo "<br> No results";
}
$conn->close();
?>