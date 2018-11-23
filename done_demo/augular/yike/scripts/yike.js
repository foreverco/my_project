//创建angular 应用模块
var app = angular.module('app',['ngRoute','Controller']);
/**
 * 当app应用创建完成后，立即调用app.run方法
 * run方法针对的是全局，是整个应用，只能依赖根作用域
  */
app.run(['$rootScope',function($rootScope){
   // console.log('app启动了');

   //页面刚加载时，isShow不起效，不显示
   $rootScope.isShow = false;
   //给菜单按钮添加单击事件toggle
   $rootScope.toggle = function(){
      // alert('单击了');
      $rootScope.isShow = ! $rootScope.isShow;
      //选择所有的dd
      var dd = document.querySelectorAll('dd');
      //当面板向右移动时，dd也向右移动,显示出来(isShow:true)
      //当面板向左移动时，dd也向左移动,显示出来(isShow:false)
      if($rootScope.isShow){
         for(var i=0; i<dd.length; i++) {
            dd[i].style.transitionDuration = (i + 1) * 0.15 + 's';
            dd[i].style.transitionProperty = 'all';
            dd[i].style.transitionDelay = '0.2s';
            dd[i].style.transitionTimingFunction = 'ease-out';
            dd[i].style.transform = 'translate(0)';
         }
      }else{
         for(var i=dd.length - 1; i>=0; i--) {
            dd[i].style.transitionDuration = (dd.length - i + 1) * 0.05 + 's';
            dd[i].style.transitionProperty = 'all';
            dd[i].style.transitionDelay = '';
            dd[i].style.transitionTimingFunction = 'ease-out';
            dd[i].style.transform = 'translate(-100%)';
         }
      }
   }
}]);

// 修改路由锚点错误的bug
app.config(['$locationProvider',function($locationProvider){
   // $locationProvider.html5Mode(false);
   $locationProvider.hashPrefix('');
}]);

//配置路由
app.config(['$routeProvider',function($routeProvider){
   $routeProvider.when('/',{
      redirectTo:'index'      //  /请求时，直接跳转到index页面
   }).when('/index',{
     //发送请求，获取视图
     //app.get('/inxex',fn()) 处理/index请求，返回list视图
      templateUrl:'/index',//发生/index请求
      //调用指定名称的控制器，将其中绑定的数据传递给templateUrl得到的视图
      controller:'index'
   }).when('/older',{
      templateUrl:'/older',
      controller:'older'
   }).when('/author',{
      templateUrl:'/author'





   }).when('/category',{
      templateUrl:'/index',
      controller:'category'
   }).when('/favourite',{
      templateUrl:'/index',
      controller:'favourite'
   }).when('/settings',{
      templateUrl:'/index',
      controller:'settings'
   }).otherwise({

   })
}])