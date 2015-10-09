// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova','Service'])
var PostUrl="http://10.2.37.19:8000";
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
        // .state('profile', {
        //     url: '/profile',
        //     templateUrl: 'templates/profile.html',
        //     controller: 'ProfileController'
        // })
        // .state('feed', {
        //     url: '/feed',
        //     templateUrl: 'templates/feed.html',
        //     controller: 'FeedController'
        // })
        .state('register',{
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
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
                $location.path("/register")
         })
}

});

// app.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$http,UserRegisterService) {
//
//     $scope.login = function() {
//
//         $cordovaOauth.facebook("891866854235670", ["email"]).then(function(result) {
//             $localStorage.accessToken = result.access_token;
//             $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,email,picture", format: "json" }}).then(function(result) {
//                 $scope.profileData = result.data;
//                 var sendData = result.data;
//                 sendData.site = 'facebook';
//             $http.post(PostUrl+"/login", sendData).then(function(response) {
//                 if(response.data == "go_regis"){
//                     UserRegisterService.setInfo(sendData);
//                     $location.path("/register");
//                 }
//                 else {
//                     $location.path("/profile");
//                 }
//             });
//             },function(error){
//
//             });
//
//         }, function(error) {
//             alert("There was a problem signing in!  See the console for logs");
//             console.log(error);
//         });
//     };
//
// });

// app.controller("ProfileController", function($scope, $http, $localStorage, $location) {

//     $scope.init = function() {
//         if($localStorage.hasOwnProperty("accessToken") === true) {
//             $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
//                 $scope.profileData = result.data;
//             }, function(error) {
//                 alert("There was a problem getting your profile.  Check the logs for details.");
//                 console.log(error);
//             });
//         } else {
//             alert("Not signed in");
//             $location.path("/login");
//         }
//     };

// });

// app.controller("FeedController", function($scope, $http, $localStorage, $location) {
//
//     $scope.init = function() {
//         if($localStorage.hasOwnProperty("accessToken") === true) {
//             $http.get("https://graph.facebook.com/v2.4/me/feed", { params: { access_token: $localStorage.accessToken, format: "json" }}).then(function(result) {
//                 $scope.feedData = result.data.data;
//                 $http.get("https://graph.facebook.com/v2.4/me", { params: { access_token: $localStorage.accessToken, fields: "picture", format: "json" }}).then(function(result) {
//                     $scope.feedData.myPicture = result.data.picture.data.url;
//                 });
//             }, function(error) {
//                 alert("There was a problem getting your profile.  Check the logs for details.");
//                 console.log(error);
//             });
//         } else {
//             alert("Not signed in");
//             $location.path("/login");
//         }
//     };
//
// });


app.controller('RegisterController', function($scope,UserRegisterService,$http) {
    $scope.choice = {
        select_status: ["student","teacher"],
        select_choice: "student"
    };
    $Subject = ["Math","Physics","Chemistry","Biology"];

    $scope.age;
    $scope.phone;
  $scope.groups = [];
  for (var i=0; i<4; i++) {
    $scope.groups[i] = {

        name: $Subject[i] ,
        items: [{level: "มัธยมต้น", selected: false}, {level: "มัธยมปลาย", selected: false}]

    };
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
  collectData = function(age,phone){
    var tmp = UserRegisterService.getInfoForRegister();
    profileData = {}
    profileData.name = tmp.name;
    profileData.gender = tmp.gender;
    profileData.email = tmp.email;
    profileData.pic_profile = tmp.picture.data.url;
    profileData.authen = {site: tmp.site, id : tmp.id};
    profileData.isTutor = ($scope.choice.select_choice == "teacher") ? true : false;
    profileData.phone = phone;
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
    //console.log($scope.age+"eiei "+$scope.phone)


  }
  $scope.register = function(age,phone) {
    //console.log($scope.profileData);


    tmp = PostUrl+"/regis";
    console.log(tmp);
    collectData(age,phone)
     $http.post(tmp, collectData(age,phone) ).then(function(response) {
       console.log(response.data);
     });
    //a = UserRegisterService.getInfo();
    ////$scope.profileData.pic_profile = a.url;
    ////$scope.profileData.authen = {site: , id: };
    ////$scope.profileData.phone =""
    //$scope.profileData.teach_subjects = [{level: , subject: }];
    ////$scope.profileData.isTutor = true||false;
  }

});
