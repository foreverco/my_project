<?php
header('content-type:text/html;charset=utf-8');

//1)通过post方式发送的数据必须通过$_POST接收
// var_dump($_POST);//php语法里的数组
//echo $_POST['uname'];//string

//echo '我接收到信息了';//string
//2)html标记格式
//echo '<div><h3 style="color:red">中秋节，发月饼啦！！</h3><p style="color:blue">作者：'.$_POST['uname'].'</p></div>';

//3)json格式
// title:'母猪的产后护理'
//author:'滕大师'
//time:'2018/9/14 17:14:15'
//content:'滕大师教你母猪的产后护理，包教包会，无效退款！滕大师教你母猪的产后护理，包教包会，无效退款！滕大师教你母猪的产后护理，包教包会，无效退款！滕大师教你母猪的产后护理，包教包会，无效退款！'

$article = array(
   'title'=>'母猪的产后护理',
   'author'=>'滕大师',
   'time'=>'2018/9/14 17:14:15',
   'content'=>'滕大师教你母猪的产后护理，只要998！买不了吃亏！买不了上当！包教包会，无效退款！'
);
//要把PHP的数组转成js认识的json格式
echo json_encode($article);


?>