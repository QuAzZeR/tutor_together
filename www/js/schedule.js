angular.module('schedule',[]).controller("ScheduleController",function($scope,$location,MySchedule){
  $scope.init = function(){
      $scope.schedule_now = MySchedule.getSchedule();
      console.log($scope.schedule_now);
  };
  $scope.go_create = function(){
      $location.url("/createschedule");
  };
  $scope.go_back = function(){
    $location.url("/createlesson")
  }
});