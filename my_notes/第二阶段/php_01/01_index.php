<?php
header("content-type:text/html;charset=utf-8");
//1)输出语句1:
echo 'apple';
echo "<hr color=blue>";
//2)输出语句2:
print_r('banana');
//3)输出语句3:
var_dump('国庆假期7日自助游');

//4)定义变量
//1)字符串类型
$userName = 'apple';
$userSex = '男';
$school = "清华大学";

// 拼接用.
echo "我的名字是:".$userName." 性别是:".$userSex." 毕业于:".$school."<hr>";

//2)数值
$num1 = 20;
$num2 = 3.1415926;

var_dump($num1,"<br>");
var_dump($num2,"<br>");


?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
    这是HTML网页的主体内容区
</body>
</html>
<?php
  echo "php输出在html网页标签下边";
?>