<?php
   header('content-type:text/html;charset=utf-8');
   echo 'post方式提交的数据';
   var_dump($_POST);

   var_dump($_FILES);

   /* 
   array
  'photo' => 
    array
      'name' => string 'afanda.jpg' (length=10)
      'type' => string 'image/jpeg' (length=10)
      'tmp_name' => string 'C:\wamp\tmp\phpDBB8.tmp' (length=23)
      'error' => int 0
      'size' => int 464197 
      */
   $name = $_FILES['photo']['name'];
   $file = $_FILES['photo']['tmp_name'];
   move_uploaded_file($file,'imgs/'.$name);


?>