<?php 
header('Content-type: text/html; charset=utf-8');

function getData($key){
	if(is_array($_POST[$key])){
		$new_array = array_diff($_POST[$key], array(''));
		return implode(', ', $new_array);

	}else{
		if(isset($_POST[$key])) {
		   return htmlspecialchars(trim($_POST[$key]));
		} else
			return '';
	}
}
	$name  = getData('name');
	$phone = getData('phone');
	$email = getData('email');

	$family = getData('family');
	$secondname = getData('secondname');
	$city = getData('city');
	$title = getData('title');
	$quest = getData('quest');
	
	$response = array();
	$responseError = array(
		100 => array(
			'code' => 100,
			'text' => 'сообщение отправлено'
		),
		101 => array(
			'code' => 101,
			'text' => 'сообщение не отправлено'
		),
		102 => array(
			'code' => 102,
			'text' => 'заполнены не все поля'
		),
		103 => array(
			'code' => 103,
			'text' => 'неправильный email'
		),
		
	);
	 
	/* Проверяем заполнены ли все поля */
	if  (!empty($phone) && !empty($email)){
	 
		/*  Проверяем правильность ввода email-адреса */
		if(!preg_match("/[0-9a-z_]+@[0-9a-z_^\.]+\.[a-z]{2,3}/i", $email) || !preg_match("/^[0-9\s\(\)\+\-]{1,18}$/", $phone)){
			$response = $responseError[103];	//неправильный email или телефон
		}else{

			$email = ($email == 'none@none.none') ? '' : $email;
			$phone = ($phone == '0000000000') ? '' : $phone;
	 
			/* Формируем сообщение */
			$address = "buzykin@center-fp.ru";/*Вставляем нужный адрес*/
			$sub = "Сообщение с сайта Центр финансовой поддержки";/*тема*/
			$message = "<p>Имя: <strong>$family $name $secondname</strong><br>Email: <strong>$email</strong><br>Телефон: <strong>$phone</strong></p><p>Город: $city</p><p>Вопрос: $quest</p><p>Заполнена форма: $title</p>";

			/* Отправка сообщения */
			$verify = mail($address, $sub, $message, "Content-type:text/html; charset = utf-8\r\nFrom:buzykin@center-fp.ru");
		 
			if  ($verify == true){
				$response = $responseError[100];  //сообщение отправлено
			}else{
				$response = $responseError[101];	 //сообщение не отправлено
			};
		}
	}else{
		$response = $responseError[102]; //заполнены не все поля;
	}
	
	echo json_encode($response);