//封装控制器模块
//该模块的主要作用，创建控制器

//创建控制器模块，名称为Controller
angular.module('Controller',[])
//创建navs的控制器
.controller('navs',['$scope',function($scope){
   //将导航栏的标题及其他内容绑定
   $scope.navs = [
      {link:'#/index',icon:'icon-home',text:'今日一刻'},
      {link:'#/older',icon:'icon-file-empty',text:'往期内容'},
      {link:'#/author',icon:'icon-pencil',text:'热门作者'},
      {link:'#/category',icon:'icon-menu',text:'栏目浏览'},
      {link:'#/favourite',icon:'icon-heart',text:'我的喜欢'},
      {link:'#/settings',icon:'icon-cog',text:'设置'}
   ]
}])

//定义index控制器
.controller('index',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
   // $scope.msg = '来自控制器的数据curry';
   //绑定标题
   //标题不是某一个控制器独有的，每一个控制器都能修改标题，所以将其绑定在根作用域上
   $rootScope.title = '今日一刻';
   //选中状态，将数组的下标($index)与点击的值进行比较
   //绑定点击的值
   $rootScope.index = 0;
   //面板整体向左移动
   // $rootScope.toggle();

   //测试绑定的数据
   // $scope.datas =[
   //    {id:1,name:'jack'},
   //    {id:2,name:'jim'},
   //    {id:3,name:'lily'}
   // ]
   $rootScope.isLoading = true;
   //使用$http发送请求给服务器端(app.js)
   $http({
      url:'/getIndexData'
   }).then(function(result){
      $rootScope.isLoading = false;
      //新版本的angularjs已经废弃了success方法，改用then方法
      // console.log(result.data);
      var res = result.data;
      if(res.status =='OK'){
         //成功获得数据
         // console.log(JSON.parse(res.data));
         //获取返回数据中的data的值，同时将其转换为json格式
         var json = JSON.parse(res.data);
         //绑定json中需要的数据posts
         $scope.posts = json.posts;
         $scope.status = 1;//绑定状态，判断节点是否存在的依据
      }else{
         //出错的状态，返回的是一句字符串
         // console.log(res.data);
         //绑定错误的信息
         $scope.msg = res.data;
         $scope.status = 0;
      }
   })

}])

//定义older控制器
.controller('older',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
   // $scope.msg = '来自older的数据';
   //修改标题
   $rootScope.title = '往期内容';
   //修改选中状态
   $rootScope.index = 1;
   //发送请求过程中没有数据，显示加载图片
   $rootScope.isLoading = true;
   $http({
      url:'/getOld'
   }).then(function(result){
      //得到响应数据，显示响应回来的数据，加载图隐藏
      $rootScope.isLoading = false;
      var res =result.data;
      if(res.status =='OK'){
         var json = JSON.parse(res.data);
         $scope.posts = json.posts;
         $scope.status =1;

      }else{
         $scope.msg =res.data;
         $scope.status = 0;
      }
   })
}])















.controller('author',['$scope','$rootScope',function($scope,$rootScope){
   $scope.msg = '来自author的数据';
   //修改标题
   $rootScope.title = '热门作者';
   //修改选中状态
   $rootScope.index = 2;
}])

.controller('category',['$scope','$rootScope',function($scope,$rootScope){
   $scope.msg = '来自category的数据';
   //修改标题
   $rootScope.title = '栏目浏览';
   //修改选中状态
   $rootScope.index = 3;
}])

.controller('favourite',['$scope','$rootScope',function($scope,$rootScope){
   $scope.msg = '来自favourite的数据';
   //修改标题
   $rootScope.title = '我的喜欢';
   //修改选中状态
   $rootScope.index = 4;
}])

.controller('settings',['$scope','$rootScope',function($scope,$rootScope){
   $scope.msg = '来自settings的数据';
   //修改标题
   $rootScope.title = '设置';
   //修改选中状态
   $rootScope.index = 5;
}])