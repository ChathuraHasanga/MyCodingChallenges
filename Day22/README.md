# Day22 - Simple PHP Login Demo

This small project demonstrates a minimal user registration and login flow using PHP and MySQL, intended for learning and local testing on WAMP (Windows).

Contents
- `db.php` - database connection helper
- `register.php` - simple user registration form and handler
- `login.php` - login form and authentication handler
- `logout.php` - logs the user out
- `welcome.php` - protected page shown after login

Prerequisites
- Windows with WAMP (Apache + PHP + MySQL)
- PHP 7.2+ recommended
- MySQL or MariaDB server

Database setup
1. Create a database (for example `day22`).
2. Create a `users` table. Example schema:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Update `db.php` with your DB credentials (host, username, password, database name).

How to use
1. Place the project folder under your webroot (for example `c:\wamp64\www\Day22`).
2. Start WAMP and ensure Apache and MySQL are running.
3. Open `http://localhost/Day22/register.php` to create a test user.
4. Open `http://localhost/Day22/login.php` to sign in with that user.
5. After successful login you'll be redirected to `welcome.php`.


Restart Apache after changes.

- Database connection issues: verify credentials in `db.php` and that MySQL is running.
- If login fails even with correct credentials: ensure passwords were stored using `password_hash()` and `register.php` and `login.php` use compatible hashing/verification.

Security notes
- This demo is intended for learning on a local machine only. Do not use as-is in production.
- Always use prepared statements (parameterized queries) to prevent SQL injection. Prefer PDO or MySQLi with prepared statements.
- Store passwords using `password_hash()` and verify with `password_verify()`.
- Use HTTPS in production.

Next steps / improvements
- Replace any inline SQL with prepared statements.
- Add CSRF protection for forms.
- Add server-side validation and stronger password requirements.
- Use sessions securely (regenerate session IDs on login, set cookie flags).

License
This project is provided for educational use.
