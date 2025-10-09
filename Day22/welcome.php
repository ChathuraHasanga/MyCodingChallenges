<?php

session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}
?>
<style>
body { font-family: Arial; text-align: center; background: #f4f4f4; }
form { display: inline-block; background: white; padding: 20px; border-radius: 10px; margin-top: 100px; }
input, button { margin: 10px; padding: 10px; width: 200px; }
button { background: #007bff; color: white; border: none; cursor: pointer; }
button:hover { background: #0056b3; }
</style>


<h2>Welcome, <?php echo $_SESSION['user']; ?></h2>
<h2>Welcome to this page!!!</h2>
<a href="logout.php">Logout</a>