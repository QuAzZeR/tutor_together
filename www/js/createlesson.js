angular.module('createlesson',[]).controller("CreateLessonController",function($scope,$location,$http,MySchedule,UserInfoService){
  $scope.init = function(){
      $http.get(Url+"/getsubjectdata").then(function(response){
        $scope.Subjects = response.data.subjects;
        $scope.levels = response.data.levels;
        console.log(response.data);
        $scope.selected_subject = $scope.Subjects[0];
        $scope.selected_level = $scope.levels[0];    
      });
      MySchedule.clearSchedule();
  };
  $scope.go_schedule = function(){
    
    $location.url("/schedule");
  }
  $scope.create = function(subject,level,description){
    Lesson = {}
    // authen = UserInfoService.getInfo();
    Lesson.schedule = MySchedule.getSchedule();
    Lesson.level = level;
    Lesson.subject = subject;
    Lesson.description = description;
    sendData = {newLesson: Lesson};
    sendData.authen = UserInfoService.getInfo().authen;
    console.log(sendData);
    $http.post(Url+"/createlesson",sendData).then(function(response){

      if(response.data=="success")
        $location.url("/mylesson");
    });
    //$location.url("/mylesson");
  }
  $scope.go_back = function(){
    $location.url('/profile');
    //window.open('#/profile');
  }
  
});