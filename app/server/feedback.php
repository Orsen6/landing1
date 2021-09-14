<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
$postdata = file_get_contents('php://input');

$status = false;
$errors = [];
$data = json_decode($postdata);

if ($data->name == '') {
    $message = 'Ви не ввели своє ім`я';
    $errors[] = $message;
}

if (strlen($data->name) > 50) {
    $message = 'Поле ім`я містить більше 50 символів';
    $errors[] = $message;
}

if (preg_match('/[^0-9\+\_]/', $data->phone)) {
    $message = 'Поле номер телефону містить недопустимі символи';
    $errors[] = $message;
}

if ($data->phone == '') {
    $message = 'Ви не ввели свій номер телефону';
    $errors[] = $message;
}

if (strlen($data->phone) < 10) {
    $message = 'Поле номер телефону містить менше ніж 10 символів';
    $errors[] = $message;
}

if (strlen($data->phone) > 16) {
    $message = 'Поле номер телефону містить більше 16 символів';
    $errors[] = $message;
}

//$mail->SMTPDebug = 3; // Дебаг
// Рекомендовано використовувати SMTP Yandex
if (empty($errors)) {
    $status = true;
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'rob.stark09@yandex.ua'; // Почта
    $mail->Password = '1qa2ws3edewq'; // Пароль від неї
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('rob.stark09@yandex.ua'); // Від кого буде відправлятись
    $mail->addAddress('orsenkul@gmail.com'); // Кому буде приходити
    $mail->isHTML(true);

    $mail->Subject = 'Нова заявка';
    $mail->Body = '' . $data->name . ' залишив заявку. <br>Номер телефону ' . $data->phone . '';
    $mail->AltBody = '';

    if (!$mail->send()) {
		$status = false;
        $message = 'Помилка відправки пошти';
    }
}

$content = array(
    'status' => $status,
    'message' => $message
);

echo json_encode($content);
?>