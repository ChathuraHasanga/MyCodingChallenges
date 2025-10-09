<?php
include('db.php');


if (isset($_POST['SUBMIT'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $QUERY = "INSERT INTO users (username, email , password) VALUES ('$username', '$email', '$password')";

    if (mysqli_query($conn, $QUERY)) {
        echo "<script>alert('Registration Succesful'); window.location='login.php';</script>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
<style>
body { font-family: Arial; text-align: center; background: #f4f4f4; }
form { display: inline-block; background: white; padding: 20px; border-radius: 10px; margin-top: 100px; }
input, button { margin: 10px; padding: 10px; width: 200px; }
button { background: #007bff; color: white; border: none; cursor: pointer; }
button:hover { background: #0056b3; }
</style>


<form method="POST" action="">
    <h2>Sign Up</h2>
    <input type="text" name="username" placeholder="Enter Username" required><br>
    <input type="email" name="email" placeholder="Enter Email" required><br>
    <input type="password" name="password" placeholder="Enter Password" required><br>
    <button type="submit" name="SUBMIT">Register</button>
</form>