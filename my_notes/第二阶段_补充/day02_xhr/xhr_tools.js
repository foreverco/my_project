//get | post
/*封装get请求  */
function xhr_get(url,data){
  //1.创建xhr
  var xhr = new XMLHttpRequest();
  //2.建立连接
  if(data){
    url +="?"+data;
  }
  xhr.open('get',url);
  xhr.send(null);
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
      console.log(xhr.responseText);
    }
  }
}

/* 封装post请求 */
function xhr_post(url,data){
  var xhr = new XMLHttpRequest();
  xhr.open('post',url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  if(data){
    xhr.send(data);
  }else{
    xhr.send(null);
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
      console.log(xhr.responseText);
    }
  }
}

/* 将get请求和post请求封装到一起
  参数:
    url:请求地址
    data:请求参数
    methods:请求方式get/post
    success:数据获取成功的回调函数
*/
/* function xhr(url,methods,data,success){
  var xhr = new XMLHttpRequest();
  //判断methods
  if(methods.toLowerCase()==='get'){
    if(data){
      url+= '?'+data;
    }
    xhr.open(methods,url);
    xhr.send(null);
  }else if(methods.toLowerCase()==='post'){
    xhr.open(methods,url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if(data){
      xhr.send(data);
    }else{
      xhr.send(null);
    }
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
      success(xhr.responseText);
    }
  }
} */


function xhr(obj){
  var xhr = new XMLHttpRequest();
  //判断methods
  if(obj.methods.toLowerCase()==='get'){
    if(obj.data){
      //调用setData
      obj.url+= '?'+setData(obj.data);
    }
    xhr.open(obj.methods,obj.url);
    xhr.send(null);
  }else if(obj.methods.toLowerCase()==='post'){
    xhr.open(obj.methods,obj.url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if(obj.data){
      //调用setData
      xhr.send(setData(obj.data));
    }else{
      xhr.send(null);
    }
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4&&xhr.status==200){
      obj.success(xhr.responseText);
    }
  }
};

//处理data,变成字符串键值对
function setData(data){
  var urlData = '';
  //遍历 data
  for(key in data){
    urlData += '&' + key +'='+ data[key];
  }
  return urlData.slice(1);
}