angular.module('lessondetail',[]).controller("LessonDetailController",function($scope,$location,$http,lessonInfoService){
  $scope.init = function(){
    $scope.lessoninfo = lessonInfoService.getLesson();
  }
  $scope.go_back = function(){
    window.history.back();
  }
});