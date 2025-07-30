<?php
session_start();

function check_honeypot()
{
    //check the honeypot
    if (filter_has_var(INPUT_POST, 'nickname')) {
        $honeypot = trim($_POST['nickname']);
        if ($honeypot) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
            exit;
        }
    }
}
function send_email($from_email, $message, $subject, $recipient_email)
{
    //email header
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = "From: $from_email";
    $headers[] = "Reply-To: $from_email";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $header = implode("\r\n", $headers);

    //send email
    $result = mail($recipient_email, $subject, $message, $header);

    // Log the result for debugging
    if (!$result) {
        error_log("Email failed to send. From: $from_email, To: $recipient_email, Subject: $subject");
    }

    return $result;
}

function validate()
{
    $inputs = [];
    $errors = [];

    //validate name
    if (filter_has_var(INPUT_POST, 'name')) {
        $inputs['name'] = trim($_POST['name']);
        if (trim($inputs['name']) === '') {
            $errors['name'] = 'Please enter your name correctly';
        }
    } else {
        $errors['name'] = 'Please enter your name correctly';
    }

    //validate email
    if (filter_has_var(INPUT_POST, 'email')) {
        $inputs['email'] = trim($_POST['email']);
        //validate email
        if (!filter_var($inputs['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address correctly';
        }
    } else {
        $errors['email'] = 'Please enter your address correctly';
    }

    //validate subject
    if (filter_has_var(INPUT_POST, 'subject')) {
        $inputs['subject'] = trim($_POST['subject']);
        if (trim($inputs['subject']) === '') {
            $errors['subject'] = 'Please enter a subject correctly';
        }
    } else {
        $errors['subject'] = 'Please enter a subject correctly';
    }

    //validate message
    if (filter_has_var(INPUT_POST, 'message')) {
        $inputs['message'] = trim($_POST['message']);
        if (trim($inputs['message']) === '') {
            $errors['message'] = 'Please enter a message correctly';
        }
    } else {
        $errors['message'] = 'Please enter a message correctly';
    }
    return [$inputs, $errors];
}

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method === 'POST') {
    $config = [
        'mail' => [
            'to_email' => 'chasanga074@gmail.com'
        ]
    ];


    //check honeypot
    check_honeypot();

    //validate inputs
    [$inputs, $errors] = validate();

    if (empty($errors)) {
        //send email
        $from_email = $inputs['email'];
        $subject = $inputs['subject'];
        $message = nl2br(htmlspecialchars($inputs['message']));

        $email_sent = send_email($from_email, $message, $subject, $config['mail']['to_email']);

        if ($email_sent) {
            $_SESSION['success_message'] = 'Thanks for contacting us! We will be in contact with you shortly.';
        } else {
            $_SESSION['error_message'] = 'Sorry, there was an error sending your message. Please try again later.';
        }
    } else {
        $_SESSION['error_message'] = 'Please fix the following errors';
        $_SESSION['errors'] = $errors;
        $_SESSION['inputs'] = $inputs;
    }

    header('Location: ' . $_SERVER['PHP_SELF'], true, 303);
    exit;
}

if ($request_method == 'GET') {

    if (isset($_SESSION['success_message'])) {
        $success_message = $_SESSION['success_message'];
        unset($_SESSION['success_message']);
    } elseif (isset($_SESSION['inputs'], $_SESSION['errors'])) {
        $error_message = $_SESSION['error_message'];
        $errors = $_SESSION['errors'];
        $inputs = $_SESSION['inputs'];
        unset($_SESSION['errors'], $_SESSION['inputs'], $_SESSION['error_message']);
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>PHP Contact Form</title>
</head>

<body>
    <main>
        <?php if (isset($success_message)): ?>
            <div class="alert alert-success">
                <?= $success_message ?>
            </div>
        <?php endif ?>

        <?php if (isset($error_message)): ?>
            <div class="alert alert-error">
                <?= $error_message ?>
            </div>
        <?php endif ?>

        <form action="<?= htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="post">
            <header>
                <h1>Send Us a Message</h1>
            </header>

            <div>
                <label for="name">Name</label>
                <input type="text" value="<?= $inputs['name'] ?? '' ?>" name="name" id="name"
                    placeholder="Enter Full name">
                <small><?= $errors['name'] ?? '' ?></small>
            </div>

            <div>
                <label for="email">Email</label>
                <input type="email" value="<?= $inputs['email'] ?? '' ?>" name="email" id="email"
                    placeholder="Enter Email address">
                <small><?= $errors['email'] ?? '' ?></small>
            </div>

            <div>
                <label for="subject">Subject:</label>
                <input type="text" name="subject" id="subject" value="<?= $inputs['subject'] ?? '' ?>"
                    placeholder="Enter a subject">
                <small><?= $errors['subject'] ?? '' ?></small>
            </div>

            <div>
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5"><?= $inputs['message'] ?? '' ?></textarea>
                <small><?= $errors['message'] ?? '' ?></small>
            </div>

            <label for="nickname" aria-hidden="true" class="user-cannot-see">Nickname
                <input type="text" name="nickname" id="nickname" class="user-cannot-see" tabindex="-1"
                    autocomplete="off">
            </label>

            <button type="submit">Send Message</button>
        </form>
    </main>
</body>

</html>