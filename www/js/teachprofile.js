angular.module('teacherprofile',[]).controller("teacherProfileController",function($scope,$location,teacherDetailService){
  $scope.init = function(){
      console.log('teacher')
      $scope.showData = teacherDetailService.getTeacher();
      console.log($scope.showData)
      // $http.post(Url+"/profile",UserLoginService.getInfoForRegister()).then(function(response){      
      //   $scope.showData = response.data;
      //    console.log($scope.showData.isTutor); 
      //   UserInfoService.setInfo(response.data);
      //   $scope.showData.teach = ""
      //   for(var i = 0; i < $scope.showData.teach_subjects.length ;i++){
      //     if($scope.showData.teach.search($scope.showData.teach_subjects[i].subject)==-1)
      //       $scope.showData.teach+= $scope.showData.teach_subjects[i].subject+" "
      //   }
      // });

  }
  $scope.go_back = function(){
    window.history.back();
  }
  $scope.go_lesson = function(){
    $location.url('/teacherlesson')
  }
});