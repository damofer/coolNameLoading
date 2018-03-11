<?php

session_start();
require 'databaseFiles/database.php';

if( isset($_SESSION['user_id']) ){
  echo true;
  

}else{

if(isset($_POST['email']) && isset($_POST['password'])):
  
 
  $records = $conn->prepare('SELECT ID,EMAIL,PASSWORD FROM users WHERE EMAIL = :email');
  $records->bindParam(':email', $_POST['email']);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
 
  // password_verify($_POST['password'], $results['PASSWORD'])
 
 echo "success";
  if(count($results) > 0 && ($_POST['password'] == $results['PASSWORD']) ){
    $_SESSION['user_id'] = $results['ID'];
    $_SESSION['user_email']=$results['EMAIL'];
   
    echo true;
   
  } else {
    echo false;
  }
endif;
}
?>