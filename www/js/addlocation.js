angular.module('addlocation',['ionic']).controller('addLocationController', function ($scope,$ionicLoading,latlngService,$location) {
        // Code will be here
    $scope.init = function(){
        var kaset = new google.maps.LatLng(13.847735, 100.571334);

        var mapOptions = {
            center: kaset,
            zoom:15
        }
        var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
        marker = new google.maps.Marker({
            // position:kaset,
            map: map,
            draggable:true
            
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
        $scope.map = map;
        
        $scope.centerOnMe();
    }
    $scope.saveDetails = function(){
        position = {latitude:$scope.map.center.lat(),longtitude:$scope.map.center.lng()};
        latlngService.setLatLng(position);
        $location.url('/register')
    }
    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }
        $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
        });
    
        navigator.geolocation.getCurrentPosition(function(pos) {
            currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)  
            $scope.map.setCenter(currentPosition);
            $scope.hide = $ionicLoading.hide();
        }, function(error) {
        alert('Unable to get location: ' + error.message);
        });
    };
    $scope.go_back = function(){
        window.history.back();
    }
});