angular.module('search',[])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search.teacher', {
      url: "/teacher",
      views: {
        'teacher-tab': {
          templateUrl: "teacher.html",
          controller: 'SearchController'
        }
      }
    })
    .state('search.subject', {
      url: "/subject",
      views: {
        'subject-tab': {
          templateUrl: "subject.html"
        }
      }
    })
    .state('search.map', {
      url: "/map",
      views: {
        'map-tab': {
          templateUrl: "map.html"
        }
      }
    });
    
   

})
.controller('SearchController',function($scope,$location){
	$scope.init= function(){
    $location.url("/search/teacher")    
    
	}
	$scope.go_back = function(){
    $location.url("/profile");
  }
})
.controller('searchTeacherController',function($scope,$location,$http,teacherDetailService){
  $scope.value='';
  $scope.teachers=[]
  $scope.searchTeacher = function(value){
     $http.post(Url+"/searchbyteacher", {search:value} ).then(function(response) {
       $scope.teachers = response.data;
       console.log($scope.teachers);
       $scope.value = value;
     });
   }
  $scope.collectSubject = function(teacher){
    teacher.teach = ""
    for(var i = 0; i < teacher.teach_subjects.length ;i++){
          if(teacher.teach.search(teacher.teach_subjects[i].subject)==-1)
            teacher.teach+= teacher.teach_subjects[i].subject+" "
        }
    return teacher.teach;
  }
  $scope.teacherDetails = function(teacher){
    teacherDetailService.setTeacher(teacher);
    $location.url("/teacherprofile")
    console.log($location.url())
  }
  $scope.init=function(){
    $scope.searchTeacher('');
    
  }
})
.controller('searchSubjectController',function($scope,$location,$http,teacherLessonDetailService){
  $scope.Teachers =[];
  $scope.init = function(){
      $http.get(Url+"/getsubjectdata").then(function(response){
        $scope.Subjects = response.data.subjects;
        $scope.Levels = response.data.levels;
        console.log(response.data);
        $scope.Subjects.unshift("ALL")
        $scope.selected_subject = $scope.Subjects[0];
        $scope.Levels.unshift("ALL")
        $scope.selected_level = $scope.Levels[0];    
      });
      $scope.Search("ALL","ALL")
     
    }
    $scope.Search= function(sub,lev){
      $http.post(Url+"/searchbysubject",{subject:sub.toLowerCase,level:lev.toLowerCase}).then(function(response){
        
        $scope.Teachers= response.data;
      })
    }
    $scope.filter =  function(sub,lev,lesson){
      
      if(sub=="ALL" && lev =="ALL"){
        
        return true;
      }
      
      else if(sub=="ALL" && lev ==lesson.level){
          
          return true;
      }
      
      else if(lev=="ALL" &&sub==lesson.subject){
          
          return true;
      }
      
      else if(sub==lesson.subject && lev==lesson.level){
            
            return true;
      }
      else{
        return false;
      }
      
    }
    $scope.teacherLessonDetail = function(lesson,teacher){
        
        teacherLessonDetailService.setData(lesson,teacher);
        $location.url("/teacherlessondetail")
      }
      

})
.controller('searchMapController',function($scope,$location,$ionicLoading,$http,teacherDetailService){

  $scope.init = function(){
      $http.post(Url+"/")
      var kaset = new google.maps.LatLng(13.847735, 100.571334);
       var mapOptions = {
            center: kaset,
            zoom:15
        }
      markers = []
       var map = new google.maps.Map(document.getElementById("searchmap"),
        mapOptions);
       $scope.teacher={}
       $http.post(Url+"/searchbymap").then(function(response){
          $scope.teacher=response.data;
          
          for(i=0;i<$scope.teacher.length;i++)
           {
              pos = $scope.teacher[i].position[0];

         //     console.log(pos)
                var image = {
            url: $scope.teacher[i].pic_profile,
            // This marker is 20 pixels wide by 32 pixels high.
                  scaledSize: new google.maps.Size(50, 50),
            // // The origin for this image is (0, 0).
                  origin: new google.maps.Point(0, 0),
            // // The anchor for this image is the base of the flagpole at (0, 32).
                  anchor: new google.maps.Point(0, 0)
                };  
                markers[i] = new google.maps.Marker({
                     position: new google.maps.LatLng(pos.latitude,pos.longtitude),
                    map: map,
                    draggable:false ,
                    icon:image,
                    index: i

                });
                markers[i].addListener('click',function(){
                    teacherDetailService.setTeacher($scope.teacher[this.index]);
                    console.log($scope.teacher[this.index])
                    $location.url("/teacherprofile")
                    console.log($location.url());
                });    
            }
            //console.log($scope.teacher)
            $scope.map = map;
            $scope.centerOnMe();
            
           })
            console.log(markers)
    
    }
    
    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }
        //console.log('eiei');
        $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
        });
    
        navigator.geolocation.getCurrentPosition(function(pos) {
            currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)  
            $scope.map.setCenter(currentPosition);
            //console.log($scope.map.center.lat()+" "+$scope.map.center.lng());
            $scope.hide = $ionicLoading.hide();
        }, function(error) {
        alert('Unable to get location: ' + error.message);
        });
    };
    teacherDetail = function(){
      //console.log(this.index)
      
    }
});



