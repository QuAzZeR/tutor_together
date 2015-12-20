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
	$scope.init2= function(){
        
	}
	$scope.go_back = function(){
    
  	}
})
.controller('Eiei',function($scope,$location,$ionicLoading){

  $scope.init = function(){
      $location.path('/search/map');
      var kaset = new google.maps.LatLng(13.847735, 100.571334);
       var mapOptions = {
            center: kaset,
            zoom:15
        }
      console.log('e') 
       var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
      var image = {
    url: 'img/nut.png',
    // This marker is 20 pixels wide by 32 pixels high.
          scaledSize: new google.maps.Size(50, 50),
    // // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
    // // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 0)
        };  
        marker = new google.maps.Marker({
             position:kaset,
            map: map,
            draggable:true ,
            icon:image

        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
      });
        $scope.map = map;
        console.log($scope.map);
        $scope.centerOnMe();   
    }
    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }
        console.log('eiei');
        $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
        });
    
        navigator.geolocation.getCurrentPosition(function(pos) {
            currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)  
            $scope.map.setCenter(currentPosition);
            console.log($scope.map.center.lat()+" "+$scope.map.center.lng());
            $scope.hide = $ionicLoading.hide();
        }, function(error) {
        alert('Unable to get location: ' + error.message);
        });
    };
});


