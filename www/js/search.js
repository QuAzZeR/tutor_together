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
		$location.path('/search/teacher')
	}
	$scope.go_back = function(){
    $location.path('/profile')
  	}
})


