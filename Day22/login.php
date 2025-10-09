<?php
session_start();
include('db.php');

$login_error = '';

if (isset($_POST['login'])) {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Use a prepared statement to avoid SQL injection and ensure reliable results
    $stmt = mysqli_prepare($conn, "SELECT id, username, password FROM users WHERE email = ?");
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 's', $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $id, $username, $hash);

        if (mysqli_stmt_fetch($stmt)) {
            if (password_verify($password, $hash)) {
                // successful login
                $_SESSION['user'] = $username;
                $_SESSION['user_id'] = $id;
                mysqli_stmt_close($stmt);
                header('Location: welcome.php');
                exit();
            } else {
                $login_error = 'Invalid email or password.';
            }
        } else {
            $login_error = 'Invalid email or password.';
        }

        mysqli_stmt_close($stmt);
    } else {
        $login_error = 'Database error: ' . mysqli_error($conn);
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

<?php if (!empty($login_error)): ?>
    <script>alert('<?php echo addslashes($login_error); ?>');</script>
<?php endif; ?>

<form method="POST" action="">
    <h2>Login</h2>
    <input type="email" name="email" placeholder="Email" required><br>
    <input type="password" name="password" placeholder="Password" required><br>
    <button type="submit" name="login">Login</button>
</form>