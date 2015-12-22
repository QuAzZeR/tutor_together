angular.module('register',[]).controller('RegisterController', function($scope,UserRegisterService,$http,$location,latlngService) {
  // $scope.age;
  // $scope.phone;
  // $scope.groups = [];
  // $scope.choice = {
  //     select_status: ["student","teacher"],
  //     select_choice: "student"
  // };
  $Subject = []
  $level = []
  $scope.init = function(){
    $http.get(Url+"/getsubjectdata").then(function(response){
        $Subject = response.data.subjects;
        $level = response.data.levels;
        setSubjectGroup();
      });
      $scope.age;
      $scope.phone;
      $scope.groups = [];
      $scope.choice = {
          select_status: ["student","teacher"],
          select_choice: "student"
      };
   

  }

  var setSubjectGroup = function() {
    for (var i=0; i<$Subject.length; i++) {
      $scope.groups[i] = {name: $Subject[i]};
      $scope.groups[i].items = [];
      for(var j=0; j<$level.length; j++) {
        $scope.groups[i].items[j] = {level: $level[j], selected: false} 
      }
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
          $scope.shownGroup = group;
        }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  collectData = function(phone){
    var tmp = UserRegisterService.getInfoForRegister();
    profileData = {}
    profileData.name = tmp.name;
    profileData.gender = tmp.gender;
    profileData.email = tmp.email;
    profileData.pic_profile = tmp.pic_profile;
    profileData.authen = {site: tmp.site, id : tmp.id};
    profileData.isTutor = ($scope.choice.select_choice == "teacher") ? true : false;
    profileData.tel = phone;
    profileData.position = [latlngService.getLatLng()];
    tmp=[]
    var count = 0;
    for (var i=0; i<4; i++) {
         if($scope.groups[i].items['0'].selected==true)
             tmp[count++] = {level : $scope.groups[i].items[0].level,subject : $scope.groups[i].name}
         if($scope.groups[i].items['1'].selected)
             tmp[count++] = {level : $scope.groups[i].items[1].level,subject : $scope.groups[i].name}
    }
    profileData.teach_subjects=tmp
    return profileData;

  }
  $scope.register = function(phone) {
    tmp = Url+"/regis";
    console.log(tmp);
    console.log(collectData(phone));
     $http.post(tmp, collectData(phone) ).then(function(response) {
       console.log(response.data);
       $location.url("/profile");
     });
  }
  $scope.go_addlocation = function(){
        $location.url('/addlocation')
  }
});