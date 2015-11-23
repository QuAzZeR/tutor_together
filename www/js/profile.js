angular.module('profile',[]).controller("ProfileController",function($scope,$location,$http,UserLoginService,UserInfoService){
  $scope.init = function(){
      $http.post(Url+"/profile",UserLoginService.getInfoForRegister()).then(function(response){      
        $scope.showData = response.data;
         console.log($scope.showData.isTutor); 
        UserInfoService.setInfo(response.data);
        $scope.showData.teach = ""
        for(var i = 0; i < $scope.showData.teach_subjects.length ;i++){
          if($scope.showData.teach.search($scope.showData.teach_subjects[i].subject)==-1)
            $scope.showData.teach+= $scope.showData.teach_subjects[i].subject+" "
        }
      });

  }
});