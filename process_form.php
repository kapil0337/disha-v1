<?php
/**
 * Disha Constructions - Lead Capture Processing Script
 * Handles both "Contact Us" and "Get Quote" submissions securely via PHPMailer.
 */

// Return JSON response for AJAX compatibility
header('Content-Type: application/json');

// Ensure this script is accessed via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit;
}

// Require our manually injected PHPMailer library
require 'lib/PHPMailer/Exception.php';
require 'lib/PHPMailer/PHPMailer.php';
require 'lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. Sanitize and Collect Inputs
$form_type = isset($_POST['form_type']) ? filter_var(trim($_POST['form_type']), FILTER_SANITIZE_STRING) : 'contact';
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8') : 'Unknown Lead';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone']), ENT_QUOTES, 'UTF-8') : 'Not Provided';
$subject_inquiry = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject']), ENT_QUOTES, 'UTF-8') : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';

// Basic Email Validation Failsafe
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

// 2. Logic Definitions
// Determine Subject Line
if ($form_type === 'quote') {
    $email_subject = "[QUOTE REQUEST] - " . $name;
} else {
    $email_subject = "[INQUIRY] - " . $name;
    if (!empty($subject_inquiry)) {
        $email_subject .= " | $subject_inquiry";
    }
}

// Ensure line breaks are preserved in the HTML message output
$html_message = nl2br($message);

// 3. Email Template (Professional Lead Card)
// Logo URL MUST be absolute in emails. Assuming GitHub Pages root relative path for demo, but advise client to use absolute prod domain later.
$logo_url = "https://kapil0337.github.io/disha-v1/images/logo.png";
$custom_html_body = "
<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: 'Arial', sans-serif; font-size: 14px; background-color: #f7f7f7; padding: 30px; margin: 0; color: #333333; }
    .lead-card { background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 5px solid #FF0000; }
    .logo-container { text-align: center; margin-bottom: 30px; }
    .logo-container img { height: 60px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    .data-table td { padding: 12px 10px; border-bottom: 1px solid #eeeeee; }
    .data-table td:first-child { font-weight: bold; width: 120px; color: #555555; }
    .message-block { background-color: #fcfcfc; border: 1px solid #eeeeee; padding: 15px; border-radius: 4px; line-height: 1.6; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #aaaaaa; }
</style>
</head>
<body>
    <div class='lead-card'>
        <div class='logo-container'>
            <img src='{$logo_url}' alt='Disha Constructions' />
        </div>
        <h2 style='color: #1A3673; margin-top: 0; border-bottom: 2px solid #FF0000; padding-bottom: 10px; display: inline-block;'>New Lead Details</h2>
        
        <table class='data-table'>
            <tr><td>Type:</td><td><strong>" . strtoupper($form_type) . "</strong></td></tr>
            <tr><td>Name:</td><td>{$name}</td></tr>
            <tr><td>Email:</td><td><a href='mailto:{$email}'>{$email}</a></td></tr>
            <tr><td>Phone:</td><td>{$phone}</td></tr>
        </table>

        <h3 style='margin-bottom: 10px; color: #1A3673;'>Message:</h3>
        <div class='message-block'>
            {$html_message}
        </div>
        
        <div class='footer'>
            This is an automated message generated from your website's robust lead capture system.
        </div>
    </div>
</body>
</html>
";

// 4. PHPMailer Dispatcher Configuration
$mail = new PHPMailer(true);

try {
    // Server settings (SMTP Configured based on user request)
    // IMPORTANT: SMTPAuth is true. Username and password MUST BE FILLED out on prod.
    $mail->isSMTP();                                            
    $mail->Host       = 'mail.dishaconstructions.com';                     
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'YOUR_SMTP_USER@dishaconstructions.com'; // TO-DO: Fill this     
    $mail->Password   = 'YOUR_SMTP_PASSWORD';                    // TO-DO: Fill this                        
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            
    $mail->Port       = 465;                                    

    // Sender details. Usually must match the authenticated username or an allowed alias
    $mail->setFrom('no-reply@dishaconstructions.com', 'Disha Constructions Website'); 
    
    // Set Reply-To to the client's email so the owner can hit "Reply"
    $mail->addReplyTo($email, $name);

    // Recipients
    $mail->addAddress('sales@dishaconstructions.com'); 
    $mail->addAddress('admin@dishaconstructions.com'); 
    $mail->addAddress('info@dishaconstructions.com');

    // Email Content Settings
    $mail->isHTML(true);                                  
    $mail->Subject = $email_subject;
    $mail->Body    = $custom_html_body;
    
    // Plain text alternative for email clients that strip HTML
    $mail->AltBody = "LEAD DETAILS:\n\nType: {$form_type}\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\n\nMessage:\n{$message}";

    // Dispatch
    $mail->send();
    echo json_encode(["status" => "success", "message" => "Message has been sent"]);
    
} catch (Exception $e) {
    // Log exception details silently in PHP error log, but return generic to UI
    error_log("Mailer Error: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Message could not be sent due to a mailer block. Config check needed."]);
}
