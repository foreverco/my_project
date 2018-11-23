<?php
  header('Content-Type:application/json');
  $data = file_get_contents('./cities.json');
  echo $data;
?>