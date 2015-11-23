angular.module('mylesson',[]).controller("MylessonController",function($scope,$location,$http,UserInfoService,lessonInfoService){
  $scope.init = function(){
      $http.post(Url+"/getlessondata",UserInfoService.getInfo().authen).then(function(response){
          $scope.showData=response.data;
          console.log(response.data);
          $scope.size = $scope.showData.length;
          console.log($scope.size);
      });
      console.log("eiei");
  }
  $scope.setPicture = function(subject){
    if(subject == "Mathmatics")
      return "img/math-icon.png";
    else if(subject == "Science")
      return "img/science-icon.png"
    
    else if(subject == "Art")
      return "img/art-icon.png"
    else if(subject == "English")
      return "img/english-icon.png"
    else if(subject == "Social")
      return "img/social-icon.png"
    else if(subject == "Thai")
      return "img/thai-icon.png"
    else if(subject == "Thai")
      return "img/etc-icon.png"

  }
  
  $scope.lessonDetail = function(data){
    lessonInfoService.setLesson(data);
    console.log(data);
    $location.url("/lessondetail");
  }
  $scope.go_back = function(){
    $location.url('/profile')
    
  }
});