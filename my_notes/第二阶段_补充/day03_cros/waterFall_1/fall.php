<?php
  /* 随机的获取data.json中10条数据 */
  header('Content-Type:application/json');
  //1.读取data.json
    $data = file_get_contents('./info/data.json');
  //2.把$data转化为php对象  json_decode()
    $dataArr = json_decode($data);
  //3.array_rand(arr,n) 这个方法是从数组中随机取出n个元素,并返回对应的下标的集合
    $randArr = array_rand($dataArr,10);
  //4.根据随机生成的随机下标去到总数组中取对应内容
    $newArr =array();
  //遍历下标数组 $randArr
    for($i=0;$i<count($randArr);$i++){
      //获取随机下标
      $key = $randArr[$i];
      //获取每一个随机的对象
      $randObj = $dataArr[$key];
      //把随机对象压入$newArr数组中 $array_push(数组,值)
      array_push($newArr,$randObj);
    }
    //输出结果 php对象转化为json字符串
    echo json_encode($newArr);
?>