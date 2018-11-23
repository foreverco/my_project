<?php
header('Content-Type:application/json');
  //获取first.json
  //使用 file_get_contents(路径)
  $data = file_get_contents('./first.json');
  echo $data;
?>