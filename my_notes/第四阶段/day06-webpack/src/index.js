/* 引入common.js */
import common from './common.js';
//引入css文件
// import './css/base.css';
// import './css/main.css';
import './css/01.less';


// 再把 div 追加到 body 上
document.body.appendChild(common());

//发起 Ajax请求
const xhr = new XMLHttpRequest();
xhr.open('get','/search/rec?type=index');
xhr.send(null);
xhr.onreadystatechange = function(){
  if(xhr.readyState==4){
    console.log(xhr.responseText);
  }
}


// 在你的JS文件中判断 module.hot 是否开启
if(module.hot){
  module.hot.accept();
}

