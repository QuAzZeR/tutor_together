angular.module('createschedule',[]).controller("CreateScheduleController",function($scope,$location,MySchedule){
  $scope.init = function(){
    $scope.selected_day="Monday";
    $scope.selected_timestart = "00.00";
    $scope.selected_timeend ="01.00";
  }
  $scope.create = function(day,timeStart,timeEnd){
    ThisSchedule = {}
    ThisSchedule.day = day;
    // ThisSchedule.time_ranges={time_start: timeStart , time_end: timeEnd};
    ThisSchedule.time_start = timeStart;
    ThisSchedule.time_end = timeEnd;
    
    MySchedule.addSchedule(ThisSchedule);
    console.log(MySchedule.getSchedule());
    $location.url('/schedule');

  }
  $scope.go_back = function(){
    window.history.back();
  }

});