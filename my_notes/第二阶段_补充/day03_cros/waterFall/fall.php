<?php
  /* 随机的获取data.json中10条数据 */
  header('Content-Type:application/json');
  //1.读取data.json
    $data = file_get_contents('./info/data.json');
    echo $data;
?>