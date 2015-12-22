angular.module('teacherlessondetail',[]).controller("teacherLessonDetailController",function($scope,$location,teacherLessonDetailService){
  $scope.lessoninfo={}
  console.log($scope.lessoninfo)
  $scope.init = function(){
    // $scope.lessoninfo = lessonInfoService.getLesson();
    $scope.lessoninfo = teacherLessonDetailService.getData().Lesson;
    console.log($scope.lessoninfo)
    $scope.teacher = teacherLessonDetailService.getData().Teacher;
    console.log($scope.teacher)
  }
  $scope.go_back = function(){
    window.history.back();
  }
});