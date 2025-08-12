<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form fields
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $phone   = htmlspecialchars(trim($_POST['phone']));
    $address = htmlspecialchars(trim($_POST['address']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Who should receive the email
    $to = "hr@example.com, compliance@example.com"; // multiple recipients separated by commas

    // Email subject
    $subject = "New Contact Form Submission from $name";

    // Email content
    $body = "
    You have received a new contact form submission:

    Name: $name
    Email: $email
    Phone: $phone
    Address: $address

    Message:
    $message
    ";

    // Headers
    $headers = "From: no-reply@example.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "invalid";
}
?>
