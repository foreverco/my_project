<?php
   header('content-type:text/html;charset=utf-8');

   echo '数组演示';
   //1)定义一个多维数组
   $web1807 = array(
      array(
         '姓名','年龄','性别'
      ),
      array(
         'uname'=>'邓超',
         'uage'=>30,
         'usex'=>'男'
      ),
      array(
         'uname'=>'陈赫',
         'uage'=>32,
         'usex'=>'女'
      ),
      array(
         'uname'=>'杨颖',
         'uage'=>30,
         'usex'=>'男'
      ),
      array(
         'uname'=>'郑凯',
         'uage'=>32,
         'usex'=>'女'
      ),
      array(
         'uname'=>'王祖蓝',
         'uage'=>30,
         'usex'=>'男'
      ),
      array(
         'uname'=>'鹿晗',
         'uage'=>32,
         'usex'=>'女'
      ),
   );

   //在页面上输出数组
   var_dump($web1807);
   //输出数组长度(统计有多少学生);
   echo 'web1807总共有学生：'.count($web1807).'位';

   //显示成一个表格的形式
   /* 
      $key可以省略
      foreach($web1807[$i] as $key1=>$value1){
         echo '<td>'.$value1.'</td>';
      } 
      foreach($web1807[$i] as $value1){
         echo '<td>'.$value1.'</td>';
      } 
   */
   echo '<table border=1 bordercolor="red" cellpadding=60 cellspacing=0>';
   for($i=0;$i<count($web1807);$i++){
      //$key:下标
      //$value:值
      //var_dump($web1807[$i]);一维数组
      //如果是偶数行，加粉色背景
      //如果是技术航，加天蓝色背景
      if($i%2 == 0){
         echo '<tr bgcolor="pink">';
      }else{
         echo '<tr bgcolor="skyblue">';
      }
      
      foreach($web1807[$i] as $key1=>$value1){
         echo '<td>'.$value1.'</td>';
      }
      echo '</tr>';
   }
   echo '</table>';





   
  



?>