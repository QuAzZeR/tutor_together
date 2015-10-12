angular.module('Service',[]).factory('UserRegisterService',function(){
	var UserRegisterService={};

	UserRegisterService.getInfoForRegister = function(){
		return UserRegisterService.Info;
	}
	UserRegisterService.setInfo = function(info){
		UserRegisterService.Info = info;
	}
	return UserRegisterService;
});
