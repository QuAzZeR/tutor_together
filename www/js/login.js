
angular.module('login',[])
.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$http,UserLoginService,UserRegisterService) {

    $scope.login = function() {
        $cordovaOauth.facebook("891866854235670", ["email"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            console.log($localStorage.accessToken)
         //    $localStorage.accessToken ="CAAMrJe8InhYBAGgxMZAlcw2PHmQZCrcVdXqvNXc8q6pl6uPcO9zlLbtIOkJntL8eHIlRkbZBrZAjpZCRiKKiSICowaH5cANTPZBW3V2J17eGB5cy4JG78d5L3yLf1zhP0iZCCI5yDPA05OaVkQBk0WzbYHXC7C0ipAjSpJkJuC2ZAsxT9AMlP9YiJgQ3i5dm4Y3WgMN6n7x95AZDZD"
        	// $localStorage.accessToken = "CAAMrJe8InhYBACrexFYdbuoM4dt4w4Vtrn9HxN8OYzLsZARgaG5fZAfbEA9iZBDo31N4oUNWL5UtYslZA6lOOZBcsufIkxo6sBnzXOPZCfetT5gxlhNZCwldDvjtbB1ZAkAbTa2cuQWndErywBS4JhX7Is7VfWa0rPptsI4AL1Gsu1uf4hmPKZBSXVONMQjo7ofaGUZAWZAjwxyfgZDZD"
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,email,picture", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                var sendData = result.data;
                sendData.site = 'facebook';
                UserLoginService.setInfo(sendData);
            $http.post(Url+"/login", sendData).then(function(response) {
                if(response.data == "go_regis"){
                    UserRegisterService.setInfo(sendData);
                    $location.url("/register");
                }
                else {
                    $location.url("/profile");
                }
            });
            },function(error){

            });

        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };
    $scope.init = function(){
      //UserInfoService.clearData();
      UserLoginService.clearData();
     }

});
// app.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location,$http,UserLoginService,UserInfoService) {

//     $scope.login = function() {
//         $localStorage.accessToken = "CAAMrJe8InhYBAIxPt9XpmPshOUKbfoLyzzXoZAy6wuTFy8xRREmzZCu8Iv4LrPuSyBJLrLfRi2r9sNuSl7DUEiJW3Sa7TZArUWmtrAcCfMG9Ity7MD43lkHb4P7stxP8JPstIWKRd830w07xWxCMAB28QZAe8g4wcwqLxZAd0VrhOZBMfZCcai7M7zVZBSumPngZD"
//         $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,email,picture", format: "json" }}).then(function(result) {
//             $scope.profileData = result.data;
//             var sendData = result.data;
//                 sendData.site = 'facebook';
//                 UserLoginService.setInfo(sendData);
//                 $http.post(PostUrl+"/login", sendData).then(function(response) {
//                     if(response.data == "go_regis"){
//                        $location.url("/register");
//                    }
//                    else {
//                       $location.url("/profile");      
//                    }
//                });
                
//          });
//      }
     
//      $scope.init = function(){
//       UserInfoService.clearData();
//       UserLoginService.clearData();
//      }
// });