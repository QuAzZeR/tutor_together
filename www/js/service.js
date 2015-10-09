angular.module('Service',[]).factory('UserRegisterService',function(){
	var UserRegisterService={};

	UserRegisterService.getInfoForRegister = function(){
		console.log(UserRegisterService.Info)
		return UserRegisterService.Info;
	}
	UserRegisterService.setInfo = function(info){
		UserRegisterService.Info = info;
	}
	return UserRegisterService;
});
