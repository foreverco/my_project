<?php
header('content-type:text/html;charset= utf-8');
//接收表单传递的数据
/*php里的预定义变量：
   $_GET:接收通过get方式传递的数据
   $_POST:接收通过post方式传递的数据
*/
echo 'get方式提交的数据';
var_dump($_GET);
echo 'post方式提交的数据';
var_dump($_POST);

/* 
   姓名：
   性别：
   ...

*/
echo '<br>姓名是'.$_POST['uname'];
echo '<br>昵称是'.$_POST['unick'];
echo '<br>性别是'.$_POST['usex'];
//多个爱好组成了一个数组，循环遍历输出爱好的值
foreach($_POST['ulike'] as $key=>$value){
echo '<br>爱好是'.$value.',下标是'.$key;

}

// echo '<br>头像是'.$_POST['photos'];
echo '<br>文件的相关信息';
var_dump($_FILES);
/* 
   array
      'photo' => 
         array
            'name' => string '7.jpg' (length=5)
            'type' => string 'image/jpeg' (length=10)
            'tmp_name' => string 'C:\wamp\tmp\php28DF.tmp' (length=23)
            'error' => int 0
            'size' => int 60717
 */
//php开发人员负责处理文件：把文件保存到服务器的地址里

//move_uploaded_file('移动谁','到哪去');
//文件临时存储地址
$file = $_FILES['photos']['tmp_name'];
//文件名字
$name = $_FILES['photos']['name'];
//把文件从临时地址转移动服务器upload目录下
move_uploaded_file($file,'upload/'.$name);




?>