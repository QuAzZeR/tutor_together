var app = angular.module('tutor_together', 
  ['ionic', 
  'ngStorage', 
  'ngCordova',
  'Service',
  'RegisterService',
  'scheduleService',
  'dataService',
  'lessonService',
  'login',
  'profile',
  'mylesson',
  'lessondetail',
  'register',
  'createschedule',
  'createlesson',
  'schedule',
  'search',
  'addlocation',
  'locationService'
  ]);
var Url="http://128.199.122.155:7110";
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('IndexController',function ($scope,$location) {
  $scope.init = function(){
    $location.path('/login');  
  }
  
});



app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
        })
        .state('register',{
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        })
        .state('createlesson',{
            url: '/createlesson',
            templateUrl: 'templates/createlesson.html',
            controller: 'CreateLessonController'
        })
        .state('schedule',{
          url: '/schedule',
          templateUrl: 'templates/schedule.html',
          controller: 'ScheduleController'
        })
        .state('createschedule',{
          url: '/createschedule',
          templateUrl: 'templates/createschedule.html',
          controller: 'CreateScheduleController'
        })
        .state('lessondetail',{
          url: '/lessondetail',
          templateUrl: 'templates/lessondetail.html',
          controller: 'LessonDetailController'
        })
        .state('mylesson',{
          url: '/mylesson',
          templateUrl: 'templates/mylesson.html',
          controller: 'MylessonController'
        })
        .state('search',{
          url: '/search',
          templateUrl: 'templates/search.html',
          controller: 'SearchController'
        })
        .state('addlocation',{
          url: '/addlocation',
          templateUrl: 'templates/addlocation.html',
          controller: 'addLocationController'
        })
        
    $urlRouterProvider.otherwise('/login');
});
