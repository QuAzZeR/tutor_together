// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova','Service','scheduleService'])
var PostUrl="http://10.2.32.102:8000";
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
        });
    $urlRouterProvider.otherwise('/login');
});
app.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$http,UserRegisterService) {

    $scope.login = function() {
        $localStorage.accessToken = "CAAMrJe8InhYBAIxPt9XpmPshOUKbfoLyzzXoZAy6wuTFy8xRREmzZCu8Iv4LrPuSyBJLrLfRi2r9sNuSl7DUEiJW3Sa7TZArUWmtrAcCfMG9Ity7MD43lkHb4P7stxP8JPstIWKRd830w07xWxCMAB28QZAe8g4wcwqLxZAd0VrhOZBMfZCcai7M7zVZBSumPngZD"
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,email,picture", format: "json" }}).then(function(result) {
            $scope.profileData = result.data;
            var sendData = result.data;
                sendData.site = 'facebook';
                UserRegisterService.setInfo(sendData);
                $http.post(PostUrl+"/login", sendData).then(function(response) {
                    if(response.data == "go_regis"){
                       $location.path("/register");
                   }
                   else {
                      $location.path("/profile");      
                   }
               });
                
         });
     }
     $scope.createlesson = function(){
        console.log("in createleson")
        $localStorage.accessToken = "CAAMrJe8InhYBAIxPt9XpmPshOUKbfoLyzzXoZAy6wuTFy8xRREmzZCu8Iv4LrPuSyBJLrLfRi2r9sNuSl7DUEiJW3Sa7TZArUWmtrAcCfMG9Ity7MD43lkHb4P7stxP8JPstIWKRd830w07xWxCMAB28QZAe8g4wcwqLxZAd0VrhOZBMfZCcai7M7zVZBSumPngZD"
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,email,picture", format: "json" }}).then(function(result) {
            $scope.profileData = result.data;
            var sendData = result.data;
                sendData.site = 'facebook';
                UserRegisterService.setInfo(sendData);
                /*$http.post(PostUrl+"/login", sendData).then(function(response) {
                    if(response.data == "go_regis"){
                       $location.path("/register");
                   }
                   else {
                      $location.path("/createlesson");      
                   }
               });*/
                 $location.path("/createlesson");      
                
         });
     }
});

// app.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$http,UserRegisterService) {

//     $scope.login = function() {

//         $cordovaOauth.facebook("891866854235670", ["email"]).then(function(result) {
//             $localStorage.accessToken = result.access_token;
//             $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,email,picture", format: "json" }}).then(function(result) {
//                 $scope.profileData = result.data;
//                 var sendData = result.data;
//                 sendData.site = 'facebook';
//                 UserRegisterService.setInfo(sendData);
//             $http.post(PostUrl+"/login", sendData).then(function(response) {
//                 if(response.data == "go_regis"){
                    
//                     $location.path("/register");
//                 }
//                 else {
//                     $location.path("/profile");
//                 }
//             });
//             },function(error){

//             });

//         }, function(error) {
//             alert("There was a problem signing in!  See the console for logs");
//             console.log(error);
//         });
//     };

// });




app.controller('RegisterController', function($scope,UserRegisterService,$http) {
  $scope.age;
  $scope.phone;
  $scope.groups = [];
  $scope.choice = {
      select_status: ["student","teacher"],
      select_choice: "student"
  };
  $Subject = []
  $level = []
  $scope.init = function(){
    console.log("in init")
    $http.get(PostUrl+"/getsubjectdata").then(function(response){
        $Subject = response.data.subjects;
        $level = response.data.levels;
        console.log(response.data);
        setSubjectGroup();
      });
    
    console.log($Subject);

  }

  var setSubjectGroup = function() {
    for (var i=0; i<$Subject.length; i++) {
      $scope.groups[i] = {name: $Subject[i]};
      $scope.groups[i].items = [];
      for(var j=0; j<$level.length; j++) {
        $scope.groups[i].items[j] = {level: $level[j], selected: false} 
      }
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
          $scope.shownGroup = group;
        }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  collectData = function(phone){
    var tmp = UserRegisterService.getInfoForRegister();
    profileData = {}
    profileData.name = tmp.name;
    profileData.gender = tmp.gender;
    profileData.email = tmp.email;
    profileData.pic_profile = tmp.pic_profile;
    profileData.authen = {site: tmp.site, id : tmp.id};
    profileData.isTutor = ($scope.choice.select_choice == "teacher") ? true : false;
    profileData.tel = phone;
  
    tmp=[]
    var count = 0;
    for (var i=0; i<4; i++) {
         if($scope.groups[i].items['0'].selected==true)
             tmp[count++] = {level : $scope.groups[i].items[0].level,subject : $scope.groups[i].name}
         if($scope.groups[i].items['1'].selected)
             tmp[count++] = {level : $scope.groups[i].items[1].level,subject : $scope.groups[i].name}
    }
    profileData.teach_subjects=tmp
    return profileData;

  }
  $scope.register = function(phone) {
    tmp = PostUrl+"/regis";
    console.log(tmp);
    collectData(age,phone)
     $http.post(tmp, collectData(phone) ).then(function(response) {
       console.log(response.data);
       $location.path("/profile");
     });

  }
});
app.controller("ProfileController",function($scope,$location,$http,UserRegisterService){
  $scope.init = function(){
      $http.post(PostUrl+"/profile",UserRegisterService.getInfoForRegister()).then(function(response){      
        $scope.showData = response.data;
        $scope.showData.teach = ""
        for(var i = 0; i < $scope.showData.teach_subjects.length ;i++){
          if($scope.showData.teach.search($scope.showData.teach_subjects[i].subject)==-1)
            $scope.showData.teach+= $scope.showData.teach_subjects[i].subject+" "
        }
      });

  }
});

app.controller("CreateLessonController",function($scope,$location,$http,UserRegisterService,MySchedule){
  $scope.init = function(){
      // $http.get(PostUrl+"/getsubjectdata").then(function(response){
      //   $scope.Subjects = response.data.subjects;
      //   $scope.levels = response.data.levels;
      //   console.log(response.data);
      //   setSubjectGroup();
      // });
      $scope.Subjects = ["Mathmatics","Science","Art","English","Thai","Social"];
      $scope.levels = ["ม.ต้น","ม.ปลาย"];
      $scope.selected_subject = $scope.Subjects[0];
      $scope.selected_level = $scope.levels[0];
      MySchedule.clearSchedule();
  };
  $scope.go_schedule = function(){
    
    $location.path("/schedule");
  }
  $scope.create = function(){
    console.log(MySchedule.getSchedule());
    $location.path("/login");
  }
});
app.controller("ScheduleController",function($scope,$location,MySchedule){
  $scope.init = function(){
      $scope.schedule_now = MySchedule.getSchedule();
      console.log($scope.schedule_now);
  };
  $scope.go_create = function(){
      $location.path("/createschedule");
  };
  $scope.go_back = function(){
    $location.path("/createlesson")
  }
});
app.controller("CreateScheduleController",function($scope,$location,MySchedule){
  $scope.init = function(){
    $scope.selected_day="Monday";
    $scope.selected_timestart = "00.00";
    $scope.selected_timeend ="01.00";
  }
  $scope.create = function(day,timeStart,timeEnd){
    ThisSchedule = {}
    ThisSchedule.day = day;
    ThisSchedule.time_ranges={time_start: timeStart , time_end: timeEnd};
    
    MySchedule.addSchedule(ThisSchedule);
    console.log(MySchedule.getSchedule());
    $location.path('/schedule');

  }
  $scope.go_back = function(){
    window.history.back();
  }
});
app.controller("LessonDetailController",function($scope,$location,$http,UserRegisterService){

});
