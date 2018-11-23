<?php
header("content-type:text/html;charset=utf-8");
//1)声明一个数组
//索引数组
$arr1 = array('apple',10,3.14,true);
echo $arr1;//Array
echo "<hr color=red>";
print_r($arr1);//Array ( [0] => apple [1] => 10 [2] => 3.14 [3] => 1 )
echo "<hr color=green>";
var_dump($arr1);

//输出一下数组里元素:根据下标取元素
echo $arr1[0];
echo $arr1[3];//把true隐式转换成数值型 1

//获取数组的长度: 通过 count(数组名) 方法获取
echo "<hr>arr1数组的长度是".count($arr1)."<hr>";

//for循环遍历取数组元素
for($i=0;$i<count($arr1);$i++){
  echo "下标是: ".$i." 取到的元素是: ".$arr1[$i]."<hr color=blue>";
}

//关联数组
$arr2 = array();
$arr2['uname'] = 'Tom';
$arr2['age'] = 10;
$arr2['sex'] = 'boy';

var_dump($arr2);

$arr3 = array('uname'=>'John','age'=>18,'sex'=>'girl','school'=>'北京大学');
var_dump($arr3);
echo count($arr3);//4

//如何循环遍历关联数组?取到下标和对应的值
foreach($arr3 as $key=>$value){
  // echo "$key的值是".$key." "."value的值是".$value."<br>";
  // echo '$key的值是'.$key." $value的值是";
  // echo '$value';
  echo "1$value aa----";//John aa----
  echo "2$valuebb----";// 2----
  echo '3$valuecc----';//3$valuecc
}

//1)自己创建一个一维数组,遍历循环成一个列表显示(偶数行/奇数行添加不同颜色修饰)


//2)再试着创建一个二维数组,循环遍历一下


?>